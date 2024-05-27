import './App.css'
import Navbar from './Components/navbar/Navbar';
import Gototop from './Components/HOME/LANDING/Gototop';
import Offer from './Components/offers/Offer'
import Landing from './Components/HOME/LANDING/Landing';
import { Route,Routes,useLocation} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Pagenotfound from './Pages/Pagenotfound';
import Sidebar from './Admin/Sidebar';
import Contact from './Pages/Contact';
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
       <Route element={<Cart/>} path='/cart'></Route>
       <Route element={<Checkout/>} path='/checkout'></Route>
       <Route element={<Sidebar/>} path='/sidebar'></Route>
       {/* <Route element={<Admin/>} path='/admin'></Route> */}
       <Route element={<Pagenotfound/>} path='*'></Route>
       <Route element={<Contact/>} path='/contact'></Route>
       {/* <Route element={<Users/>} path='/admin/users'></Route> */}
       
       </Routes>
       <Gototop/>
      </div>
    </>
  )
}

export default App
