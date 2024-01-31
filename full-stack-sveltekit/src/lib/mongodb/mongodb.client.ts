// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let clientPromise: Promise<MongoClient> | undefined

// Create a mongo client with a mongo client 
// options object to set the stable API version

try {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    clientPromise = client.connect().catch(err => {
        console.error('Failed to connect to MongoDB', err)
        throw err // this is called re-throwing the error
    })
} catch (err){
    console.error(err)
}

// Create a client promise that resolves to mongoDb client
export default clientPromise