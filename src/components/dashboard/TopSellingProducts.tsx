"use client";

import Image from "next/image";
import { MoreHorizontal, Star } from "lucide-react";

type Product = {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "NIKE Shoes Black Pattern",
    image: "/images/nikeshoes.jpg",
    rating: 3.7,
    price: "$87",
  },
  {
    id: "2",
    name: "iPhone 12",
    image: "/images/iphone12.jpg",
    rating: 4.0,
    price: "$987",
  },
  {
     id: "3",
     name: "iPhone 17",
     image: "/images/iphone17.jpg",
     rating: 4.5,
     price: "$1000",
   },
];

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="fill-amber-400 text-amber-400 shrink-0"
        />
      ))}
      {hasHalf && (
        <div className="relative w-[14px] h-[14px] shrink-0">
          <Star size={14} className="text-slate-200" />
          <div
            className="absolute left-0 top-0 h-full overflow-hidden"
            style={{ width: 7 }}
          >
            <Star size={14} className="fill-amber-400 text-amber-400" />
          </div>
        </div>
      )}
      {Array.from({ length: 5 - full - (hasHalf ? 1 : 0) }).map((_, i) => (
        <Star key={`empty-${i}`} size={14} className="text-slate-200" />
      ))}
    </div>
  );
}

function TopSellingProducts() {
  return (
    <div className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Top Selling Products
        </h3>
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="More options"
        >
          <MoreHorizontal size={22} />
        </button>
      </div>

      <ul className="divide-y divide-slate-100">
        {products.map((product) => (
          <li key={product.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {product.name}
                </p>
                <div className="mt-1">
                  <StarRating value={product.rating} />
                </div>
                <p className="mt-1.5 text-sm font-semibold text-slate-800">
                  {product.price}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSellingProducts;
