import AllUser from "./allUsers/allUsers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../../../redux/actions/users/userActions";
import Loader from "../../../LOADER/loader";
import { Link } from "react-router-dom";

export default function Users() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    { name: "ID", uid: "_id", sortable: true },
    { name: "MC#", uid: "mcHash" },
    { name: "Name", uid: "name", sortable: true },
    { name: "Email", uid: "email", sortable: true },
    { name: "Phone", uid: "contactNumber", sortable: true },
    { name: "Verified", uid: "isVerified", sortable: true },
    { name: "Account Request", uid: "request", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];
  if (isLoading) {
    return (
      <div className="flex justify-center mt-24">
        <Loader />
      </div>
    );
  }

  if (!users || !users.length > 0) {
    return (
      <>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              {/* <h1 className="mb-4 text-4xl tracking-tight font-extrabold lg:text-6xl text-primary-600 dark:text-primary-500">
                500
              </h1> */}
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Something&#39;s missing.
              </p>
              <p className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                Looks Like Currently No User is available
              </p>
              <Link
                to="/admin"
                className="inline-flex text-white bg-[#09090b] focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
  return (
    <div className="lg:mx-12 sm:mx-4 max-sm:mx-2 mt-6">
      <AllUser users={users} columns={columns} statusOptions={statusOptions} />
    </div>
  );
}
