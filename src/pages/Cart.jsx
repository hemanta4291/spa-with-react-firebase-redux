import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart, decrementQuantity, removeFromCart } from '../features/cart/cartSlice'
import { useCalculateTotalPrice } from '../hooks/useCalculateTotalPrice'
import { useNavigate } from 'react-router-dom'
import Empty from '../components/Empty'




const Cart = () => {
    const { cart } = useSelector((state) => state)
    const navigate = useNavigate()
    const { items, discount, delivaryFee } = cart
    const dispatch = useDispatch()
    const { itemSubTotal, totalPriceAfterDiscount } = useCalculateTotalPrice(cart)

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity: 1 }));
    };

    const handleDecrimentQuentity = (id) => {
        dispatch(decrementQuantity({ id }));
    }

    const handleDeleteItem = (id) => {
        dispatch(removeFromCart({ id }))
    }

    const handleCheckoutCart = () => {
        dispatch(clearCart())
        console.log({ items, discount, delivaryFee, itemSubTotal, totalPriceAfterDiscount })
    }
    const handleClearCart = () => {
        const confirmRemoval = window.confirm('Are you sure you want to clear the cart?');

        if (confirmRemoval) {
            dispatch(clearCart())
            navigate('/')

        }

    }

    return (
        <>
            <Breadcrumb title='Cart' />
            <div className='py-[40px] mt-[40px] bg-gray-50'>

                <div className='container mx-auto grid grid-cols-1 lg:grid-cols-6 gap-4'>
                    <div className='col-span-4 border border-gray-200 rounded-md p-6 bg-white'>
                        <div className='mb-4 pb-4 flex justify-between items-center border-b-2'>
                            <h2 className='text-3xl'>Items</h2>

                            { items.length > 0 && <button type='button' className='bg-red-400 py-2 px-3 rounded-md cursor-pointer text-white ' onClick={handleClearCart}>Clear Cart</button> }
                        </div>

                        {
                            !items?.length > 0 ? <Empty title="Cart is empty !!" />

                                : <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='border-b-2'>
                                            <th className='pb-3 mb-2'>image</th>
                                            <th className='pb-3 mb-2'>Name</th>
                                            <th className='pb-3 mb-2'>Qnt</th>
                                            <th className='pb-3 mb-2'>Inc/Dec</th>
                                            <th className='pb-3 mb-2'>Price</th>
                                            <th className='pb-3 mb-2'>Total Price</th>
                                            <th className='pb-3 mb-2'>Action</th>
                                        </thead>
                                        <tbody>
                                            {
                                                items?.map((item) => (
                                                    <tr>
                                                        <td className='py-3'> <img className=' w-[80px] h-[80px] rounded-md' src={item.thumbnail} alt={item.title} /></td>
                                                        <td className='py-3'>{item.title}</td>
                                                        <td className='py-3'>{item.quantity}</td>
                                                        <td className='py-3'>{item.title}</td>
                                                        <td className='py-3'>
                                                            <div className='flex-1 inline-flex items-center border border-gray-200 rounded-md gap-4'>

                                                                <button className='material-icons p-2' type='button' onClick={() => handleDecrimentQuentity(item.id)}>remove</button>


                                                                <button className='material-icons p-2' type='button' onClick={() => handleAddToCart(item)}>add</button>

                                                            </div>
                                                        </td>
                                                        <td className='py-3'>{item.price}</td>
                                                        <td className='py-3'>{(item.price * item.quantity).toFixed(2)}</td>
                                                        <td className='py-3'><button type='button' onClick={() => handleDeleteItem(item.id)} className='material-icons-outlined text-red-600 border-0 focus:outline-none'>
                                                            delete
                                                        </button></td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                        }
                    </div>
                    <div className='col-span-2 '>
                        <div className='border border-gray-200 rounded-md p-6 bg-white'>
                            <h2 className='text-xl'>Order Summery :</h2>
                            {
                                !items.length > 0 ? <Empty title="Cart Summery is empty !!" /> :

                                    <>
                                        <ul className='py-4'>
                                            <li className='flex justify-between  text-base py-2'>Sub-Total : <span>$ {itemSubTotal.toFixed(2)}</span></li>
                                            <li className='flex justify-between  text-base py-2'>Delivary Fee : <span>$ {cart.delivaryFee.toFixed(2)}</span></li>
                                            <li className='flex justify-between  text-base py-2 border-b-2 border-gray-200'>Discount : <span>${cart.discount} %</span></li>
                                            <li className='flex justify-between  text-base py-2'>Total = <span> $ {totalPriceAfterDiscount.toFixed(2)}</span></li>
                                        </ul>
                                        <button onClick={handleCheckoutCart} className='bg-primary-600 rounded-full w-full text-base text-white p-2 hover:bg-primary-25'>Checkout</button>
                                    </>

                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart