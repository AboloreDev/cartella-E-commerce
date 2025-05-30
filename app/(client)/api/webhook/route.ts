import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature found for stripe" },
      { status: 400 }
    );
  }
  const secretWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretWebhookSecret) {
    console.log("Stripe secret webhook not found");
    return NextResponse.json(
      {
        error: "Stripe webhook not set",
      },
      {
        status: 400,
      }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      secretWebhookSecret
    );
  } catch (error) {
    console.error("Webhook signature verification failed", error);
    return NextResponse.json(
      {
        error: `Webhook Error: ${error}`,
      },
      { status: 400 }
    );
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.error("Error creating order in sanity", error);
      return NextResponse.json(
        {
          error: `Error creating order: ${error}`,
        },
        { status: 400 }
      );
    }
  }
};

const createOrderInSanity = async (
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) => {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
    customer,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId, address } =
    metadata as unknown as Metadata & { address: string };

  const lineItemsProducts = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });
};
