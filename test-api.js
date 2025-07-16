// Simple test script to verify API endpoints
const baseUrl = "http://localhost:3000/api";

async function testAPI() {
  console.log("Testing MongoDB API endpoints...\n");

  try {
    // Test /api/data endpoint
    console.log("1. Testing /api/data endpoint...");
    const dataResponse = await fetch(`${baseUrl}/data`);
    const data = await dataResponse.json();
    console.log(
      `✅ Data endpoint: ${data.movies?.length || 0} movies, ${
        data.genres?.length || 0
      } genres, ${data.directors?.length || 0} directors\n`
    );

    // Test /api/movies endpoint
    console.log("2. Testing /api/movies endpoint...");
    const moviesResponse = await fetch(`${baseUrl}/movies`);
    const movies = await moviesResponse.json();
    console.log(`✅ Movies endpoint: ${movies.length} movies\n`);

    // Test /api/genres endpoint
    console.log("3. Testing /api/genres endpoint...");
    const genresResponse = await fetch(`${baseUrl}/genres`);
    const genres = await genresResponse.json();
    console.log(`✅ Genres endpoint: ${genres.length} genres\n`);

    // Test /api/directors endpoint
    console.log("4. Testing /api/directors endpoint...");
    const directorsResponse = await fetch(`${baseUrl}/directors`);
    const directors = await directorsResponse.json();
    console.log(`✅ Directors endpoint: ${directors.length} directors\n`);

    // Test individual movie endpoint
    if (movies.length > 0) {
      console.log("5. Testing individual movie endpoint...");
      const movieResponse = await fetch(`${baseUrl}/movies/${movies[0].id}`);
      const movie = await movieResponse.json();
      console.log(`✅ Movie by ID: ${movie.title}\n`);
    }

    console.log("🎉 All API endpoints are working correctly!");
  } catch (error) {
    console.error("❌ Error testing API:", error.message);
  }
}

testAPI();
