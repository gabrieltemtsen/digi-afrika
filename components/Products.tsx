/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { readContract } from "@wagmi/core";
import { ECOMMERCE_ABI, ECOMMERCE_CONTRACT_ADDRESS } from "../utils/contracts";
import { shortenAddress } from "../utils/shortenAddress";
import { shortenString } from "../utils/shortenString";
type Product = {
  productId: any;
  productName: string;
  productPrice: string;
  owner: any;
  productImage: string;
  productFile: string;
  productDescription: string;
  productCategory: string;
  sold: boolean;
};

const Products = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const getAllPro = async () => {
    try {
      const products: any = await readContract({
        address: ECOMMERCE_CONTRACT_ADDRESS,
        abi: ECOMMERCE_ABI,
        functionName: "getAllProducts",
      });

      // console.log(products)

      let newProduct = [];

      for (let i = 0; i < products.length; i++) {
        const productCID = products[i].cid;
        const productId = products[i].id;
        const productStats = products[i].sold;
        const productOwner = products[i].seller;

        if (productCID) {
          let config: any = {
            method: "get",
            url: `https://${productCID}.ipfs.w3s.link/file.json`,
            headers: {},
          };
          const axiosResponse = await axios(config);

          const productDataObj: Product = axiosResponse.data;

          const ProductObj = {
            productId: Number(productId),
            owner: productOwner,
            productPrice: productDataObj.productPrice,
            productName: productDataObj.productName,
            productDescription: productDataObj.productDescription,
            productImage: productDataObj.productImage,
            sold: productStats,
          };

          newProduct.push(ProductObj);
        }
      }

      setAllProducts(newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPro();
  });
  return (
    <>
      <div>
        <h1 className="mt-5 mb-5 font-bold text-4xl text-center">
          Products and Services
        </h1>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Products on Digi-Afrika
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allProducts.map((product) => (
            <>
               {!product.sold && (
                 <div key={product.id} className="group relative">
                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                   <img
                     src={`https://ipfs.io/ipfs/${product.productImage}`}
                     alt={"product"}
                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                   />
                 </div>
                 <div className="mt-4 flex justify-between">
                   <div>
                     <h3 className="text-sm ">
                       <Link
                         href={{
                           query: {
                             id: product.productId,
                             // campaignId: campaign.campaignID,
                           },
                           pathname: `/product/${product.productId}`,
                         }}
                       >
                         <span aria-hidden="true" className="absolute inset-0" />
                         {product.productName}
                       </Link>
                     </h3>
                     <p className="mt-1 text-sm text-gray-500">
                       {shortenString(product.productDescription)}
                     </p>
                     <p className="mt-1 text-sm ">
                       By: {shortenAddress(product.owner)}
                     </p>
                   </div>
                   <p className="text-sm font-medium text-green-400">
                     {product.productPrice} celo
                   </p>
                 </div>
                 <button className="mt-2 btn btn-wide">purchase</button>
               </div>

)}
            </>

         
           
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
