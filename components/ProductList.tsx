"use client";

import Stripe from "stripe";
import { ProductCard } from "./ProductCard";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
  showSearch?: boolean;
}

export const ProductList = ({ products, showSearch = true }: Props) => {
  const [searchTem, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTem.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  const productsToDisplay = showSearch ? filteredProduct : products;

  return (
    <div>
      {showSearch && (
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={searchTem}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productsToDisplay.map((product, key) => (
          <li key={key}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
