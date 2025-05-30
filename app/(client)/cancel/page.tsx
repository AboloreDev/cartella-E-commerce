"use client";

import { Suspense } from "react";
import { motion } from "motion/react";
import { XCircle, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Container from "@/components/code/Container";

const CancelPageContent = () => {
  return (
    <Container>
      <div className="mt-10 md:py-10 md:mt-0 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mx-4 rounded-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl flex flex-col gap-8 shadow-2xl p-6 max-w-xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg bg-white dark:bg-black text-black dark:text-white"
          >
            <XCircle className="w-10 h-10" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4">Checkout Cancelled</h1>
          <div className="space-y-4 mb-4 text-left">
            <p>Your payment was not completed.</p>
            <p>
              You can continue shopping or review your cart before trying again.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/"
              className="flex items-center justify-center px-4 py-3 font-semibold rounded-lg transition-all duration-300 shadow-md bg-white dark:bg-black text-black dark:text-white"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link
              href="/cart"
              className="flex items-center justify-center px-4 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md bg-white dark:bg-black text-black dark:text-white"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Cart
            </Link>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

const CancelPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelPageContent />
    </Suspense>
  );
};

export default CancelPage;
