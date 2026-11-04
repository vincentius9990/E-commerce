import './App.css'
import Navbar from './Components/navbar/Navbar';
import Gototop from './Components/HOME/LANDING/Gototop';
import Offer from './Components/offers/Offer'
import Landing from './Components/HOME/LANDING/Landing';
import { Route,Routes,useLocation} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Pagenotfound from './Pages/Pagenotfound';
import Sidebar from './Admin/Sidebar';
import Contact from './Pages/Contact';
import Shop from './Pages/Shop';
import Returns from './Pages/Returns';
import PaymentSecurity from './Pages/PaymentSecurity';
import Support from './Pages/Support';
import Terms from './Pages/Terms';
// import Admin from './Admin/Admin';
function App() {
  const location = useLocation();
  return (
    <>
      <div>
      {location.pathname==='/' && <Offer/>}
      {location.pathname !== '/admin' && <Navbar/>}
       
       <Routes> 
       <Route element={<Landing/>} path='/'></Route>
       <Route element={<Login/>} path='/login'></Route>
       <Route element={<Register/>} path='/register'></Route>
       <Route element={<ForgotPassword/>} path='/forgot-password'></Route>
       <Route element={<ResetPassword/>} path='/reset-password/:token'></Route>
       <Route element={<ResetPassword/>} path='/reset-password'></Route>
       <Route element={<Cart/>} path='/cart'></Route>
       <Route element={<Checkout/>} path='/checkout'></Route>
       <Route element={<Sidebar/>} path='/sidebar'></Route>
       {/* <Route element={<Admin/>} path='/admin'></Route> */}
       <Route element={<Pagenotfound/>} path='*'></Route>
       <Route element={<Contact/>} path='/contact'></Route>
       <Route element={<Shop/>} path='/shop'></Route>
       <Route element={<Returns/>} path='/returns'></Route>
       <Route element={<PaymentSecurity/>} path='/payment-security'></Route>
       <Route element={<Support/>} path='/support'></Route>
       <Route element={<Terms/>} path='/terms'></Route>
       {/* <Route element={<Users/>} path='/admin/users'></Route> */}
       
       </Routes>
       <Gototop/>
      </div>
    </>
  )
}

export default App
