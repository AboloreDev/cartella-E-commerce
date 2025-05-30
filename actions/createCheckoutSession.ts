"use server";
import { stripe } from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";
const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  address: Address | null;
}

export interface ItemsInCart {
  product: CartItem["product"];
  quantity: number;
}
export const createCheckoutSession = async (
  items: ItemsInCart[],
  metadata: Metadata
) => {
  try {
    // retrieve existing customer or create a new one
    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    // create a customerId
    const customerId = customer.data.length > 0 ? customer.data[0].id : "";

    // create a session payload
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
        address: JSON.stringify(metadata.address),
      },
      //   pass the mode
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${DOMAIN}/cancel`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round((item?.product?.price ?? 0) * 100),
          product_data: {
            name: item?.product?.name ?? "",
            description: item.product.description,
            metadata: { id: item.product._id },
            images:
              item.product.images && item.product.images.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      })),
    };
    //
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating a checkout session", error);
    throw error;
  }
};
