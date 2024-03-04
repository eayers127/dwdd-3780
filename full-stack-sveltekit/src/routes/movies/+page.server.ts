import clientPromise from '$lib/mongodb/mongodb.client';
import { ObjectId } from 'mongodb';

export async function load() {
        let movies;
        let client;

        try {
          client = await clientPromise;
          const database = client?.db("sample_mflix");
          const moviesColl = database?.collection("movies");
        //   const movieArray = await moviesColl.find(
        //     { year: {$gte: 2012, $lt: 2014} }
        //   ).toArray();

        //   movies = movieArray.map(movie => {
        //     return {...movie, _id: (movie._id as ObjectId).toString()};
        //   })
        const movieArray = await moviesColl?.find({
            $and: [
                { year: 2012 },
                {$or: [
                    {"imdb.rating": { $gte: 8}},
                    {"metacritic": { $gte: 90}}
                ]}
            ]
        }).toArray();
    
              movies = movieArray?.map(movie => {
                return {...movie, _id: (movie._id as ObjectId).toString()};
              })
          console.log(movieArray?.length);
        } catch (error) {
          console.error('Failed to connect to MongoDB', error)
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
            body: movies
        }
      }