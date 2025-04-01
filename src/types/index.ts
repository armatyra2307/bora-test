export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'sink' | 'faucet';
  imageUrl: string;
  images?: string[];
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  discount?: number;
  new?: boolean;
  colors?: string[];
  dimensions?: {
    width: number;
    depth: number;
    height: number;
  };
  material?: string;
  style?: string;
  specifications: {
    [key: string]: string | number | boolean;
  };
}