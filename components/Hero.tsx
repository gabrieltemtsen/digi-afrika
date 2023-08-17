import styles from "../styles/Home.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const Hero = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("")
  const [productImage, setProductImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [inTxn, setInTxn] = useState(false);

  const handleProductIImage = (e: any) => {
    setProductImage(e.target.files[0]);
    toast.success("Successfully added Image!");
    setCoverImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const createProduct = async() => {
    toast.success('creaed')
  }

  return (
    <>
      

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
              Buy and Sell Digital Services
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn" onClick={() => window.createAd.showModal()}>
              Create product
            </button>
            <dialog  id="createAd" className="modal ">
            <Toaster />
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
                    <option>Star Wars</option>
                  </select>
                </div>
                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text">Product Image</span>
                  </label>
                  <input
                  onChange={handleProductIImage}
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                <span onClick={createProduct} className="mt-2  btn btn-success btn-wide">Create</span>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
