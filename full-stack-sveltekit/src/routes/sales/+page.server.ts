import { redirect } from "@sveltejs/kit"

export async function load(event) {

    const session = await event.locals.auth()
    if (!session?.user) {
        throw redirect(303, '/')
    }
}