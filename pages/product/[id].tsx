/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Footer, Navbar } from '../../components'
import { useRouter } from "next/router";
const product = {
  name: 'Basic Tee 6-Pack',
  price: '192',
  images: [
    {
      src: 'https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  }
const reviews = { href: '#', average: 4, totalCount: 117 }



export default function ProductView() {

  const router = useRouter();

  const [currentId, setCurrentId] = useState<any>();

  const id = router.query.id



  useEffect(() => {
    setCurrentId(id)
  }, [currentId], )

  return (
    <>
    <Navbar />
      <div className="container mx-auto py-8">
      <div className="pt-6 bg-blue-950 rounded-lg shadow-md p-4">
    

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
           
          </div>

          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            </div>
        
        </div>

        {/* Product info */}
        <div className="mt-8 bg-gray-300  mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price} celo {currentId}</p>

            <button className='mt-2 btn btn-wide'>Purchase</button>

          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

         
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  
  )
}