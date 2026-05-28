import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";

import ComingSoonPage from "./pages/CommingSoon";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductPage";

import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import WishlistPage from "./pages/Wishlist";
import CartPage from "./pages/Cart";
import { AuthModal, AuthModel } from "./pages/AuthModal";
import CheckoutPage from "./pages/Checkout";

const IS_COMING_SOON = true;

export default function App() {

  if (IS_COMING_SOON) {
    return (
      <ReactQueryProvider>
        <ComingSoonPage />
      </ReactQueryProvider>
    );
  }

  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Loader />
                <HomePage />
              </>
            }
          />

          <Route path="/products" element={<ProductsPage />} />

          <Route
            path="/product/:slug"
            element={<ProductDetailPage />}
          />

          <Route path="/wishlist" element={<WishlistPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route
            path="/auth"
            element={
              <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <AuthModal isOpen={true} onClose={() => window.location.href = '/'} />
              </div>
            }
          />

          <Route path="/checkout" element={<CheckoutPage />} />

          {/*
            /checkout
            /account
            /orders
          */}

          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-primary">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}