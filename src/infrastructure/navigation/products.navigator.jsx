import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductDetailScreen from "../../features/products/screens/product-detail.screen";
import { ProductsScreen } from "../../features/products/screens/products.screen";

export const ProductsNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsScreen />} />
      <Route path=":productId" element={<ProductDetailScreen />} />
    </Routes>
  );
};
