import { Outlet, useLocation } from "react-router";
import "./App.css";
import Nav from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, clearUserMessage } from "./redux/actions/users/userActions";
import { toast } from "sonner";
axios.defaults.baseURL = "https://api.centralbrokerage.net";
// axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogin =
    location.pathname.includes("/login") || location.pathname.includes("/sign");
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.hero.isLoading);

  useEffect(() => {
    dispatch(checkAuth());
    if (success) {
      toast.success(success);
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserMessage());
    }
  }, [dispatch, success, error]);
  return (
    <>
      <Nav />
      <Outlet />
      {!isLogin && !isLoading && <Footer />}
    </>
  );
}

export default App;
