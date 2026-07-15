import streamlit as st
import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate

# --- 1. UI Configuration ---
st.set_page_config(page_title="AI Movie Matchmaker", page_icon="🍿", layout="centered")

# --- 2. Caching Heavy Resources ---
@st.cache_resource
def load_system():
    df = pd.read_csv('cleaned_movies.csv')
    embeddings = np.load('movie_final_embeddings.npy')

    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings.astype('float32'))

    sbert_model = SentenceTransformer('all-MiniLM-L6-v2')
    llm = OllamaLLM(model="qwen2:1.5b")

    return df, index, sbert_model, llm

df, index, sbert_model, llm = load_system()

# --- 3. Build the UI ---
st.title("🍿 AI Movie Matchmaker")

# Auto-expanding text area for longer prompts
user_prompt = st.text_area("Hi, What's your mood:", height=100, placeholder="Suggest an amazing come of age movie...")

if st.button("Find My Movie", type="primary"):
    if user_prompt:
        # User-friendly loading text
        with st.spinner("Finding the perfect movies for your mood... 🍿"):
            
            prompt_semantic = sbert_model.encode([user_prompt])[0]
            prompt_graph = np.zeros(64)
            query_vector = np.concatenate((prompt_semantic, prompt_graph))
            query_vector = np.array([query_vector]).astype('float32')

            K = 3
            distances, indices = index.search(query_vector, K)

            context = ""
            for idx in indices[0]:
                movie = df.iloc[idx]
                context += f"- {movie['title']} ({movie['genres']}): {movie['overview']}...\n"

                template = """You are a STRICT movie recommender AI. 
                The user asked for: "{question}"

                You MUST ONLY use the movies provided in the list below. Recommend them in a short, punchy, and entertaining tone. Do not make up facts about the movies.
                and match user tone. be humann for god sakes
                Matched Movies:
                {context}

                Your Response:"""
            
            prompt = PromptTemplate(input_variables=["question", "context"], template=template)
            chain = prompt | llm
            
            response = chain.invoke({"question": user_prompt, "context": context})

            st.success("Here is your personalized recommendation!")
            st.write(response)
    else:
        st.warning("Please enter your mood first!")