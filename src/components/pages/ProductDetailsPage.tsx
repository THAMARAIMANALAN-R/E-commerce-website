import { useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import ProductCard from '../ProductCard';
import { Product, Page } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductDetailsPageProps {
  product: Product;
  relatedProducts: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigate: (page: Page) => void;
  onViewProduct: (product: Product) => void;
}

export default function ProductDetailsPage({
  product,
  relatedProducts,
  onAddToCart,
  onNavigate,
  onViewProduct,
}: ProductDetailsPageProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-4"
          onClick={() => onNavigate('products')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge className="w-fit mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              {product.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>
            
            <div className="text-3xl text-blue-600 mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <Separator className="mb-6" />

            <div className="mb-6">
              <h3 className="mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator className="mb-6" />

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 rounded-full px-12"
              onClick={handleAddToCart}
            >
              Add to Cart - ₹{(product.price * quantity).toLocaleString('en-IN')}
            </Button>

            {/* Additional Info */}
            <div className="mt-8 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free shipping on orders over ₹4,000</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure checkout guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl md:text-3xl mb-6">Related Products</h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {relatedProducts.map((relatedProduct) => (
                <CarouselItem key={relatedProduct.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div onClick={() => onViewProduct(relatedProduct)}>
                    <ProductCard
                      product={relatedProduct}
                      onAddToCart={(p) => onAddToCart(p, 1)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
