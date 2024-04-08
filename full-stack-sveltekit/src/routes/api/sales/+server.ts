import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';
import type { RequestEvent } from '@sveltejs/kit'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri);

export async function GET( { url } ) {
    const itemName = url.searchParams.get('itemName')
    const coupon = url.searchParams.get('coupon')
    const age = url.searchParams.get('age')
    console.log(itemName, coupon, age)


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

        if (itemName) {
            salesData = salesData?.filter((sale: any) => sale.items.find((item: any) => item.name === itemName))
            //console.log(salesData)
        }
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
        JSON.stringify(salesData), {status: 200}
    )
}

export async function POST({ request }) {
    const body = await request.json()
    console.log(body)
    
    let client
    try {
        client = await clientPromise
        const salesDb = client?.db('sample_supplies');
        const statsColl = salesDb?.collection('stats');
        statsColl?.insertOne(body);
    } catch (error) {
        console.error('Failed to connect to MongoDb sales', error);
        if (client) {
            await client.close();
        }
        return new Response(
            JSON.stringify('Failure to connect to sales api'), {status: 500}
        )
    }

    return new Response(
        JSON.stringify('Success'), {status: 200}
    )
}