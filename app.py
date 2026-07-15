import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate

def main():
    print("🚀 Loading Data & Embeddings...")
    df = pd.read_csv('cleaned_movies.csv')
    embeddings = np.load('movie_final_embeddings.npy')

    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings.astype('float32'))

    print("🧠 Loading SBERT Model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # Initialize Free Local SLM (Qwen) via Ollama
    print("🤖 Waking up Qwen (Local SLM)...")
    # Change this: llm = Ollama(model="qwen2:1.5b")
# To this:
    llm = OllamaLLM(model="qwen2:1.5b")

    user_prompt = input("\n🍿 Tell me what kind of movie you want to watch: ")
    
    # 1. FAISS Retrieval (Same as before)
    prompt_semantic = model.encode([user_prompt])[0]
    prompt_graph = np.zeros(64)
    query_vector = np.concatenate((prompt_semantic, prompt_graph))
    query_vector = np.array([query_vector]).astype('float32')

    print("\n🔍 Searching vector space...")
    K = 3 # Only send top 3 to the SLM so it doesn't get overwhelmed
    distances, indices = index.search(query_vector, K)

    # 2. Build Context for the LLM
    context = ""
    for idx in indices[0]:
        movie = df.iloc[idx]
        context += f"- {movie['title']} ({movie['genres']}): {movie['overview'][:150]}...\n"

    print("💬 Qwen is typing your recommendation...\n")
    print("-" * 50)

    # 3. LangChain Prompt Engineering
    template = """You are a friendly and expert movie recommender AI. 
    A user asked for: "{question}"
    
    Based ONLY on the following matched movies from our database, recommend them in a conversational, helpful tone. 
    Explain briefly why they fit the user's mood.
    
    Matched Movies Context:
    {context}
    
    Your Response:"""

    prompt = PromptTemplate(input_variables=["question", "context"], template=template)
    
    # 4. Execute the Chain (Prompt -> LLM)
    chain = prompt | llm
    response = chain.invoke({"question": user_prompt, "context": context})
    
    print(response)
    print("-" * 50)

if __name__ == "__main__":
    main()