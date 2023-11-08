import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import LoadsPage from "./pages/loadsPage.jsx";
import Layout from "./components/admin/layout/layout.jsx";
import AdminHome from "./components/admin/home/home.jsx";
import ManageLoads from "./components/admin/manage/loads/loads.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { loadsReducer } from "./redux/reducers/loads/loads.js";
import { Provider } from "react-redux";
import SignInPage from "./pages/signInPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import { userReducer } from "./redux/reducers/users/userReducer.js";
import Otp from "./components/sign/otp.jsx";
import Users from "./components/admin/manage/users/users.jsx";
import { bidsReducer } from "./redux/reducers/bids/bids.js";
import Profile from "./components/profile/profile.jsx";
import ResetPassword from "./components/profile/resetPassword.jsx";
import MyBookings from "./components/bookings/userBookings.jsx";
import Bookings from "./components/admin/manage/bookings/bookings.jsx";
import { bookingReducer } from "./redux/reducers/bookings/bookingReducer.js";
import NewPassword from "./components/profile/newPassword.jsx";
import ChangePassword from "./components/profile/changePassword.jsx";
// import AdminSign from "./components/admin/sign.jsx";
import { adminReducer } from "./redux/reducers/admin/admin.js";
import Customize from "./components/admin/custom/Customize.jsx";
import Hero from "./components/admin/custom/hero/Hero.jsx";
import Service from "./components/admin/custom/services/service.jsx";
import Contact from "./components/admin/custom/contact/contact.jsx";
import {
  contactReducer,
  heroReducer,
  serviceReducer,
} from "./redux/reducers/customize/customizeReducers.js";
import Page404 from "./pages/404Page.jsx";
import ServerError from "./pages/ServerError.jsx";
import ResetPasswordAdmin from "./components/admin/ResetPassword-admin.jsx";
import RegisterAdmin from "./components/admin/RegisterAdmin.jsx";
import ChangePasswordAdmin from "./components/admin/ChangePasswordAdmin.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";

const store = configureStore({
  reducer: {
    loads: loadsReducer,
    user: userReducer,
    bids: bidsReducer,
    bookings: bookingReducer,
    admin: adminReducer,
    hero: heroReducer,
    service: serviceReducer,
    contact: contactReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <BrowserRouter basename="https://centralbrokerage.com">
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="find-loads" element={<LoadsPage />} />
            <Route path="login" element={<SignInPage />} />
            <Route path="sign" element={<RegisterPage />} />
            <Route path="verify-otp" element={<Otp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="new-password" element={<NewPassword />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Route>
          <Route path="admin" element={<Layout />}>
            <Route index element={<AdminHome />} />
            <Route path="manage/loads" element={<ManageLoads />} />
            <Route path="manage/users" element={<Users />} />
            <Route path="manage/bookings" element={<Bookings />} />
            <Route path="sign" element={<AdminLogin />} />
            <Route path="register-admin" element={<RegisterAdmin />} />
            <Route path="customize" element={<Customize />} />
            <Route path="customize/hero" element={<Hero />} />
            <Route path="customize/services" element={<Service />} />
            <Route path="customize/contact" element={<Contact />} />
            <Route path="reset-password" element={<ResetPasswordAdmin />} />
          </Route>
          <Route path="password-change" element={<ChangePasswordAdmin />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </Provider>
);
