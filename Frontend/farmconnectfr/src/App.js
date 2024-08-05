import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './componenets/Navbar';
import Signup from './componenets/Signup';
import Login from './componenets/Login';
import Farmer_Signup from './componenets/Farmer/Farmer_Signup';
import BuyerSignup from './componenets/Buyer/BuyerSignup';
import SupplierSignup from './componenets/Supplier/Suppliersignup';
import Shop from './componenets/Farmer/Shop';
import Donate from './componenets/Donate';
import About from './componenets/About';
import Home from './componenets/Home';
import FarmerSell from './componenets/Farmer/FarmerSell';
import BuyerShop from './componenets/Buyer/BuyerShop';
import SupplierSell from './componenets/Supplier/SupplierSell';
import UrlState from './context/Urlstate';
import CartState from './context/cartstate';
import FarmerProds from './componenets/Farmer/FarmerProds';
import SupplierProds from './componenets/Supplier/SupplierProds';
import ViewCart from './componenets/ViewCart';
import News from './componenets/News';
import Payment from './componenets/Payment';
import Item from './componenets/Item';
import EditProfile from './componenets/Farmer/EditProfile';
import EditProfileFarmer from './componenets/Farmer/EditProfile';
import EditProfileSupplier from './componenets/Supplier/EditProfileSupplier';
import EditProfileBuyer from './componenets/Buyer/EditProfileBuyer';
import Tac from './componenets/Tac';
import Laws from './componenets/Laws';



function App() {
  return (
    <>
      <CartState>
        <UrlState>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/donate' element={<Donate />} />
              <Route path='/about' element={<About />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/viewcart' element={<ViewCart />} />
              <Route path='/news' element={<News />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/item/:id' element={<Item />} />
              <Route path='/tac' element={<Tac />} />
              <Route path='/laws' element={<Laws />} />
              {/* Buyer stuff */}
              <Route path='/buyersignup' element={<BuyerSignup />} />
              <Route path='/buyershop' element={<BuyerShop />} />
              <Route path='/editprofilebuyer' element={<EditProfileBuyer />} />
              {/* Suppplier stuff */}
              <Route path='/suppliersignup' element={<SupplierSignup />} />
              <Route path='/suppliersell' element={<SupplierSell />} />
              <Route path='/supplierprods' element={<SupplierProds />} />
              <Route path='/editprofilesupplier' element={<EditProfileSupplier />} />
              {/* Farmer stuff */}
              <Route path='/editprofilefarmer' element={<EditProfileFarmer />} />
              <Route path='/farmersignup' element={<Farmer_Signup />} />
              <Route path='/farmershop' element={<Shop />} />
              <Route path='/farmersell' element={<FarmerSell />} />
              <Route path='/farmerprods' element={<FarmerProds />} />
            </Routes>
          </Router>
        </UrlState>
      </CartState>
    </>
  )
}

export default App;
