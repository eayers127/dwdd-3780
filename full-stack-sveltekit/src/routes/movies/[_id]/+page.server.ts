import clientPromise from "$lib/mongodb/mongodb.client";
import { ObjectId } from "mongodb";

async function validateImageUrl(url: string): Promise<string | null> {
    try {
        const response = await fetch(url, { method: 'HEAD' })
        if (response.ok) {
            return url
        } else {
            return `/defaultMoviePoster.png`
        }
    } catch (error) {
        console.error('Failed to validate image URL', error);
        return `/defaultMoviePoster.png`
    }
}

export async function load({ params }) {
    const movieId = params._id;

    let client, movie;

    try{
        client = await clientPromise;
        const movieDb = client?.db('sample_mflix');
        const moviesColl = movieDb?.collection('movies');
        movie = await moviesColl?.findOne({ _id: new ObjectId(movieId) })

        if (movie) {
            movie = {
                ...movie,
                _id: (movie._id as ObjectId).toString(),
                poster: await validateImageUrl(movie.poster)
            }
        }
    } catch (error) {
        if (client) {
          await client?.close();
        }
        return {
          status: 500,
          body: 'Failed to connect to MongoDB'
        }
    }
    return {
        status: 200,
        body: 
        {movie: movie}
    }
}