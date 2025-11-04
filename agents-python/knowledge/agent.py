"""
knowledge/agent.py
------------------
AgentHive KnowledgeAgent (Persistent ChromaDB version)
Stores and retrieves semantic knowledge using Chroma + SentenceTransformers.
"""

import os
import torch
import chromadb
from sentence_transformers import SentenceTransformer


class KnowledgeAgent:
    """
    🧠 KnowledgeAgent — Persistent semantic memory manager using ChromaDB.
    Supports adding and retrieving context documents across restarts.
    """

    def __init__(self, db_path: str = "./data/chroma_db"):
        print("🧠 Initializing KnowledgeAgent (Chroma semantic memory)...")

        # -------------------------------------------------
        # 🔧 Device setup
        # -------------------------------------------------
        if torch.backends.mps.is_available():
            print("⚠️  MPS detected — forcing CPU for Chroma embeddings.")
            self.device = "cpu"
        elif torch.cuda.is_available():
            self.device = "cuda"
        else:
            self.device = "cpu"
        print(f"Device set to use {self.device}")

        # -------------------------------------------------
        # 💾 Persistent ChromaDB setup
        # -------------------------------------------------
        os.makedirs(db_path, exist_ok=True)
        self.client = chromadb.PersistentClient(path=db_path)
        self.collection = self.client.get_or_create_collection(name="agenthive_memory")

        # -------------------------------------------------
        # 🧠 Load embedding model
        # -------------------------------------------------
        self.model = SentenceTransformer("all-MiniLM-L6-v2", device=self.device)
        print(f"✅ KnowledgeAgent ready (device={self.device}) with persistent DB at '{db_path}'")

    # ------------------------------------------------------------------
    # ➕ Add document(s) to knowledge base
    # ------------------------------------------------------------------
    def add_document(self, text: str):
        """
        Add a document to the persistent knowledge base.
        """
        if not text or not text.strip():
            return {"error": "⚠️ Skipped empty document."}

        # Compute embedding
        embedding = self.model.encode(text, convert_to_tensor=True).tolist()

        # Generate incremental document ID
        existing_ids = self.collection.get().get("ids", [])
        doc_id = f"doc_{len(existing_ids) + 1}"

        # Add to Chroma
        self.collection.add(
            ids=[doc_id],
            embeddings=[embedding],
            documents=[text],
        )

        print(f"📘 Added document #{doc_id} ({len(text)} chars).")
        return {
            "message": "Document added successfully.",
            "result": {"message": f"Document {doc_id} added."}
        }

    # ------------------------------------------------------------------
    # 🔍 Retrieve top-k relevant documents
    # ------------------------------------------------------------------
    def retrieve(self, query: str, top_k: int = 3):
        """
        Retrieve top-k most relevant documents for the given query.
        """
        all_data = self.collection.get()
        if not all_data or len(all_data.get("ids", [])) == 0:
            return {"error": "Knowledge base is empty. Add documents first."}

        # Compute query embedding
        query_embedding = self.model.encode(query, convert_to_tensor=True).tolist()

        # Query Chroma for most similar documents
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )

        retrieved_docs = []
        if "documents" in results and results["documents"]:
            for doc, dist in zip(results["documents"][0], results["distances"][0]):
                retrieved_docs.append({
                    "text": doc,
                    "similarity": round(1 - float(dist), 4)  # Convert distance → similarity
                })

        print(f"[KnowledgeAgent] Retrieved {len(retrieved_docs)} relevant documents.")
        return {
            "query": query,
            "results": retrieved_docs
        }
