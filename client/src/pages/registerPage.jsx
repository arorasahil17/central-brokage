import { useSelector } from "react-redux";
import Register from "../components/sign/register";
import Loader from "../components/LOADER/loader";

export default function RegisterPage() {
  const isLoading = useSelector((state) => state.user.isLoading);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-64">
          <Loader />
        </div>
      ) : (
        <Register />
      )}
    </>
  );
}
