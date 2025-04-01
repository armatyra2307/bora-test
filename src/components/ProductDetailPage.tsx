import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/ProductGrid';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const fetchedProduct = getProductById(productId);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setRelatedProducts(getRelatedProducts(productId));
      }
      
      // Reset states when product changes
      setQuantity(1);
      setCurrentImageIndex(0);
      
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Товар не найден
        </h2>
        <p className="text-gray-500 mb-6">
          К сожалению, запрашиваемый товар не существует или был удален.
        </p>
        <Link 
          to="/products" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Вернуться к списку товаров
        </Link>
      </div>
    );
  }

  // Get all product images
  const allImages = product.images ? [product.imageUrl, ...product.images] : [product.imageUrl];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  // Calculate discounted price if applicable
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleToggleFavorite = () => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Split specifications into two columns
  const specEntries = Object.entries(product.specifications);
  const midPoint = Math.ceil(specEntries.length / 2);
  const leftSpecs = specEntries.slice(0, midPoint);
  const rightSpecs = specEntries.slice(midPoint);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-blue-600">Главная</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-blue-600">Товары</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link 
          to={`/products/${product.category === 'sink' ? 'sinks' : 'faucets'}`} 
          className="text-gray-500 hover:text-blue-600"
        >
          {product.category === 'sink' ? 'Раковины' : 'Смесители'}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700">{product.name}</span>
      </nav>
      
      {/* Back button */}
      <Link 
        to="/products" 
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Назад к товарам
      </Link>
      
      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product image gallery */}
        <div>
          <div className="relative bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img 
              src={allImages[currentImageIndex]} 
              alt={`${product.name} - изображение ${currentImageIndex + 1}`} 
              className="w-full h-[400px] object-cover"
            />
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                  aria-label="Предыдущее изображение"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                  aria-label="Следующее изображение"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mb-6">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`relative rounded-lg overflow-hidden ${
                    currentImageIndex === index 
                      ? 'ring-2 ring-blue-500' 
                      : 'hover:opacity-75'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - миниатюра ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Specifications Table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Характеристики {product.name}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column */}
              <div>
                {leftSpecs.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-800">
                      {typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : value.toString()}
                    </span>
                  </div>
                ))}
              </div>
              {/* Right column */}
              <div>
                {rightSpecs.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-800">
                      {typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : value.toString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product info */}
        <div>
          {/* Badges */}
          <div className="flex gap-2 mb-4">
            {product.new && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                Новинка
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                Нет в наличии
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-700">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">{product.reviews} отзывов</span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            {product.discount ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-800 mr-3">
                  {finalPrice.toLocaleString()} ₽
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {product.price.toLocaleString()} ₽
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-800">
                {product.price.toLocaleString()} ₽
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Особенности:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Доступные цвета:</h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 rounded-full border border-gray-300 mb-1" style={{ backgroundColor: color === 'Золото' ? '#D4AF37' : color === 'Бронза' ? '#CD7F32' : color === 'Медь' ? '#B87333' : 'white' }}></div>
                    <span className="text-xs text-gray-600">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add to cart and favorites */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {product.inStock ? (
              <>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={decrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    aria-label="Уменьшить количество"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="px-4 py-2 text-gray-800 font-medium">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    aria-label="Увеличить количество"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Добавить в корзину
                </button>
              </>
            ) : (
              <button
                disabled
                className="flex-grow bg-gray-300 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed"
              >
                Нет в наличии
              </button>
            )}
            <button
              onClick={handleToggleFavorite}
              className={`p-3 border rounded-lg transition-colors ${
                isInFavorites(product.id)
                  ? 'border-red-500 text-red-500 hover:bg-red-50'
                  : 'border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500'
              }`}
              aria-label="Добавить в избранное"
            >
              <Heart className={`h-6 w-6 ${isInFavorites(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {/* Shipping and warranty */}
          <div className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex items-center text-gray-600">
              <Truck className="h-5 w-5 mr-3 text-blue-500" />
              <span>Бесплатная доставка при заказе от 5000 ₽</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ShieldCheck className="h-5 w-5 mr-3 text-blue-500" />
              <span>Гарантия {product.specifications.Гарантия}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Похожие товары</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;