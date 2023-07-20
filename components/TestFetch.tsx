// "use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const FetchProducts = async () => {
  if (!process.env.BASE_API_URL) {
    throw new Error("BASE_API_URL is not defined");
  }
  const apiUrl = process.env.BASE_API_URL;

  try {
    const response = await axios.get(apiUrl);

    const products = response.data.$values;
    console.log("inside fetch", products);
    return products;
  } catch (error) {
    console.error(error);
  }
};

const formattedProducts = (data: any): Product[] => {
  return data.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      typeProduct: product.typeProduct,
      qtyInStock: product.qtyInStock,
      variants: product.productVariants.$values.map((variant: any) => {
        return {
          id: variant.id,
          color: variant.color,
          productId: variant.productId,
          images: variant.productImages.$values.map((image: any) => {
            return {
              id: image.id,
              imageUrl: image.imageUrl,
              productVariantId: image.productVariantId,
            };
          }),
        };
      }),
    };
  });
};

type Product = {
  $id: string;
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  typeProduct: string;
  qtyInStock: number;
  variants: ProductVariant[];
};

type ProductVariant = {
  $id: string;
  id: number;
  color: string;
  productId: number;
  images: ProductImage[];
};

type ProductImage = {
  $id: string;
  id: number;
  imageUrl: string;
  productVariantId: number;
};

const TestFetch = async () => {
  const productsData = await FetchProducts();
  const products = formattedProducts(productsData);

  console.log(JSON.stringify(products, null, 2));
  console.log(products);
  return (
    <div>
      TestFetch
      <div>
        {products.map((item, idx) => (
          <div key={idx} className="mb-6 border-b-2">
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.brand}</p>
            <div>
              {item.variants.map((pr) => (
                <div key={pr.id}>
                  <p>{pr.color}</p>
                  {pr.images.map((img) => (
                    <Image
                      alt="img"
                      src={img.imageUrl}
                      height={100}
                      width={100}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestFetch;
