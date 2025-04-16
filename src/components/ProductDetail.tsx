import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Heart, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/ProductGrid';
import { useTranslation } from 'react-i18next';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const fetchedProduct = getProductById(productId);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setRelatedProducts(getRelatedProducts(productId));
      } else {
        // Redirect to 404 if product not found
        navigate('/404');
      }
      
      // Reset states when product changes
      setQuantity(1);
      setCurrentImageIndex(0);
      
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [id, navigate]);

  if (!product) {
    return null;
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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap mb-4 sm:mb-6 text-xs sm:text-sm">
        <Link to="/" className="text-gray-500 hover:text-blue-600">{t('home')}</Link>
        <span className="mx-1 sm:mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-blue-600">{t('catalog')}</Link>
        <span className="mx-1 sm:mx-2 text-gray-400">/</span>
        <Link 
          to={`/products/${product.category === 'sink' ? 'sinks' : 'faucets'}`} 
          className="text-gray-500 hover:text-blue-600"
        >
          {product.category === 'sink' ? t('sinks') : t('faucets')}
        </Link>
        <span className="mx-1 sm:mx-2 text-gray-400">/</span>
        <span className="text-gray-700 truncate">{product.name}</span>
      </nav>
      
      {/* Back button */}
      <Link 
        to="/products" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-4 sm:mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        {t('backToProducts')}
      </Link>
      
      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-16">
        {/* Product image gallery */}
        <div>
          <div className="relative bg-white rounded-lg overflow-hidden shadow-md mb-3 sm:mb-4">
            <img 
              src={allImages[currentImageIndex]} 
              alt={`${product.name} - image ${currentImageIndex + 1}`} 
              className="w-full h-[250px] sm:h-[400px] object-cover"
            />
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
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
                    alt={`${product.name} - thumbnail ${index + 1}`}
                    className="w-full h-16 sm:h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Specifications Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {t('specifications')} {product.name}
              </h3>
            </div>
            
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-6">
                {/* Left column */}
                <div className="space-y-1.5 sm:space-y-2">
                  {leftSpecs.slice(0, isSpecsExpanded ? undefined : 2).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="flex flex-col sm:flex-row sm:items-center py-1.5 sm:py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-900 text-xs sm:text-sm lg:text-base font-medium mb-0.5 sm:mb-0 sm:w-1/2 sm:pr-4 whitespace-nowrap">
                        {key}
                      </span>
                      <span className="text-gray-600 text-xs sm:text-sm lg:text-base break-words">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value.toString()}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Right column */}
                <div className="space-y-1.5 sm:space-y-2">
                  {rightSpecs.slice(0, isSpecsExpanded ? undefined : 2).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="flex flex-col sm:flex-row sm:items-center py-1.5 sm:py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-900 text-xs sm:text-sm lg:text-base font-medium mb-0.5 sm:mb-0 sm:w-1/2 sm:pr-4 whitespace-nowrap">
                        {key}
                      </span>
                      <span className="text-gray-600 text-xs sm:text-sm lg:text-base break-words">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value.toString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {specEntries.length > 4 && (
              <button 
                onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
                className="w-full flex items-center justify-center gap-2 p-2 sm:p-3 border-t border-gray-200 hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-800 text-sm sm:text-base"
              >
                {isSpecsExpanded ? (
                  <>
                    <span>{t('showLessSpecs')}</span>
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                ) : (
                  <>
                    <span>{t('showAllSpecs')}</span>
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        {/* Product info */}
        <div>
          {/* Badges */}
          <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {product.new && (
              <span className="bg-blue-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                {t('new')}
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                -{product.discount}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                {t('outOfStock')}
              </span>
            )}
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1.5 sm:mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm sm:text-base text-gray-700">{product.rating}</span>
            </div>
            <span className="mx-1.5 sm:mx-2 text-gray-400">|</span>
            <span className="text-sm sm:text-base text-gray-600">{product.reviews} {t('reviews')}</span>
          </div>
          
          {/* Price */}
          <div className="mb-4 sm:mb-6">
            {product.discount ? (
              <div className="flex items-center">
                <span className="text-2xl sm:text-3xl font-bold text-gray-800 mr-2 sm:mr-3">
                  {finalPrice.toLocaleString()} ₽
                </span>
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                  {product.price.toLocaleString()} ₽
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                {product.price.toLocaleString()} ₽
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{product.description}</p>
          
          {/* Features */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">{t('features')}:</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-1.5 sm:mr-2">•</span>
                  <span className="text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">{t('colors')}:</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.colors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 shadow-sm transition-transform hover:scale-110" 
                      style={{ 
                        backgroundColor: color === 'Gold' ? '#D4AF37' : 
                                      color === 'Bronze' ? '#CD7F32' : 
                                      color === 'Copper' ? '#B87333' : 
                                      color === 'Black' ? '#000000' :
                                      color === 'White' ? '#FFFFFF' :
                                      color === 'Pink' ? '#FFC0CB' :
                                      color === 'Chrome' ? '#E6E6E6' :
                                      color === 'Nickel' ? '#727472' :
                                      color === 'Brass' ? '#B5A642' :
                                      color === 'Graphite' ? '#383838' :
                                      color === 'Anthracite' ? '#293133' :
                                      color === 'Titanium' ? '#878681' :
                                      color === 'Rose Gold' ? '#E0BFB8' :
                                      color === 'Black Gold' ? '#2C2416' :
                                      color === 'Patina' ? '#669999' :
                                      color === 'Tin' ? '#C0C0C0' :
                                      color === 'Antique Bronze' ? '#665D1E' :
                                      color === 'Antique Copper' ? '#B87333' :
                                      color === 'Antique Gold' ? '#D4AF37' :
                                      color === 'Antique Nickel' ? '#727472' :
                                      color === 'Antique Chrome' ? '#E6E6E6' :
                                      color === 'Antique Graphite' ? '#383838' :
                                      color === 'Antique Anthracite' ? '#293133' :
                                      color === 'Antique Titanium' ? '#878681' :
                                      color === 'Antique Rose Gold' ? '#E0BFB8' :
                                      color === 'Antique Black Gold' ? '#2C2416' :
                                      color === 'Antique Patina' ? '#669999' :
                                      color === 'Antique Tin' ? '#C0C0C0' :
                                      '#FFFFFF'
                      }}
                    />
                    <span className="mt-1 text-xs text-gray-600">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add to cart and favorites */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            {product.inStock ? (
              <>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:text-gray-800"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-800 font-medium">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:text-gray-800"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                >
                  {t('addToCart')}
                </button>
              </>
            ) : (
              <button
                disabled
                className="flex-grow bg-gray-300 text-gray-500 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-not-allowed text-sm sm:text-base"
              >
                {t('outOfStock')}
              </button>
            )}
            <button
              onClick={handleToggleFavorite}
              className={`p-2 sm:p-3 border rounded-lg transition-colors ${
                isInFavorites(product.id)
                  ? 'border-red-500 text-red-500 hover:bg-red-50'
                  : 'border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500'
              }`}
              aria-label={isInFavorites(product.id) ? t('removeFromFavorites') : t('addToFavorites')}
            >
              <Heart className={`h-5 w-5 sm:h-6 sm:w-6 ${isInFavorites(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {/* Shipping and warranty */}
          <div className="space-y-2 sm:space-y-3 border-t border-gray-200 pt-4 sm:pt-6">
            <div className="flex items-center text-sm sm:text-base text-gray-600">
              <Truck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-500" />
              <span>{t('shipping')}</span>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-500" />
              <span>{t('warranty')} {product.specifications.Warranty}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{t('relatedProducts')}</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};

export default ProductDetail;