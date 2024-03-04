import clientPromise from "$lib/mongodb/mongodb.client";
import { ObjectId, Decimal128 } from "mongodb";

function convertDecimal128FieldsToNumber(doc: unknown): unknown {
    if (typeof doc === 'object' && doc != null) {
        for (let key in doc as Record<string, unknown>){
            const value = (doc as Record<string, unknown>)[key]
            if(value instanceof Decimal128){
                (doc as Record<string, unknown>)[key] = value.toString()
            } else if (typeof value === 'object' && value !== null) {
                (doc as Record<string, unknown>)[key] = convertDecimal128FieldsToNumber(value)
            }
        }
    }
    return doc
}

export async function load() {
    const movieId = params._id;

    let client, movies;

    try{
        client = await clientPromise;
        const movieDb = client?.db('sample_mflix');
        const moviesColl = movieDb?.collection('movies');

        const movieArray = await moviesColl?.find().limit(10).toArray();

        const decimalConvertedDocs = movieArray?.map((doc) => {
            convertDecimal128FieldsToNumber(doc)
        })
        movies = decimalConvertedDocs?.map((movie) => {
            return {...movie as Record<string, unknown>, _id: ((movie as Record<string, unknown>)._id as ObjectId).toString()}
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

async function getUserId(username: string) {
    let client
    try{
        client = await clientPromise
        const userCollection = client?.db('dwdd-3780').collection('users')
        const user = await userCollection?.findOne({ name: username})
        if(!user) {
            throw new Error('User not found')
        }
        return user?._id
    } catch (error) {
        throw new Error('Failed to get user id')
    }
}

async function getListingId(listingName: string) {
    let client
    try{
        client = await clientPromise
        const airbnbDB = client?.db('sample_airbnb')
        const airbnbColl = airbnbDB?.collection('listingsAndReviews')
        const listing = await airbnbColl?.findOne({ name: listingName})
        if(!listing) {
            throw new Error('Listing not found')
        }
        return listing?._id
    } catch (error) {
        throw new Error('Failed to get listing id')
    }
}

async function addReview(username: string, rating: number, review: string, listingName: string) {
    if (username === '') {
        throw new Error('Username is required')
    }
    if (listingName === '') {
        throw new Error('Listing name is required')
    }
    if (review === '') {
        throw new Error('Review is required')
    }

    const userId = await getUserId(username)
    const listingId = await getListingId(listingName)
}

export const actions = {
    submitReview: async ({ request }) => {
        const data = await request.formData();
        console.log(data.get('username'))
        console.log(data.get('listingName'))
        console.log(data.get('ratingValue'))
        console.log(data.get('review'))
    }
}