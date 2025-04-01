import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import emailjs from '@emailjs/browser';

function App() {
  useEffect(() => {
    // Инициализация EmailJS
    emailjs.init('Yl0jc0DjY9rYa0FVR');
  }, []);

  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;