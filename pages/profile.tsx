/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Footer, Navbar } from "../components"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { WorkerRequest } from "../utils/types"
import { useAccount, useEnsAddress, useEnsAvatar, useEnsName, useSignMessage } from "wagmi"
import axios from "axios"
import { useDebounce } from "../hooks/useDebounce"
import { useFetch } from "../hooks/useFetch"
import Link from "next/link"
import { ethers, providers } from "ethers"
import { getDefaultProvider } from 'ethers'
import { fetchEnsAvatar, readContract, writeContract } from "@wagmi/core"
import { ECOMMERCE_ABI, ECOMMERCE_CONTRACT_ADDRESS } from "../utils/contracts"
import toast, { Toaster } from "react-hot-toast"

type Product = {
  productId: any;
  productName: string;
  productPrice: string;
  productImage: string;
  productFile: string;
  productDescription: string;
  productCategory: string;
  sold: boolean;
}

const Profile = () => {
  
  
  const { address } = useAccount()



  const provider = getDefaultProvider() 
   let [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
    const [ensName, setEnsName] = useState<any>('')
    const [currentAddr, setCurrentAddr] = useState<any>('')
    const [ensAvatar, setEnsAvatar] = useState<any>('')
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [inTxn, setInTxn] = useState(false)

    const [digiPoints, setDigiPoints] = useState<any>()

 const { data: ens } = useEnsName({
 address: address,
 chainId: 5,
 })
 console.log('ens:',ens)

 const getAvatar = async() => {

  if(ensName) {
    const ensAvatar = await fetchEnsAvatar({
      name: ensName,
    })
    setEnsAvatar(ensAvatar)
    console.log(ensAvatar)
  }
  

  
 }
 getAvatar()

 


  const regex = new RegExp('^[a-z0-9-]+$')
  const debouncedName = useDebounce(name, 500)
  const enabled = !!debouncedName && regex.test(debouncedName)
  const { data, isLoading, signMessage, variables } = useSignMessage()


  const requestBody: WorkerRequest = {
    name: `${debouncedName}.digi-afrikan.eth`,
    owner: address!,  
    addresses: { '60': address },
    texts: { description },
    signature: {
      hash: data!,
      message: variables?.message!,
    },
  }
  const {
    data: gatewayData,
    error: gatewayError,
    isLoading: gatewayIsLoading,
  } = useFetch(data && 'https://ens-gateway.gabrieltemtsen.workers.dev/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })  


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
   


  async function createENS() {
    try {
      signMessage({
        message: `Register ${name}.digi-afrikan.eth`,
      })

     
        console.log(address, 'here: ', data, variables)
      const requestBody: WorkerRequest = {
        name: `${name}.digi-afrikan.eth`,
        owner: address!,  
        addresses: { '60': address },
        texts: { description },
        signature: {
          hash: '0xbc05706d6998123eba534fabc90b1ca571e33bbce50747c71682c370101d346f25b919d8cc1bc2f6f630413c48d3bb5782ada20a6e7342709e61588ca97134671c',
          message: 'Register asa.digi-afrikan.eth',
        },
      }
      console.log('reEQ: ',requestBody)
      
  
      // const {
      //   data: gatewayData,
      //   error: gatewayError,
      //   isLoading: gatewayIsLoading,
      // } = useFetch(data && 'https://ens-gateway.gabrieltemtsen.workers.dev/set', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestBody),
      // })
      if( requestBody) {
        const res = await axios.post('https://ens-gateway.gabrieltemtsen.workers.dev/set', { requestBody });
  
      console.log(res.data)

      }
      

      

      
      
    } catch (error) {
      console.log(error)
      
    }
  
  }
  // const getEnsByResolving = async() => {
  //   const naming = await provider.lookupAddress(address);
  //   console.log(naming)
  //   setEnsName(naming);

  // }

  const getProductsByAddress = async () => {
    try {
      

      const products: any = await readContract({
        address: ECOMMERCE_CONTRACT_ADDRESS,
        abi: ECOMMERCE_ABI,
        functionName: "getProductsByOwnerAddress",
        args: [address]
      });

      const digiPoints: any = await readContract({
        address: ECOMMERCE_CONTRACT_ADDRESS,
        abi: ECOMMERCE_ABI,
        functionName: "getUserPoints",
        args: [address]
      });

      setDigiPoints(Number(digiPoints))






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

  const  deleteProduct = async (id: any) => {
    try {
      setInTxn(true)
      const { hash } = await writeContract({
        address: ECOMMERCE_CONTRACT_ADDRESS,
        abi: ECOMMERCE_ABI,
        functionName: "removeProduct",
        args: [id],
      });

      toast.success('successfully deleted product')
      setInTxn(false)

      
    } catch (error) {

      setInTxn(false)
      console.log(error)
    }
  }

  useEffect(() => {
    setCurrentAddr(address)
    setEnsName(ens)
    getProductsByAddress()
    
    
  }, [address, ens], )

    return(
        <>
        <Toaster />
         <Navbar />
        <div className=" min-h-screen">
        
  
        {/* Main Content */}
        <div className="container mx-auto py-8">
          <div className="flex">
            {/* Chat Section  */}
            <div className="w-2/3 p-4">
              <div className="bg-blue-950 rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4">Profile</h2>
                <div className="avatar flex justify-center items-center">
  <div className=" mb-3 items-center w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
   <img src={ensAvatar ||'https://www.hollywoodreporter.com/wp-content/uploads/2022/03/iger.jpg?w=1296' } />
  </div>
  
</div>
<div className="avatar flex justify-center items-center mb-5">
    <h1 className="font-bold">{address ? (
       ens
      ) : (
       address
      )}</h1>
  </div>
                 <div className="bg-gray-300 min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto py-8">
        <div className="flex">
          {/* Chat Section */}
          <div className="w-2/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-black mb-4">Your Points: {digiPoints} digiPoint(s) </h2>
              <button className="btn btn-sm">redeem points</button>
              <p className="text-black mt-1 text-sm italic" >get points by making purchases on digi-afrika</p>

            </div>
          </div>

          {/* Transaction History */}
          <div className="w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
            <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-blue-700 bg-opacity-2 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-7"
        >
          Register ENS name 
        </button>              
            </div>
          </div>
        </div>

        {/* List of products */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-black mb-4">Your Products</h2>

            <div className="overflow-x-auto">
  <table className="table text-black">
    {/* head */}
    <thead className="text-black">
      <tr>
       
        <th>Product</th>
        <th>Description</th>
        <th>Price</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {allProducts.map( (product) => (
        <>
         <tr>
        
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={`https://ipfs.io/ipfs/${product.productImage}`}alt="Product" />
              </div>
            </div>
            <div>
              <div className="font-bold">{product.productName}</div>
            </div>
          </div>
        </td>
        <td>
         { product.productDescription}
          <br/>
        </td>
        <td>{product.productPrice}</td>
        <th>
           <button className="btn  btn-sm">
        <Link href={{
                        query: {
                          id: product.productId,
                        },
                        pathname: `/product/${product.productId}`,
                      }}>
                      View
                    </Link>
                    </button>
         
        </th>
        <th>
          <button onClick={(e)=>{deleteProduct(product.productId)}} className="btn btn-sm bg-red-900">{inTxn ?
                 (  <span className="loading loading-infinity  loading-lg">loading</span>): ('delete')}</button>
        </th>
      </tr>
        </>

       ))}
     
     
     
    </tbody>
    {/* foot */}
    <tfoot className="text-black">
      <tr>
        
      <th>Product</th>
        <th>Description</th>
        <th>Price</th>
        <th></th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>
            
          </div>
        </div>
      </div>

    </div>
              </div>
            </div>
  
            {/* Transaction History */}
            <div className="w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold text-black mb-4">Transaction History</h2>
                {/* Transaction history content */}
              </div>
            </div>
          </div>
  
          
        </div>
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
          </Transition.Child>setId();

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
                    Register a digi-afrikan ENS name
                  </Dialog.Title>
                  <form method="dialog" onSubmit={(e) => {
            e.preventDefault()
            signMessage({
              message: `Register ${debouncedName}.digi-afrikan.eth`,
            })
          }} className="modal-box ">
                <h1>Create Ads</h1>
                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text"> Name</span>
                  </label>
                  <input
                    onChange={(e) => {setName(e.target.value)}}

                    type="text"
                    placeholder="Ens"
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
                    placeholder="Enter profile description"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

              
                <button type="submit" className="mt-2  btn btn-success btn-wide">Register</button>
                <div className="modal-action">
                  <span onClick={closeModal}className="btn">Close</span>
                </div>
                {gatewayError ? (
          <div>
            {gatewayError.message === 'Conflict'
              ? 'Somebody already registered that name'
              : 'Something went wrong'}
          </div>
        ) : gatewayData ? (
          <div>
            <p>
              Visit the{' '}
              <Link className="text-blue-400" href={`https://ens.app/${debouncedName}.digi-afrikan.eth`}>
                ENS Manager
              </Link>{' '}
              to see your name
            </p>
          </div>
        ) : !!debouncedName && !enabled ? (
          <div>Name must be lowercase alphanumeric</div>
        ) : null}
              </form>

           


              
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  
        <Footer/>
      </div>

        </>
       
    )
}

export default Profile;