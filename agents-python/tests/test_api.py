from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    res = client.get("/")
    assert res.status_code == 200
    assert "AgentHive" in res.json()

def test_run_task():
    payload = {"text": "OpenAI builds powerful AI models like GPT and ChatGPT."}
    res = client.post("/run-task", json=payload)
    assert res.status_code == 200
    assert "summary" in res.json()
