import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const staticProducts = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Add your image paths here images/hero.jpg
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
    },
     
    {
        id: '1',
        image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Add your image paths here images/hero.jpg
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 19.99,
      },
        
    {
        id: '1',
        image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Add your image paths here images/hero.jpg
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 19.99,
      },
    
    {
        id: '1',
        image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Add your image paths here images/hero.jpg
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 19.99,
      },
      {
        id: '1',
        image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Add your image paths here images/hero.jpg
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 19.99,
      },
  ];
const Products = () => {


   
  return (
    <>
    <div>
        <h1 className="mt-5 mb-5 font-bold text-4xl text-center">Products and Services</h1>
    </div>
      <div className="flex flex-wrap ml-14">
      {staticProducts.map((product) => (
        <div key={product.id} className="p-4 card w-96 ">
          <div className="border rounded-lg p-4">
           <figure><img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" /></figure> 
           <div className="card-body">
           <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-green-600 font-semibold">${product.price.toFixed(2)}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
              Buy Now
            </button>
            </div>
           
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Products;
