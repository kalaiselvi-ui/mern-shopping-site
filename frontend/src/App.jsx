import React from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import AdminLayout from './components/Admin/AdminLayout'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagement from './components/Admin/OrderManagement'
import ProductManagent from './components/Admin/ProductManagent'
import UserManagement from './components/Admin/UserManagement'
import Checkout from './components/Cart/Checkout'
import UserLayout from './components/Layout/UserLayout'
import ProductDetails from './components/Products/ProductDetails'
import AdminHomePage from './pages/AdminHomePage'
import CollectionPage from './pages/CollectionPage'
import Home from './pages/Home'
import Login from './pages/Login'
import MyOrderPage from './pages/MyOrderPage'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderDetails from './pages/OrderDetails'
import Profile from './pages/Profile'
import Regsiter from './pages/Regsiter'
import store from './redux/store'

const App = () => {
  return (

    <Provider store={store}>
      <div>
        <Toaster position="top-right" />
        <Routes>
          <Route path='/' element={<UserLayout />}>
            {/*User Layout*/}
            <Route index element={< Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Regsiter />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='collections/:collection' element={<CollectionPage />}></Route>
            <Route path='/product/:id' element={<ProductDetails />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/order-confirmation' element={<OrderConfirmation />} ></Route>
            <Route path='order/:id' element={<OrderDetails />}></Route>
            <Route path='/my-orders' element={<MyOrderPage />}></Route>
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
            {/*Admin Layout*/}
            <Route index element={<AdminHomePage />}></Route>
            <Route path='users' element={<UserManagement />}></Route>
            <Route path="products" element={<ProductManagent />}></Route>
            <Route path='products/:id/edit' element={<EditProductPage />}></Route>
            <Route path='orders' element={<OrderManagement />}></Route>
          </Route>
        </Routes>
      </div>
    </Provider>
  )
}

export default App