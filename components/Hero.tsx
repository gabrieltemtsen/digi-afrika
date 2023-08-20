import styles from "../styles/Home.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { getJSONFromCID, getJSONFromFileinCID, pushImgToStorage, putFileandGetHash, putJSONandGetHash } from "../utils/ipfsGateway";
import { useAccount } from "wagmi";
import { ECOMMERCE_ABI, ECOMMERCE_CONTRACT_ADDRESS } from "../utils/contracts";
import { writeContract } from "@wagmi/core";


type Product = {
  productName: string;
  prdouctPrice: string;
  owner: any;
  productImage: string;
  productFile: string;
  productDescription: string;
  productCategory: string;
}
const Hero = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { address } = useAccount()
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("")
  const [productImage, setProductImage] = useState<File | null>(null);
  const [digitalProduct, setDigitalProduct] = useState<File | null>(null);

  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [inTxn, setInTxn] = useState(false);
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleProductImage = (e: any) => {
    setProductImage(e.target.files[0]);
    toast.success("Successfully added Image!");
    setCoverImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleDigitalProduct = (e: any) => {
    setDigitalProduct(e.target.files[0]);
    toast.success("Successfully added Product!");
  };


  const createProduct = async() => {

    if(productImage && productName && price && description && category) {

      setInTxn(true)

    const productImgCID = await pushImgToStorage(productImage);
    const digitalProductCID = await putFileandGetHash(digitalProduct);

    const prodObj: Product = {
      productName: productName,
      prdouctPrice: price,
      owner: address,
      productImage: productImgCID,
      productFile: digitalProductCID,
      productDescription: description,
      productCategory: category,
    }

    const productCID = await putJSONandGetHash(prodObj)


    const { hash } = await writeContract({
      address: ECOMMERCE_CONTRACT_ADDRESS,
      abi: ECOMMERCE_ABI,
      functionName: "createProduct",
      args: [productCID, price],
    });

    if(hash) {

      toast.success('Successfully created Product')

      setInTxn(false)
      closeModal()
  

    }
    else{
      setInTxn(false)
    }

   

    

    } else {
      toast.error('Please complete the form and try again')
      setInTxn(false)
    }

  }
 
  return (
    <>
                      <Toaster />


      <div
        className="hero min-h-screen  "
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Buy and Sell Digital Products
            </h1>
            <p className="mb-5">
              Buy and sell digital Products on digi-Afrika, one of africas best decentralised e-commerce platform open around the globe
            </p>
            <button className="btn" onClick={openModal}>
              Create product
            </button>

            <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a Product Ad
                  </Dialog.Title>
              <form method="dialog" className="modal-box ">
                <h1>Create Ads</h1>
                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                     onChange={(e) => {setProductName(e.target.value)}}

                    type="text"
                    placeholder="Enter product name"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                     onChange={(e) => {setDescription(e.target.value)}}

                    type="text"
                    placeholder="Enter description"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    onChange={(e) => {setPrice(e.target.value)}}

                    type="text"
                    placeholder="Enter price in celo"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select 
                  onChange={(e) => {setCategory(e.target.value)}}

                  className="select select-bordered">
                    <option disabled selected>
                      Select
                    </option>
                    <option>Music</option>
                    <option>Books</option>
                    <option>Design</option>
                    <option>Art works</option>
                  </select>
                </div>
                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text">Product Image</span>
                  </label>
                  <input
                  onChange={handleProductImage}
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text">Digital Product</span>
                  </label>
                  <input
                  onChange={handleDigitalProduct}
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                <span onClick={createProduct} className="mt-2  btn btn-success btn-wide"> {inTxn ?
                 (  <span className="loading loading-infinity loading-lg">loading</span>): ('Create')} </span>

                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button onClick={closeModal} className="btn">Close</button>
                </div>
              </form>
              

           


              
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
