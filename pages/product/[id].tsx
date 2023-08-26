/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Footer, Navbar } from "../../components";
import { useRouter } from "next/router";
import { parseEther, parseGwei } from "viem";
import toast, { Toaster } from "react-hot-toast";
import { getNetwork, readContract, watchNetwork, writeContract } from "@wagmi/core";
import {
  ARBITRUM_CONTRACT_ADDRESS,
  AURORA_CONTRACT_ADDRESS,
  AVALANCHE_CONTRACT_ADDRESS,
  ECOMMERCE_ABI,
  ECOMMERCE_CONTRACT_ADDRESS,
  GOERLI_CONTRACT_ADDRESS,
} from "../../utils/contracts";
import axios from "axios";
import { useAccount } from "wagmi";

type Product = {
  productName: string;
  productPrice: string;
  owner: any;
  productImage: string;
  productFile: string;
  productDescription: string;
  productCategory: string;
};

export default function ProductView() {
  const router = useRouter();

  const [currentId, setCurrentId] = useState<any>();
  const [product, setProduct] = useState<any>({});

  const [isSold, setIsSold] = useState(false);
  const [inTxn, setInTxn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { address } = useAccount();
  const { chain, chains } = getNetwork()


  const id = router.query.id;

  const buyProduct = async () => {
    try {
      const price = product.productPrice as `${number}`;
      setInTxn(true);

    
    
        if(chain?.id == 43113) {
          const { hash } = await writeContract({
            address: AVALANCHE_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "buyProduct",
            args: [id],
            value: parseEther(price),
          });
    
          toast.success("Purchase Successfull on Avalanche");
          setInTxn(false);
          getProductData()
         
        }
        else if (chain?.id == 421613) {
          const { hash } = await writeContract({
            address: ARBITRUM_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "buyProduct",
            args: [id],
            value: parseEther(price),
          });
    
          toast.success("Purchase Successfull");
          setInTxn(false);
          getProductData()
        }
        else if (chain?.id == 5) {
          const { hash } = await writeContract({
            address: GOERLI_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "buyProduct",
            args: [id],
            value: parseEther(price),
          });
    
          toast.success("Purchase Successfull");
          setInTxn(false);
          getProductData()
          
        }
        else if (chain?.id == 1313161555) {
          const { hash } = await writeContract({
            address: AURORA_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "buyProduct",
            args: [id],
            value: parseEther(price),
          });
    
          toast.success("Purchase Successfull");
          setInTxn(false);
          getProductData()
         
  
        }
    

     
    } catch (error) {
      console.log(error);
      setInTxn(false);
    }
  };

  const getProductData = async () => {
    try {


     
    
        if(chain?.id == 43113) {
          const product: any = await readContract({
            address: AVALANCHE_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getProductsById",
            args: [currentId],
          });
    
          
    
        
    
          if (product) {
            let config: any = {
              method: "get",
              url: `https://${product.cid}.ipfs.w3s.link/file.json`,
              headers: {},
            };
            const axiosResponse = await axios(config);
    
            const productDataObj: Product = axiosResponse.data;
    
            const ProductObj = {
              productId: Number(product.id),
              owner: product.seller,
              productPrice: productDataObj.productPrice,
              productName: productDataObj.productName,
              productDescription: productDataObj.productDescription,
              productImage: productDataObj.productImage,
              productFile: productDataObj.productFile,
              sold: product.sold,
            };
    
            setProduct(ProductObj);
          }
          
        }
        else if (chain?.id == 421613) {
          const product: any = await readContract({
            address: ARBITRUM_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getProductsById",
            args: [currentId],
          });
    
          
    
        
    
          if (product) {
            let config: any = {
              method: "get",
              url: `https://${product.cid}.ipfs.w3s.link/file.json`,
              headers: {},
            };
            const axiosResponse = await axios(config);
    
            const productDataObj: Product = axiosResponse.data;
    
            const ProductObj = {
              productId: Number(product.id),
              owner: product.seller,
              productPrice: productDataObj.productPrice,
              productName: productDataObj.productName,
              productDescription: productDataObj.productDescription,
              productImage: productDataObj.productImage,
              productFile: productDataObj.productFile,
              sold: product.sold,
            };
    
            setProduct(ProductObj);
          }
          
        }
        else if (chain?.id == 5) {

          const product: any = await readContract({
            address: GOERLI_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getProductsById",
            args: [currentId],
          });
    
          
    
        
    
          if (product) {
            let config: any = {
              method: "get",
              url: `https://${product.cid}.ipfs.w3s.link/file.json`,
              headers: {},
            };
            const axiosResponse = await axios(config);
    
            const productDataObj: Product = axiosResponse.data;
    
            const ProductObj = {
              productId: Number(product.id),
              owner: product.seller,
              productPrice: productDataObj.productPrice,
              productName: productDataObj.productName,
              productDescription: productDataObj.productDescription,
              productImage: productDataObj.productImage,
              productFile: productDataObj.productFile,
              sold: product.sold,
            };
    
            setProduct(ProductObj);
          }
          
        }
        else if (chain?.id == 1313161555) {

          const product: any = await readContract({
            address: AURORA_CONTRACT_ADDRESS,
            abi: ECOMMERCE_ABI,
            functionName: "getProductsById",
            args: [currentId],
          });
    
          
    
        
    
          if (product) {
            let config: any = {
              method: "get",
              url: `https://${product.cid}.ipfs.w3s.link/file.json`,
              headers: {},
            };
            const axiosResponse = await axios(config);
    
            const productDataObj: Product = axiosResponse.data;
    
            const ProductObj = {
              productId: Number(product.id),
              owner: product.seller,
              productPrice: productDataObj.productPrice,
              productName: productDataObj.productName,
              productDescription: productDataObj.productDescription,
              productImage: productDataObj.productImage,
              productFile: productDataObj.productFile,
              sold: product.sold,
            };
    
            setProduct(ProductObj);
          }
          
  
        }
    


     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentId(id);
    getProductData();
  }, [currentId]);

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="pt-6 bg-blue-950 rounded-lg shadow-md p-4">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"></div>

            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={`https://ipfs.io/ipfs/${product.productImage}`}
                  alt={"product"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-8 bg-gray-300  mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.productName}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.productPrice} celo {product.sold}
              </p>

              {product.sold ? (
                <span className="mt-3 badge badge-lg bg-green-700">
                  Item bought
                </span>
              ) : (
                <button onClick={buyProduct} className="mt-2 btn btn-wide ">
                  {inTxn ? (
                    <span className="loading loading-infinity loading-lg">
                      loading
                    </span>
                  ) : (
                    "Purchase"
                  )}
                </button>
              )}

              <div className="mt-3">
                {product.sold ? (
                  <button className="mt-2 btn btn-wide ">File dispute</button>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-3 text-black">
                {product.owner == address && (
                  <h1>
                    Download Your Product here:{" "}
                    <a
                      target="_blank"
                      href={`https://ipfs.io/ipfs/${product.productFile}`}
                      className="text-blue-500"
                    >
                      Product Link
                    </a>{" "}
                  </h1>
                )}
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.productDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
