import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../../data/products';
import ProductHero from './ProductHero';
import ProductTabs from './ProductTabs';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return <div className="text-center py-12 text-red-500">محصول پیدا نشد!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <ProductTabs 
        product={product} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
};

export default ProductDetailPage;
