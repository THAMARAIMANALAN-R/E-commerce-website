import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner@2.0.3';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import ProductDetailsPage from './components/pages/ProductDetailsPage';
import CartPage from './components/pages/CartPage';
import ContactPage from './components/pages/ContactPage';
import { products } from './data/products';
import { Product, CartItem, Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast.success('Updated quantity in cart');
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success('Added to cart');
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.success('Removed from cart');
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const getRelatedProducts = (product: Product) => {
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" richColors />
      
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProductDetails}
          />
        )}

        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            relatedProducts={getRelatedProducts(selectedProduct)}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProductDetails}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />
    </div>
  );
}
