import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'material-icons/iconfont/material-icons.css';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ContactUs from './pages/ContactUs';
import CommonLayout from './loyout/CommonLayout';
import Cart from './pages/Cart';
import AuthLayout from './loyout/AuthLayout';
import SignIn from './pages/SignIn';
import useAuthenticationCheck from './hooks/useAuthenticationCheck';
import PublicRoute from './loyout/PublicRoute';
import PrivateRoute from './loyout/PrivateRoute';
import NotFound from './components/NotFound';


function App() {
  const authCheck = useAuthenticationCheck()

  if(!authCheck)return <div>checking initial.........</div>

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path="/auth" element={<AuthLayout />}>
          <Route exact path='sign-in' element={<PublicRoute/>}>
            <Route exact path='' element={<SignIn/>}/>
          </Route>
          
        </Route>
        <Route path="/" element={<CommonLayout />}>
          <Route path=''  element={<Home/>} />
          <Route path='products/:title'  element={<Products/>} />
          <Route path='product/details/:encodedProduct'  element={<ProductDetail/>} />
          {/* <PrivateRoute path="cart" element={<Cart />} /> */}
          <Route exact path='cart' element={<PrivateRoute/>}>
            <Route exact path='' element={<Cart/>}/>
          </Route>
          <Route path='contact-us'  element={<ContactUs/>} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>

{/* <Routes>
        <PublicRoute
          path="/sign-in"
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />

        <PrivateRoute
          path="/"
          element={
            <CommonLayout>
              <Route path="" element={<Home />} />
              <Route path="products/:title" element={<Products />} />
              <Route path="product/details/:encodedProduct" element={<ProductDetail />} />
              <Route path="contact-us" element={<ContactUs />} />
              <PrivateRoute path="cart" element={<Cart />} />
            </CommonLayout>
          }
        />
      </Routes> */}

      </BrowserRouter>
    </div>
  )
}

export default App
