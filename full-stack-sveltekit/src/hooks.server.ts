import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"

const githubConfig = {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
}

// add the config for vercel production site

export const handle = SvelteKitAuth({
  providers: [
    GitHub(githubConfig)],
})