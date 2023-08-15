/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Footer, Navbar } from "../components"

const Profile = () => {

    return(
        <>
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
   <img src="https://www.hollywoodreporter.com/wp-content/uploads/2022/03/iger.jpg?w=1296" />
  </div>
  
</div>
<div className="avatar flex justify-center items-center mb-5">
    <h1 className="font-bold">Resolved ENS name</h1>
  </div>
                 <div className="bg-gray-300 min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto py-8">
        <div className="flex">
          {/* Chat Section */}
          <div className="w-2/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-black mb-4">Chat Section</h2>
              {/* Chat content */}
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

        {/* List of products */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-black mb-4">Your Products</h2>
            
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
  
        <Footer/>
      </div>
        </>
       
    )
}

export default Profile;