import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";

export const CheckoutNavigator = () => (
    <Routes>
      <Route path="/" element={<CheckoutScreen />} />
      <Route path="/checkout-success" element={<CheckoutSuccessScreen />} />
      <Route path="/checkout-error" element={<CheckoutErrorScreen />} />
    </Routes>
);
