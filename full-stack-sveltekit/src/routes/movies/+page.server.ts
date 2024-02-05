import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

export async function load() {
        let movies;
        try {
          const database = client.db("sample_mflix");
          const moviesColl = database.collection("movies");
          const movieArray = await moviesColl.find(
            { year: 2012 }
          ).toArray();

          movies = movieArray.map(movie => {
            return {...movie, _id: (movie._id as ObjectId).toString()};
          })
          console.log(movieArray.length);
        } finally {
          await client.close();
        }
        // if (movies) {
        //     movies = {...movies, _id: (movies._id as ObjectId).toString()};
        // }
        return {
            status: 200,
            body: movies
        }
      }