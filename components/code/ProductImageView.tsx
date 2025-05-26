"use client";

import { internalGroqTypeReferenceTo } from "@/sanity.types";
import {
  SanityImageCrop,
  SanityImageHotspot,
} from "@sanity/image-url/lib/types/types";
import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductImageViewProps {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number | boolean;
}
const ProductImageView = ({ images = [], isStock }: ProductImageViewProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeImage._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(activeImage).url()}
            alt="Product Image"
            height={700}
            width={700}
            priority
            className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain hoverEffect rounded-md ${isStock === 0 ? "opacity-50" : ""}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-5 gap-2 h-20 md:h-24 md:gap-2">
        {images.map((image) => (
          <button
            key={image._key}
            onClick={() => setActiveImage(image)}
            className={`w-20 cursor-pointer h-20 md:w-24 md:h-24 border rounded-md overflow-hidden relative group ${
              activeImage._key === image._key ? "opacity-40" : ""
            } ${isStock === 0 ? "opacity-50" : ""}`}
          >
            <Image
              src={urlFor(image).url()}
              alt="Product Thumbnail"
              height={100}
              width={100}
              className="object-contain w-full h-auto"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageView;
