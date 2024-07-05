import { Routes, Route } from 'react-router-dom';
import { ShopDetailScreen } from "../../features/shops/screens/shop-detail.screen";
import { ShopsScreen } from "../../features/shops/screens/shops.screen";

export const ShopsNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopsScreen />} />
      <Route path="/shops/:shopId" element={<ShopDetailScreen />} />
    </Routes>
  );
};
