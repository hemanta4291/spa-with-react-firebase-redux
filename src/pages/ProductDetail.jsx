import React, { useState } from 'react'
import { faker } from '@faker-js/faker';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetail = () => {
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { encodedProduct } = useParams();
  const decodedProduct = decodeURIComponent(encodedProduct);
  const product = JSON.parse(decodedProduct);

  const goBack = () => {
    navigate(-1); // Navigate back
  };

  const handleQuentity = (type) => {
    if (type === 'increase') {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }

  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
  };


  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity }));
  };

  const existingProduct = items.find((item) => item.id === product.id);


  return (
    <div className='py-[40px]'>
      <div className='container md:px-0 px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className=''>
          <img src={product.thumbnail} width={'100%'} />
        </div>
        <div>
          <h2 className='text-2xl lg:text-4xl pb-4'>{product.title}</h2>
          <h2 className={` inline-block ${product.inStock ? 'border-primary-600 text-primary-600' : 'border-red-600 text-red-600'} border py-2 px-4 rounded-md text-base z-[2] font-bold `}>{product.inStock ? 'In Stock' : 'Out of Stock'}</h2>
          <p className='text-md py-4 font-semibold'> Price :<span> {product.price}</span></p>
          <div className='inline-flex items-center border border-gray-200 rounded-md gap-4'>
            <button className='material-icons p-2' type='button' onClick={() => handleQuentity('increase')}>remove</button>
            <input
              className='w-6 focus:outline-none'
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />

            <button className='material-icons p-2' type='button' onClick={() => handleQuentity('decrease')}>add</button>
          </div>
          {
            product.inStock ?
              <button type='button' onClick={() => handleAddToCart(product)} className={`${existingProduct ? 'bg-green-400 border-green-400 hover:bg-green-600' : 'bg-primary-600 border-primary-600 hover:bg-primary-25'} transition-all duration-1000 ease-out  text-[15px] mt-8 px-5 font-[500] text-white h-11 rounded  flex gap-2 items-center justify-center`}>
                <span className="material-icons-outlined text-white">shopping_cart</span>
                Add to cart
              </button>
              :
              <button type='button' disabled className={`bg-red-400 border-red-400 text-[15px] mt-8 px-5 font-[500] text-white h-11 rounded  flex gap-2 items-center justify-center`}>
                <span className="material-icons-outlined text-white">shopping_cart</span>
                Add to cart
              </button>
          }

          <p className='pt-4'>
            {product.description ? product.description : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

