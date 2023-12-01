import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Breadcrumb from '../components/Breadcrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';



const fetchProducts = () => {
  // fetching data from an API 
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = Array.from({ length: 50 }, () => ({
        id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
        category: faker.commerce.department(),
        inStock: faker.datatype.boolean(),
        description: faker.commerce.productDescription()
      }));
      resolve(products);
    }, 1000); // customize delay in fetching data
  });
};

const Products = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [addedToCartMap, setAddedToCartMap] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [isLoading, setIsLoading] = useState(true);


  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(title.toLowerCase()) ||
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (priceRange.min === '' || parseFloat(product.price) >= parseFloat(priceRange.min)) &&
      (priceRange.max === '' || parseFloat(product.price) <= parseFloat(priceRange.max)) &&
      (!showInStockOnly || product.inStock)
  );


  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((selected) => selected !== category)
        : [...prevSelected, category]
    );
  };


  const handleStockToggle = () => {
    setShowInStockOnly((prevValue) => !prevValue);
  };

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
    <>
      <Breadcrumb title='All Products' />
      <div className='py-[40px] mt-[40px] bg-gray-50'>
        <div className='container md:px-0 px-4 mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4'>
          <div className=''>
            <h2 className=' text-2xl mb-6'>Filter by </h2>
            <div className='border border-gray-200 p-2 mb-4 bg-white rounded-md'>

              <h3 className='text-lg border-b pb-2 mb-2'>Category:</h3>
              {
                !isLoading &&
                <ul className='h-[150px] overflow-auto'>
                  {[...new Set(products.map((product) => product.category))].map((category) => (
                    <li
                      key={category}
                      className={`text-sm py-1 my-1 px-2 rounded-md cursor-pointer hover:bg-primary-600 hover:text-white ${selectedCategories.includes(category) ? 'bg-primary-600 text-white' : ''
                        }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              }
            </div>
            <div className='border border-gray-200 p-2 mb-4 bg-white rounded-md'>

              <h3 className='text-lg border-b pb-2 mb-4'>Price Range:</h3>
              {
                !isLoading &&
                <div className='flex gap-2'>
                  <input
                    className='flex-1 w-full border border-gray-200 rounded-md px-2 py-1 focus:outline-none'
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />
                  <input
                    className='flex-1 w-full border border-gray-200 rounded-md px-2 py-1 focus:outline-none'
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>
              }
            </div>
            <div className='border border-gray-200 p-2 mb-4 bg-white rounded-md'>

              <h3 className='text-lg border-b pb-2 mb-4'>Stock:</h3>
              {
                !isLoading &&
                <input
                  width='50px' height='50px'
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={handleStockToggle}
                />

              }
            </div>

          </div>
          {
            !isLoading && (
              <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-7 col-span-4'>
                {
                  filteredProducts?.map((product) => (
                    <div key={product.id} className='p-4 bg-white border border-gray-200 rounded-lg relative'>
                      <h2 className={` ${product.inStock ? 'border-primary-600 bg-primary-600' : 'bg-red-600'} absolute left-0 top-12 p-1 rounded-[4px] text-white text-[11px] z-[2] font-bold `}>{product.inStock ? 'In Stock' : 'Out of Stock'}</h2>
                      <div onClick={() => goToDetails(product)} className='cursor-pointer'>
                        <img className=' w-full lg:w-[350px] inline-flex border border-gray-200 rounded-lg'
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
                          <button type='button' onClick={() => handleAddToCart(product)} className={`${addedToCartMap[product.id] ? 'bg-green-400 border-green-400 hover:bg-green-600' : 'bg-primary-600 border-primary-600 hover:bg-primary-25'} transition-all duration-1000 ease-out  text-[15px] mt-3 font-[500] text-white h-11 w-full rounded  flex gap-2 items-center justify-center`}>
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

            )
          }
        </div>
      </div>
    </>

  )
}

export default Products