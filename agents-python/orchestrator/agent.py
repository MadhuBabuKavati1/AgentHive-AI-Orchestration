"""
orchestrator/agent.py
---------------------
AgentHive Orchestrator:
Coordinates Extractor, Summarizer, Analyzer, and Knowledge agents.
Each agent performs a specialized part of the AI workflow.
"""

from extractor.agent import ExtractorAgent
from summarizer.agent import SummarizerAgent
from analyzer.agent import AnalyzerAgent
from knowledge.agent import KnowledgeAgent


class OrchestratorAgent:
    def __init__(self):
        print("[INIT] Starting OrchestratorAgent initialization...")

        # Initialize all agents
        self.extractor = ExtractorAgent()
        self.summarizer = SummarizerAgent()
        self.analyzer = AnalyzerAgent()
        self.knowledge = KnowledgeAgent()

        print("✅ OrchestratorAgent initialized successfully with 4 agents:")
        print("   • ExtractorAgent")
        print("   • SummarizerAgent")
        print("   • AnalyzerAgent")
        print("   • KnowledgeAgent")

    # ------------------------------------------------------------------
    # Primary workflow method
    # ------------------------------------------------------------------
    def run_workflow(self, text: str):
        """
        Runs the complete AI pipeline:
        1. Extract entities
        2. Retrieve knowledge context
        3. Summarize input
        4. Analyze summary
        """
        print("\n[WORKFLOW] Starting full agentic workflow...")

        # --- Step 1: Extraction ---
        print("[Step 1] Running ExtractorAgent...")
        extraction = self.extractor.extract(text)
        num_entities = len(extraction.get("entities", []))
        print(f"[Step 1] Extraction complete → {num_entities} entities found.\n")

        # --- Step 2: Knowledge Retrieval ---
        print("[Step 2] Running KnowledgeAgent...")
        context_info = self.knowledge.retrieve(text)
        if "error" in context_info:
            print("⚠️  Knowledge base is empty — no context found.")
        else:
            print(f"[Step 2] Retrieved {len(context_info['results'])} relevant documents.\n")

        # --- Step 3: Summarization ---
        print("[Step 3] Running SummarizerAgent...")
        summary = self.summarizer.summarize(text)
        print("[Step 3] Summarization complete.\n")

        # --- Step 4: Analysis ---
        print("[Step 4] Running AnalyzerAgent...")
        analysis = self.analyzer.analyze(summary)
        print("[Step 4] Analysis complete.\n")

        print("✅ Full agentic workflow completed successfully.\n")

        return {
            "extraction": extraction,
            "context": context_info,
            "summary": summary,
            "analysis": analysis
        }

    # ------------------------------------------------------------------
    # Optional helper to preload knowledge into memory
    # ------------------------------------------------------------------
    def add_knowledge(self, text: str):
        """
        Add a document into the KnowledgeAgent’s ChromaDB memory.
        """
        print(f"[KnowledgeBase] Adding new document: {text[:50]}...")
        return self.knowledge.add_document(text)
