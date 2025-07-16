const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = 'mongodb://localhost:27017/movie-house';
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db();

    // Read data.json
    const dataPath = path.join(__dirname, '../data.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const { genres, directors, movies } = JSON.parse(rawData);

    // Clear existing collections
    await db.collection('genres').deleteMany({});
    await db.collection('directors').deleteMany({});
    await db.collection('movies').deleteMany({});

    // Insert genres and map old id to new ObjectId
    const genreIdMap = {};
    const genresWithIds = genres.map(g => {
      const _id = new ObjectId();
      genreIdMap[g.id] = _id;
      return { _id, name: g.name };
    });
    await db.collection('genres').insertMany(genresWithIds);

    // Insert directors and map old id to new ObjectId
    const directorIdMap = {};
    const directorsWithIds = directors.map(d => {
      const _id = new ObjectId();
      directorIdMap[d.id] = _id;
      return { _id, name: d.name, biography: d.biography };
    });
    await db.collection('directors').insertMany(directorsWithIds);

    // Insert movies, replacing genreId and directorId with ObjectIds
    const moviesWithRefs = movies.map(m => ({
      title: m.title,
      description: m.description,
      releaseYear: m.releaseYear,
      rating: m.rating,
      genreId: genreIdMap[m.genreId],
      directorId: directorIdMap[m.directorId],
    }));
    await db.collection('movies').insertMany(moviesWithRefs);

    console.log('Data import successful!');
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    await client.close();
  }
}

main(); 