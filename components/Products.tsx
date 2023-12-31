/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { fetchEnsAvatar, getNetwork, readContract, watchNetwork } from "@wagmi/core";
import { ARBITRUM_CONTRACT_ADDRESS, AURORA_CONTRACT_ADDRESS, AVALANCHE_CONTRACT_ADDRESS, ECOMMERCE_ABI, ECOMMERCE_CONTRACT_ADDRESS, GOERLI_CONTRACT_ADDRESS } from "../utils/contracts";
import { shortenAddress } from "../utils/shortenAddress";
import { shortenString } from "../utils/shortenString";
import { useEnsName } from "wagmi";
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
  ensName: string;
  avatar: string;
};

const Products = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const { chain, chains } = getNetwork()
 

  const getAllPro = async () => {
    try {

      //getProducts Based on Connected Chain
        //Avalanche
        if(chain?.id == 43113) {
          const products: any = await readContract({
            address: AVALANCHE_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getAllProducts",
          });
          
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
          
        }
        else if (chain?.id == 421613) {
          // ARBITRUM
          const products: any = await readContract({
            address: ARBITRUM_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getAllProducts",
          });

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
          
  
        }
        else if (chain?.id == 5) {
          //Goerli
          const products: any = await readContract({
            address: GOERLI_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getAllProducts",
          });

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
          
        }
        else if (chain?.id == 1313161555) {
          //AURORA
          const products: any = await readContract({
            address: AURORA_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getAllProducts",
          });

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
        
  
        }
  
     

     
    } catch (error) {
      // console.log(error);
    }
  };
  getAllPro();

  useEffect(() => {
  
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
               {!   product.sold && (
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
                     <div className="mt-1 text-sm text-green-400">
                     <div className="avatar">
                      <div className="w-6 rounded-full mr-1 ">
                        <img src={product.ensAvatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR5LhzwQJZ-33pHjmP1ps8zCtxcGUe7-j5EA9wGr0&s"} alt="avatar" />
                      </div>
                      {product.ensName || shortenAddress(product.owner)}
                    </div>
                       
                     </div>
                   </div>
                   <p className="text-sm font-medium text-green-400">
                     {product.productPrice} usdc
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
