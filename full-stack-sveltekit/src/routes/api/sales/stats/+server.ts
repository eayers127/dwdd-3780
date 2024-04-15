import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';
import type { RequestEvent } from '@sveltejs/kit'




export async function GET() {
    let client;
    let stats;

    try {
        client = await clientPromise
        const salesDb = client?.db('sample_supplies');
        const statsColl = salesDb?.collection('stats');


        const statsArray = await statsColl?.find().toArray();


        stats = statsArray?.map(stat => {
            return {...stat, _id: (stat._id as ObjectId).toString()}
        })
    } catch (error) {
        console.error('Failed to connect to MongoDb sales', error);
        if (client) {
            await client.close();
        }
        return new Response(
            JSON.stringify('Failed to connect to sales'), {status: 500}
        )
    }
    return new Response(
        JSON.stringify(stats), {status: 200}
    )

}