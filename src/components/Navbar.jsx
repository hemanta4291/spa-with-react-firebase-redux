import React, { useEffect, useRef, useState } from 'react'
import { faker } from '@faker-js/faker';
import { Icons } from './Icons'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../features/auth/authSlice';

const allProducts = Array.from({ length: 20 }, () => ({
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.image(),
}));

const Navbar = () => {
    const navigate = useNavigate()
    const { items } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const [productTitle, setProductTitle] = useState('title')
    const location = useLocation();
    const dispatch = useDispatch()
    const dropdownRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const activeStyle = 'font-semibold';
    const commonStyle = '';
    useEffect(() => {
        // Filter products based on the search query
        const filtered = allProducts.filter(
            (product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.price.toString().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        if (e.target.value) {
            setSearchQuery(e.target.value);
            setIsSearching(true);
        } else {
            setSearchQuery(e.target.value);
            setFilteredProducts([])
            setIsSearching(false);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSearching(false);
                // setSearchQuery('')
            }
        };

        if (isSearching) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSearching]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setIsSearching(false);
    };

    const handleSearchQueryToProduct = (title) => {
        navigate(`/products/${title}`);
        setIsSearching(false);
        setSearchQuery(title)
    }

    const logOut = () => {
        dispatch(signOut())
    }




    return (
        <header>
            <div className=' bg-black '>
                <div className='container mx-auto h-14 flex lg:justify-between justify-center items-center'>
                    <div>
                        <p className='text-white lg:block hidden'>We are available 24/7, Need help? Call Us: +1 516 231 1313</p>
                    </div>
                    <div>
                        <ul className='flex items-center gap-4 text-white'>
                            <li className='lg:block hidden border-r pr-4'>FAQs</li>
                            {
                                user ?
                                    <>
                                        <li className='inline-flex items-center gap-2 border-r pr-4'>{user.displayName}
                                            <img className='w-8 h-8 rounded-full object-cover' src={user.photoURL} alt={user.displayName} />

                                        </li>
                                        <button className='border border-white text-[12px] font-semibold rounded-md py-1 px-2' onClick={logOut}>Log Out</button>
                                    </>
                                    :
                                    <>
                                        <li className='border-r pr-4 inline-flex items-center gap-1'>Account <span className="material-icons-outlined inline-flex">person</span>

                                        </li>
                                        <Link className='border border-white text-[12px] font-semibold rounded-md py-1 px-2' to='/auth/sign-in'>Sign in</Link>
                                    </>
                            }

                        </ul>
                    </div>
                </div>
            </div>
            <div className='container mx-auto flex items-center justify-between py-3 border-b border-gray-200 px-4 lg:px-0'>
                <div className='basis-[20%]'>
                    Logo
                </div>

                <div className='basis-full lg:basis-[80%] flex items-center flex-1 justify-end gap-6 '>
                    <form className='w-full mx-full lg:max-w-[829px] relative' onSubmit={handleSearchSubmit}>
                        <input className='h-11 border focus:outline-none px-4 border-gray-200 w-full rounded'
                            type="text"
                            placeholder="Search Products"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type='submit' className='bg-primary-600 w-[48px] h-full flex items-center justify-center rounded-e text-white absolute right-0 top-0'> <span class="material-icons">search</span>  </button>

                        {isSearching && filteredProducts.length > 0 && (
                            <ul ref={dropdownRef} className="absolute left-0 w-full top-[40px] bg-gray-50 py-5 z-[2] border border-gray-200 h-[350px] overflow-auto">
                                {filteredProducts.map((product) => (
                                    <li key={product.id} className='px-5 py-2 block hover:bg-gray-200 cursor-pointer' onClick={() => handleSearchQueryToProduct(product.title)}>
                                        {product.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                    <div className='flex items-center gap-3'>
                        <Link to='/cart' className='p-[6px] cursor-pointer flex relative'>
                            <span className="material-icons-outlined">shopping_cart</span>
                            {
                                items.length > 0 &&
                                <div className='absolute flex items-center justify-center top-[-5px] left-[-5px] w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-bold'>
                                    {items.length}
                                </div>
                            }

                        </Link>
                    </div>
                </div>
            </div>

            {/* navbar */}
            <div className='container mx-auto py-3 px-4 lg:px-0'>
                <div className='flex items-center gap-8'>
                    <ul className='flex items-center gap-6 py-2'>
                        <li className='flex items-center gap-[6px] text-base text-gray-800'>
                            <NavLink
                                to="/"
                                className={location.pathname === '/' ? `${commonStyle} ${activeStyle}` : commonStyle}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className='flex items-center gap-[6px] text-base text-gray-800'>
                            <NavLink
                                to={`/products/${productTitle}`}
                                className={location.pathname === '/products' || location.pathname.startsWith('/products/') ? `${commonStyle} ${activeStyle}` : commonStyle}
                            >
                                Products
                            </NavLink> </li>
                        <li className='flex items-center gap-[6px] text-base text-gray-800'>
                            <NavLink
                                to="/contact-us"
                                className={location.pathname === '/contact-us' ? `${commonStyle} ${activeStyle}` : commonStyle}
                            >
                                Contact
                            </NavLink> </li>
                    </ul>

                </div>
            </div>
        </header>
    )
}

export default Navbar