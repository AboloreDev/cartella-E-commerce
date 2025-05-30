"use client";

import useStore from "@/store";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Container from "@/components/code/Container";

const SuccessPageContent = () => {
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (orderNumber) {
      resetCart();
    }
  }, [orderNumber, resetCart]);
  return (
    <Container>
      <div className="mt-10 md:py-10 md:mt-0 bg-black dark:bg-white text-white dark:text-black  flex items-center justify-center mx-4 rounded-xl">
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
            <Check className=" w-10 h-10" />
          </motion.div>

          <h1 className="text-3xl font-bold  mb-4">Order Confirmed!</h1>
          <div className="space-y-4 mb-4 text-left">
            <p className="">
              Thank you for your purchase. We&apos;re processing your order and
              will ship it soon. A confirmation email with your order details
              will be sent to your inbox shortly.
            </p>
            <p className="">
              Order Number: <span className="font-semibold">{orderNumber}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/"
              className="flex items-center justify-center px-4 py-3 font-semibold rounded-lg transition-all duration-300 shadow-md bg-white dark:bg-black text-black dark:text-white"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link
              href="/orders"
              className="flex items-center justify-center px-4 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md bg-white dark:bg-black text-black dark:text-white"
            >
              <Package className="w-5 h-5 mr-2" />
              Orders
            </Link>
            <Link
              href="/store"
              className="flex items-center justify-center px-4 py-3 font-semibold rounded-lg  transition-all duration-300 shadow-md bg-white dark:bg-black text-black dark:text-white"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Store
            </Link>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
