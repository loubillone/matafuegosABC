import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import WhatsAppFloat from "./components/layout/WhatsAppFloat/WhatsAppFloat";
import RetiroProvider from "./context/RetiroProvider";
import Home from "./pages/Home";
import AdminRetiros from "./pages/AdminRetiros.jsx";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";

function App() {
  return (
    <BrowserRouter>
      <RetiroProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/productos/:slug" element={<ProductCategory />} />
            <Route path="/admin/retiros" element={<AdminRetiros />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </RetiroProvider>
    </BrowserRouter>
  );
}

export default App;
