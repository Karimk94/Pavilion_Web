import { Route, Routes } from "react-router-dom";
import { AccountScreen } from "../../features/account/screens/account.screen";
import LoginScreen from "../../features/account/screens/login.screen";
import RegisterScreen from "../../features/account/screens/register.screen";

export const AccountNavigator = () => (
    <Routes>
      <Route path="/" element={<AccountScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
);
