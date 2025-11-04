"""
analyzer/agent.py
-----------------
AgentHive AnalyzerAgent:
Performs sentiment and topic classification using PyTorch + Transformers.
"""

from transformers import pipeline
import torch


class AnalyzerAgent:
    def __init__(self):
        """
        Initialize sentiment and topic analyzers.
        Uses lightweight DistilBERT models (PyTorch backend).
        """
        # Device handling
        if torch.backends.mps.is_available():
            print("⚠️  MPS detected — forcing CPU for analyzer (compatibility).")
            device = -1
        else:
            device = 0 if torch.cuda.is_available() else -1

        # Sentiment analyzer (binary classifier)
        self.sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english",
            device=device
        )

        # Zero-shot topic classifier (multi-domain)
        self.topic_classifier = pipeline(
            "zero-shot-classification",
            model="facebook/bart-large-mnli",
            device=device
        )

        print("✅ AnalyzerAgent initialized successfully (device={})".format(
            "CPU" if device == -1 else "GPU/MPS"
        ))

    def analyze(self, text: str) -> dict:
        """
        Run sentiment + topic analysis on text.
        """
        if not text or len(text.strip()) == 0:
            return {"error": "No text provided for analysis."}

        print(f"🔍 Analyzing text ({len(text)} chars)...")

        try:
            # Sentiment classification
            sentiment = self.sentiment_analyzer(text[:512])[0]

            # Topic prediction
            candidate_labels = [
                "technology", "business", "education", "healthcare",
                "sports", "politics", "finance", "entertainment", "science"
            ]
            topic_result = self.topic_classifier(
                text[:512],
                candidate_labels=candidate_labels,
                multi_label=False
            )

            # Construct structured response
            analysis = {
                "sentiment": sentiment["label"].lower(),
                "sentiment_score": round(sentiment["score"], 3),
                "predicted_topic": topic_result["labels"][0],
                "topic_confidence": round(topic_result["scores"][0], 3)
            }

            print("✅ AnalyzerAgent completed analysis.")
            return analysis

        except Exception as e:
            print("🚨 Error in AnalyzerAgent:", str(e))
            return {"error": str(e)}
