import { Tabs, Tab } from "@nextui-org/react";
import AllLoad from "./allLoads/allLoads";
import AddLoad from "./addLoads/addLoad";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoads } from "../../../../redux/actions/loads/loads";
import Loader from "../../../LOADER/loader";
import AllBids from "./bids/bids";
import { fetchBids } from "../../../../redux/actions/bids/bidsActions";

export default function ManageLoads() {
  const isLoading = useSelector((state) => state.loads.isLoading);
  const loads = useSelector((state) => state.loads.loads);
  const bids = useSelector((state) => state.bids.bids);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoads());
    dispatch(fetchBids());
  }, [dispatch]);
  const columns = [
    { name: "ID", uid: "_id", sortable: true },
    { name: "Pickup Location", uid: "pickUpLocation", sortable: true },
    { name: "Drop Location", uid: "dropOffLocation", sortable: true },
    { name: "Price", uid: "price", sortable: true },
    { name: "Miles", uid: "totalMiles", sortable: true },
    { name: "Weight", uid: "weight", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];

  return (
    <>
      <Tabs
        aria-label="Options"
        className="flex justify-center flex-wrap"
        color="primary"
        variant="bordered"
      >
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

              <span>All Loads</span>
            </div>
          }
        >
          <div className="lg:mx-12 sm:mx-4 max-sm:mx-2 mt-6">
            {" "}
            {isLoading ? (
              <div className="flex justify-center mt-24">
                <Loader />
              </div>
            ) : !loads ? (
              <section className="bg-white dark:bg-transparent mt-12">
                <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
                  <svg
                    className="mx-auto mb-4 w-10 h-10 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"
                    />
                  </svg>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
                    Server Error
                  </h1>
                  <p className="font-normal text-black/60 md:text-md xl:text-md dark:text-white/70">
                    I&#39;m sorry, but it seems like there is an issue with the
                    server, and we are not receiving the necessary information
                    to display the details for this page. This could be due to
                    various reasons, including a temporary server outage or a
                    misconfiguration.
                  </p>
                </div>
              </section>
            ) : (
              <AllLoad
                loads={loads}
                columns={columns}
                statusOptions={statusOptions}
              />
            )}
          </div>
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Add Load</span>
            </div>
          }
        >
          <AddLoad />
        </Tab>
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>

              <span>Bidings</span>
            </div>
          }
        >
          {isLoading ? (
            <div className="flex justify-center mt-24">
              <Loader />
            </div>
          ) : !loads ? (
            <section className="bg-white dark:bg-transparent mt-12">
              <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
                <svg
                  className="mx-auto mb-4 w-10 h-10 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"
                  />
                </svg>
                <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
                  Server Error
                </h1>
                <p className="font-normal text-black/60 md:text-md xl:text-md dark:text-white/70">
                  I&#39;m sorry, but it seems like there is an issue with the
                  server, and we are not receiving the necessary information to
                  display the details for this page. This could be due to
                  various reasons, including a temporary server outage or a
                  misconfiguration.
                </p>
              </div>
            </section>
          ) : (
            <AllBids bids={bids} />
          )}
        </Tab>
      </Tabs>
    </>
  );
}
