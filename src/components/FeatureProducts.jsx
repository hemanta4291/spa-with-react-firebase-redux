import { faker } from '@faker-js/faker';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';


const allProducts = Array.from({ length: 20 }, () => ({
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.image(),
    category: faker.commerce.department(),
    inStock: faker.datatype.boolean(),
    description: faker.commerce.productDescription()
}));

const FeatureProducts = () => {
    const [title, setTitle] = useState('title')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addedToCartMap, setAddedToCartMap] = useState({});


    const goToDetails = (product) => {
        const productString = JSON.stringify(product);
        const encodedProduct = encodeURIComponent(productString);
        navigate(`/product/details/${encodedProduct}`);
      };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity: 1 }));
        setAddedToCartMap((prevMap) => ({
            ...prevMap,
            [product.id]: true,
        }));
    };

    return (
        <div className='categorie py-[40px] px-4 lg:px-0'>
            <div className='container mx-auto'>
                <div className='pb-6 flex flex-col lg:flex-row justify-between  items-start lg:items-center'>
                    <div>
                        <h2 className='text-2xl lg:text-4xl text-gray-800 font-semibold pb-2'>Feature Products</h2>
                        <h4 className='text-base text-gray-800 font-semibold lg:pb-0 pb-4'>Add Popular Categories to weekly line up</h4>
                    </div>
                    <Link to={`/products/${title}`} className='bg-primary-50 py-[6px] px-3 border-primary-50 rounded-[4px] flex items-center gap-2 text-primary-700 text-[15px] font-[500]'>
                        View All
                        <span className="material-icons-outlined ">arrow_forward</span>
                    </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
                    {
                        allProducts?.map((product) => (
                            <div key={product.id} className='p-4 bg-white border border-gray-200 rounded-lg relative'>
                                <h2 className={` ${product.inStock ? 'border-primary-600 bg-primary-600' : 'bg-red-600'} absolute left-0 top-12 p-1 rounded-[4px] text-white text-[11px] z-[2] font-bold `}>{product.inStock ? 'In Stock' : 'Out of Stock'}</h2>
                                <div onClick={() => goToDetails(product)} className='cursor-pointer'>
                                <img className='w-full md:w-[350px] inline-flex border border-gray-200 rounded-lg'
                                    src={product.thumbnail} 
                                />

                                <div className='flex justify-between items-center py-4'>
                                    <h5 className='text-info-700 text-base font-semibold w-[50%]  tracking-wide truncate'>
                                        {product.title}
                                    </h5>
                                    <span className='text-secondary-700 text-xl  '>$ {product.price}</span>
                                </div>
                                </div>
                                {
                                    product.inStock ?
                                        <button type='button' onClick={() => handleAddToCart(product)} className={`${addedToCartMap[product.id] ? 'bg-green-400 border-green-400 transition-all duration-1000 ease-out hover:bg-green-600' : 'bg-primary-600 border-primary-600 transition-all duration-1000 ease-out hover:bg-primary-25'}  text-[15px] mt-3 font-[500] text-white h-11 w-full rounded  flex gap-2 items-center justify-center`}>
                                            <span className="material-icons-outlined text-white">shopping_cart</span>
                                            {
                                                addedToCartMap[product.id] ? 'Added to cart' : 'Add to cart'
                                            }

                                        </button>
                                        :
                                        <button type='button' disabled className={`bg-red-600 border-red-600 text-[15px] mt-3 font-[500] text-white h-11 w-full rounded  flex gap-2 items-center justify-center`}>
                                            <span className="material-icons-outlined text-white">shopping_cart</span>
                                            {
                                                addedToCartMap[product.id] ? 'Added to cart' : 'Add to cart'
                                            }

                                        </button>
                                }
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default FeatureProducts