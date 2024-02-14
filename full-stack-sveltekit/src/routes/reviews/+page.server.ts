import clientPromise from "$lib/mongodb/mongodb.client";
import { ObjectId } from "mongodb";

export async function load({ params }) {
    const movieId = params._id;

    let client, movies;

    try{
        client = await clientPromise;
        const movieDb = client?.db('sample_mflix');
        const moviesColl = movieDb?.collection('movies');

        const movieArray = await moviesColl?.find().limit(10).toArray();
        movies = movieArray?.map((movie) => {
            return {...movie, _id: (movie._id as ObjectId).toString()}
        })

    } catch (error) {
        if (client) {
          await client?.close();
        }
        return {
          status: 500,
          body: 'Failed to connect to Movie Reviews MongoDB'
        }
    }
    return {
        status: 200,
        body: movies
    }
}