import clientPromise from "$lib/mongodb/mongodb.client";
import { fail } from "@sveltejs/kit";
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
    let airbnbs
	let client

	try {
		client = await clientPromise
		const airbnbDB = client?.db('sample_airbnb')
		const airbnbColl = airbnbDB?.collection('listingsAndReviews')

		const airbnbArray = await airbnbColl?.find().limit(10).toArray()

		const decimalConvertedDocs = airbnbArray?.map((doc) => convertDecimal128FieldsToNumber(doc))

		airbnbs = decimalConvertedDocs?.map((listing) => {
			return { ...listing as Record<string, unknown>, _id: ((listing as Record<string, unknown>)._id as ObjectId).toString() }
		})
	} catch (error) {
		console.error('Failed to connect to AirBnB database', error)
		if (client) {
			client.close()
		}
		return {
			status: 500,
			body: {
				error: 'Failed to connect to AirBnB database'
			}
		}
	}
    return {
        status: 200,
        body: airbnbs
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
    let client
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

    try {
        client = await clientPromise
        const reviewCollection = client?.db('dwdd-3780').collection('reviews')
        await reviewCollection?.insertOne({
            userId,
            listingId,
            rating,
            review
        })
    } catch (error) {
        throw new Error('Failed to add review')
    }
}

export const actions = {
    submitReview: async ({ request }) => {
        const data = await request.formData();
        // console.log(data.get('username'))
        // console.log(data.get('listingName'))
        // console.log(data.get('ratingValue'))
        // console.log(data.get('review'))
        const username = data.get('username') as string
        const rating = data.get('ratingValue')
        const review = data.get('review') as string
        const listingName = data.get('listingName') as string
        try {
            await addReview(username, Number(rating), review, listingName)
            return {
                status: 200,
                body: {
                    message: 'Review added successfully'
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return fail(422, {
                    error: error.message
                })
            }
        }
    }
}
//try to fix vercel