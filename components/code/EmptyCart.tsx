"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import emptyCart from "../../public/images/emptyCart.jpg";
import Image from "next/image";

export default function EmptyCart() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" rounded-2xl shadow-lg p-8 w-full max-w-md space-y-8"
      >
        <div className="relative w-44 h-44 mx-auto">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="w-full h-full"
          >
            <Image
              src={emptyCart}
              alt="Empty cart illustration"
              layout="fill"
              objectFit="contain"
              className="drop-shadow-md"
            />
          </motion.div>

          <motion.div
            animate={{ x: [0, -8, 8, 0], y: [0, -4, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute -top-3 -right-3 bg-blue-600 p-2 rounded-full shadow-md"
          >
            <ShoppingCart size={20} className="" />
          </motion.div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold ">
            Your cart is feeling lonely
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Looks like you haven&apos;t added anything yet. Let&apos;s find
            something amazing!
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="block w-full text-center bg-blue-100 border border-blue-300 text-blue-800 font-medium py-2.5 rounded-full transition hover:bg-blue-600 hover:text-white hover:border-blue-600"
          >
            Discover Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
