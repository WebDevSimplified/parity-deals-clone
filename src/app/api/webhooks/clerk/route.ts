import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"
import { env } from "@/data/env/server"
import {
  createUserSubscription,
  getUserSubscription,
} from "@/server/db/subscription"
import { deleteUser } from "@/server/db/users"
import { Stripe } from "stripe"

const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export async function POST(req: Request) {
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occurred", {
      status: 400,
    })
  }

  switch (event.type) {
    case "user.created": {
      await createUserSubscription({
        clerkUserId: event.data.id,
        tier: "Free",
      })
      break
    }
    case "user.deleted": {
      if (event.data.id != null) {
        const userSubscription = await getUserSubscription(event.data.id)
        if (userSubscription?.stripeSubscriptionId != null) {
          await stripe.subscriptions.cancel(
            userSubscription?.stripeSubscriptionId
          )
        }
        await deleteUser(event.data.id)
      }
    }
  }

  return new Response("", { status: 200 })
}
