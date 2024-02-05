import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '$lib/mongodb/mongodb.client'

if(!clientPromise) {
    throw new Error('clientPromise is undefined')
}


let githubConfig = {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true
}

if (process.env.NODE_ENV === 'production') {
    githubConfig = {
        clientId: process.env.GITHUB_PROD_ID,
        clientSecret: process.env.GITHUB_PROD_SECRET,
        allowDangerousEmailAccountLinking: true
    }
}

export const handle = SvelteKitAuth({
  providers: [
    GitHub(githubConfig)],
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: 'dwdd-3780',
    }),
})