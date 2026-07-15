# 🍿 AI Movie Matchmaker (LLM4Rec Pipeline)

An advanced, conversational movie recommendation engine powered by a **Local Small Language Model (SLM)** and **Hybrid Vector Search**. This project demonstrates a Retrieval-Augmented Generation (RAG) approach for recommender systems (LLM4Rec), running completely locally without relying on paid cloud APIs.

## 🧠 System Architecture

The pipeline seamlessly blends traditional information retrieval with modern generative AI:

1. **Query Encoding:** The user's mood/prompt is encoded using `Sentence-Transformers` (`all-MiniLM-L6-v2`) to capture deep semantic meaning.
2. **Hybrid Vector Space:** The semantic vector (384 dimensions) is concatenated with a Graph structural embedding (64 dimensions) to form a robust 448-dimensional latent representation.
3. **High-Speed Retrieval:** **FAISS** (Facebook AI Similarity Search) calculates L2 distances to instantly retrieve the Top-K most relevant movies from the pre-computed database.
4. **Contextual Generation:** The retrieved movie metadata (Title, Genres, Overview) is injected into a strict prompt template via **LangChain**.
5. **Local SLM Inference:** **Qwen2 (1.5B)**, served locally via **Ollama**, processes the context and generates a highly personalized, conversational recommendation matching the user's exact tone—strictly bounded to prevent hallucinations.

## 🛠️ Tech Stack

* **Frontend:** Streamlit (Dark UI)
* **Vector Database:** FAISS (CPU)
* **Embeddings:** Sentence-Transformers (`all-MiniLM-L6-v2`) + Graph Latent Vectors
* **LLM Orchestration:** LangChain (`langchain-core`, `langchain-ollama`)
* **Local Inference Engine:** Ollama (Model: `qwen2:1.5b`)
* **Data Processing:** Pandas, NumPy

## 🚀 Local Setup & Installation

Follow these steps to run the complete pipeline on your local machine:

### 1. Install Ollama & Download the Model
First, install [Ollama](https://ollama.com/) for your OS. Then, download the Qwen2 1.5B model by running:
```bash
ollama run qwen2:1.5b