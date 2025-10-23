import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export default function Header({ currentPage, onNavigate, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">ShopHub</span>
          </button>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-blue-600 transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`hover:text-blue-600 transition-colors ${
                currentPage === 'products' ? 'text-blue-600' : ''
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-blue-600 transition-colors ${
                currentPage === 'contact' ? 'text-blue-600' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 rounded-full"
              />
            </div>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 rounded-full"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-center gap-6 mt-4">
          <button
            onClick={() => onNavigate('home')}
            className={`text-sm hover:text-blue-600 transition-colors ${
              currentPage === 'home' ? 'text-blue-600' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('products')}
            className={`text-sm hover:text-blue-600 transition-colors ${
              currentPage === 'products' ? 'text-blue-600' : ''
            }`}
          >
            Products
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`text-sm hover:text-blue-600 transition-colors ${
              currentPage === 'contact' ? 'text-blue-600' : ''
            }`}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
