"""
extractor/agent.py
------------------
AgentHive ExtractorAgent:
Extracts entities and computes text embeddings using SentenceTransformers.
"""

from sentence_transformers import SentenceTransformer
import torch
import re


class ExtractorAgent:
    def __init__(self):
        """
        Initialize the SentenceTransformer model for embeddings.
        """
        print("🔍 Initializing ExtractorAgent...")

        # Use a lightweight multilingual model (384-dim)
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        # Device handling
        if torch.backends.mps.is_available():
            print("⚠️  MPS detected — forcing CPU for extractor.")
            self.device = "cpu"
        elif torch.cuda.is_available():
            self.device = "cuda"
        else:
            self.device = "cpu"

        self.model.to(self.device)
        print(f"✅ ExtractorAgent ready (device={self.device}).")

    def extract_entities(self, text: str):
        """
        Simple entity extraction using regex for demonstration.
        This can later be replaced with spaCy or a proper NER model.
        """
        # Match capitalized words as entities (e.g., OpenAI, ChatGPT, PyTorch)
        entities = re.findall(r"\b[A-Z][a-zA-Z0-9_]+\b", text)
        return list(set(entities))  # remove duplicates

    def extract(self, text: str) -> dict:
        """
        Extract embeddings and entities from the given text.
        """
        if not text or len(text.strip()) == 0:
            return {"error": "No text provided for extraction."}

        print("🧩 Running entity extraction and embedding computation...")

        # --- Step 1: Entities ---
        entities = self.extract_entities(text)

        # --- Step 2: Embeddings ---
        embedding = self.model.encode(text, convert_to_tensor=True, device=self.device)

        print(f"✅ ExtractorAgent: {len(entities)} entities extracted.")
        return {
            "entities": entities,
            "embedding_shape": str(embedding.shape)
        }
