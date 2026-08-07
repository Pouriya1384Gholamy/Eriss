import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './Components/layout/ScrollToTop';
import Home from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import Cart from './Pages/Cart/Cart';
import FaqPage from './Pages/FAQ/FaqPage';
import Contact from './Pages/Contact/Contact';
import DiscountPage from "./Pages/Discount/DiscountPage"
import Admin from './Pages/Admin/Admin';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Discount' element={<DiscountPage />} />
        <Route path='/Admin-Pannel' element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
