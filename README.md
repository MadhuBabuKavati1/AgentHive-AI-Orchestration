# 🧠 AgentHive – AI Orchestration Framework

AgentHive is a **modular multi-agent orchestration framework** that integrates **Python-based AI agents**, **Java microservices**, and a **React/Tailwind UI**.  
It is designed for building, managing, and scaling **autonomous AI systems** capable of executing coordinated workflows, decision-making, and automation tasks.

---

## 🚀 Overview

AgentHive provides a **plug-and-play architecture** for connecting various intelligent agents that can:
- Perform specialized tasks (e.g., reasoning, retrieval, summarization, coding)
- Communicate through a central **LangGraph-based orchestrator**
- Store, recall, and share memory across sessions
- Expose **REST APIs** for interoperability with external services
- Visualize agent activity and workflows via a modern web dashboard

---

## 🧩 Architecture

AgentHive/
├── agenthive-frontend/ # React + Tailwind frontend for UI dashboard
├── agents-python/ # Python-based AI agents using LangChain / FastAPI
├── backend-java/ # Java (Spring Boot) microservices layer
├── infra/ # Docker, CI/CD, and infrastructure scripts
├── node_modules/ # Local JS dependencies
├── tests/ # Unit & integration tests
└── .gitignore

markdown
Copy code

### 🧠 Core Components
| Component | Description |
|------------|--------------|
| **Orchestrator** | Coordinates agent communication and workflow logic (LangGraph / FastAPI) |
| **Agents-Python** | Specialized AI agents (LLM, RAG, FinOps, Automation, Code, etc.) |
| **Backend-Java** | Microservices layer for business logic, APIs, and external system integration |
| **Frontend** | React.js dashboard with workflow graphs, logs, task tables, and agent cards |
| **Infra** | Docker Compose setup for multi-service orchestration, CI/CD ready |

---

## 🛠️ Tech Stack

**Frontend**
- React.js, Vite, Tailwind CSS, Recharts  
- Axios, React Router, Zustand (state management)

**Backend**
- Node.js / Express.js for API Gateway  
- Python (FastAPI / LangGraph / LangChain) for agents  
- Java (Spring Boot) for microservices  
- MongoDB / PostgreSQL for persistence  
- Docker, GitHub Actions, and Kubernetes for orchestration

**AI/ML**
- OpenAI GPT-4 / Mistral integration  
- ChromaDB + SentenceTransformers for vector retrieval  
- LangGraph for agent coordination  
- FinOps & RAG nodes for specialized automation

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/MadhuBabuKavati1/AgentHive-AI-Orchestration.git
cd AgentHive-AI-Orchestration
2. Install Frontend Dependencies
bash
Copy code
cd agenthive-frontend
npm install
npm run dev
3. Run Python Agent Services
bash
Copy code
cd ../agents-python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn orchestrator:app --reload
4. Run Java Backend
bash
Copy code
cd ../backend-java
./mvnw spring-boot:run
5. Run All Services with Docker
bash
Copy code
docker compose up --build
🧪 Features
✅ Modular multi-agent orchestration
✅ Full-stack architecture (React + FastAPI + Spring Boot)
✅ Real-time task management dashboard
✅ LangGraph-based agent communication
✅ RAG-based memory and vector retrieval
✅ REST APIs for external integrations
✅ CI/CD-ready with Docker and GitHub Actions
✅ Extensible plugin-based agent registry

📊 Frontend Dashboard Modules
Module	Description
Dashboard.jsx	Main control center showing active agents & workflows
TaskTable.jsx	Displays running and completed tasks with status
WorkflowGraph.jsx	Visual LangGraph representation of agent flow
LogViewer.jsx	Real-time system and agent logs
Agents.jsx	Displays registered agents, their types, and capabilities

📁 Example Workflow
User triggers a task → via frontend or API

Orchestrator routes task → to appropriate agent node

Agents collaborate → exchanging intermediate results

Memory Manager logs results → into ChromaDB / Firestore

Frontend visualizes progress → in real-time dashboard

🔒 Environment Variables
Create a .env file in each service:

bash
Copy code
# Common
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=your_mongo_connection_string

# Backend (Java)
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/agenthive
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password
🧠 Vision
AgentHive aims to become a unified AI agent orchestration ecosystem —
enabling enterprises and developers to build autonomous, explainable, and scalable AI systems with multi-agent coordination and real-time observability.

👨‍💻 Author
Madhu Babu Kavati
