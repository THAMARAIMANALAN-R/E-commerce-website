import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  showViewDetails?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  showViewDetails = false,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-blue-600 mb-2">₹{product.price.toLocaleString('en-IN')}</p>
          {showViewDetails && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        {showViewDetails && onViewDetails && (
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={() => onViewDetails(product)}
          >
            View Details
          </Button>
        )}
        <Button
          className={`${showViewDetails ? 'flex-1' : 'w-full'} bg-blue-600 hover:bg-blue-700 rounded-full`}
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
