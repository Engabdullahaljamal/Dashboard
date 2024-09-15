
import './App.css'
import CreateAccount from './Pages/CreateAccount/CreateAccount'
import Login from './Pages/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import CreateProduct from './Pages/CreateProduct/CreateProduct'
import EditProduct from './Pages/EditProduct/EditProduct'

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/signup' element={<CreateAccount />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create_product' element={<CreateProduct />} />
        <Route path='/edit_product/:product_id' element={<EditProduct />} />
        <Route path='/' element={<Login />} />
      </Routes>
     
     
    </>
  )
}

export default App
