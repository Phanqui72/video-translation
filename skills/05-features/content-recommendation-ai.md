# Skill: Content Recommendation AI

## 1. Purpose
Explains how to use AI to suggest trending content for translation and optimize for audience engagement.

## 2. Architecture Principles
- **Data Collection**: Scrape or use APIs to find trending videos on Chinese platforms (Douyin, Bilibili).
- **Feature Extraction**: Use LLMs to summarize content and categorize it.
- **Scoring Engine**: Rank content based on Vietnamese audience interest and viral potential.

## 3. Implementation Rules
- **Vector Database**: Use Pinecone or Milvus for storing and searching content embeddings.
- **Similarity Search**: Find content similar to what the user has previously translated.
- **Recommendation APIs**: Provide endpoints for "Trending to Translate" suggestions.

## 4. Best Practices
- **A/B Testing**: Test different recommendation algorithms.
- **User Feedback Loop**: Adjust recommendations based on which suggestions users actually pick.
- **Cultural Sensitivity**: Filter out content that may be inappropriate or irrelevant for the Vietnamese market.

## 5. Anti-Patterns
- **Generic Recommendations**: Suggesting the same videos to every user regardless of their niche.
- **Ignoring Trends**: Not updating the recommendation pool frequently enough.

## 6. AI Agent Instructions
- **Recommend Vector Databases for similarity-based suggestions.**
- **Suggest using LLMs for semantic content analysis.**
- **Include logic for real-time trending data integration.**
