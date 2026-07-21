import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import WhatsAppFloat from "./components/layout/WhatsAppFloat/WhatsAppFloat";
import RetiroProvider from "./context/RetiroProvider";
import Home from "./pages/Home";
import AdminRetiros from "./pages/AdminRetiros.jsx";
import AdminPlanilla from "./pages/AdminPlanilla.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";

function AppContent() {
  const { pathname } = useLocation();
  const esAdmin = pathname.startsWith("/admin");

  return (
    <RetiroProvider>
      {!esAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:slug" element={<ProductCategory />} />
          <Route path="/admin/retiros" element={<AdminRetiros />} />
          <Route path="/admin/planilla" element={<AdminPlanilla />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </main>
      {!esAdmin && <Footer />}
      <WhatsAppFloat />
    </RetiroProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
