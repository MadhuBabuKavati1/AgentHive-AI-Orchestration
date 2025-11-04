from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from orchestrator.agent import OrchestratorAgent

# -------------------------------------------------
# 🚀 Initialize FastAPI app
# -------------------------------------------------
app = FastAPI(
    title="AgentHive Orchestrator API",
    description="A multi-agent backend pipeline (Extractor, Summarizer, Analyzer, KnowledgeAgent)",
    version="1.0.0"
)

# -------------------------------------------------
# 🌐 Allow frontend or other clients (React, etc.)
# -------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # you can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# 🧠 Initialize the orchestrator
# -------------------------------------------------
print("[INIT] Starting OrchestratorAgent initialization...")
orchestrator = OrchestratorAgent()
print("✅ FastAPI ready and Orchestrator initialized.\n")


# -------------------------------------------------
# 🧩 ROUTE 1: Run full agentic workflow
# -------------------------------------------------
@app.post("/run-task")
async def run_task(request: Request):
    """
    Run the full agentic workflow:
    1. Extraction
    2. Knowledge retrieval
    3. Summarization
    4. Analysis
    """
    try:
        body = await request.json()
        text = body.get("text", "")
        if not text:
            return {"error": "Missing 'text' field in request body."}

        print("🔄 Running full agentic workflow...")
        result = orchestrator.run_workflow(text)
        return result

    except Exception as e:
        print(f"[ERROR] run-task failed: {e}")
        return {"error": str(e)}


# -------------------------------------------------
# 📘 ROUTE 2: Add knowledge to Chroma memory
# -------------------------------------------------
@app.post("/add-knowledge")
async def add_knowledge(request: Request):
    """
    Add a text document to the KnowledgeAgent’s Chroma DB.
    Each document will be embedded and stored for retrieval.
    """
    try:
        body = await request.json()
        text = body.get("text", "")
        if not text:
            return {"error": "Missing 'text' field in request body."}

        print(f"📘 Adding new knowledge document ({len(text)} chars)...")
        result = orchestrator.add_knowledge(text)
        return {"message": "Document added successfully.", "result": result}

    except Exception as e:
        print(f"[ERROR] add-knowledge failed: {e}")
        return {"error": str(e)}


# -------------------------------------------------
# 🩺 ROUTE 3: Health check
# -------------------------------------------------
@app.get("/health")
async def health_check():
    """
    Simple endpoint to verify the API is running.
    """
    return {"status": "ok", "agents": ["Extractor", "Summarizer", "Analyzer", "KnowledgeAgent"]}
