"""
summarizer/agent.py
-------------------
AgentHive SummarizerAgent:
Uses a Hugging Face Transformers summarization pipeline with PyTorch.
Safely runs on CPU to avoid MPS dtype bugs on macOS < 14.
"""

from transformers import pipeline
import torch


class SummarizerAgent:
    def __init__(self):
        """
        Initialize the summarizer model and device.
        On macOS MPS devices (Apple Silicon), force CPU for stability.
        """

        # Choose device: -1 = CPU, 0 = GPU/MPS (if safe)
        if torch.backends.mps.is_available():
            print("⚠️  MPS detected — forcing CPU for summarizer to avoid dtype issues.")
            device = -1
        else:
            device = 0 if torch.cuda.is_available() else -1

        # Initialize summarization pipeline
        self.summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn",
            device=device
        )

        print("✅ SummarizerAgent initialized successfully (device={})".format(
            "CPU" if device == -1 else "GPU/MPS"
        ))

    def summarize(self, text: str) -> str:
        """
        Summarize the provided text input.
        """
        if not text or len(text.strip()) == 0:
            return "❌ No text provided for summarization."

        print(f"🧠 Summarizing text ({len(text)} chars)...")

        try:
            result = self.summarizer(
                text,
                max_length=100,
                min_length=25,
                do_sample=False
            )
            summary = result[0]["summary_text"]
            print("✅ Summary generated successfully.")
            return summary

        except Exception as e:
            print("🚨 Error during summarization:", str(e))
            return f"Error: {str(e)}"
