import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri);

export async function GET(request: Request) {
    //const body = await request.json()
    //console.log(body)
    let client;
    let salesData;

    try {
        client = await clientPromise
        const salesDb = client?.db('sample_supplies');
        const salesColl = salesDb?.collection('sales');

        const salesArray = await salesColl?.find().toArray();

        salesData = salesArray?.map(sale => {
            return {...sale, _id: (sale._id as ObjectId).toString()}
        })
    } catch (error) {
        console.error('Failed to connect to MongoDb sales');
        if (client) {
            await client.close();
        }
        return {
            status: 500,
            body: 'Failed to connect to MongoDb sales'
        }
    }
    return new Response(
        JSON.stringify(salesData), {status: 200}
    )
}

export async function POST({ request }) {
    const body = await request.json()
    console.log(body)
    //let message = 'Hello World'
    return new Response(
        JSON.stringify(body), {status: 200}
    )
}