import { Webhook, webhook } from 'svix'
import User from '../models/User.js';

//API Cp=ontroller Function yo Manage User with database
export const clerkwebhooks = async (req, res) => {
    try {

        //Create a svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Verifying Headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-is"],


        })

    } catch (error) {

    }
}