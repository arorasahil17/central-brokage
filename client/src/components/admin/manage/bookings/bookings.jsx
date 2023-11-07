import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import Loader from "../../../LOADER/loader";
import { Link } from "react-router-dom";
import {
  clearBookingMessage,
  deleteBooking,
  getBookings,
  updateBookingStatus,
} from "../../../../redux/actions/bookings/booking";
import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Bookings() {
  const bookings = useSelector((state) => state.bookings.bookings);
  const isLoading = useSelector((state) => state.bookings.isLoading);
  const success = useSelector((state) => state.bookings.success);
  const error = useSelector((state) => state.bookings.error);
  const [selectedLoad, setSelectedLoad] = useState({});
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookings());
    if (success) {
      toast.success(success);
      dispatch(clearBookingMessage());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(clearBookingMessage());
      onClose();
    }
  }, [success, error, dispatch, onClose]);

  const handleStatus = (status) => {
    dispatch(updateBookingStatus(selectedLoad._id, status));
  };

  const handleDeleteBooking = () => {
    dispatch(deleteBooking(selectedLoad._id));
  };

  if (!bookings) {
    return (
      <>
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
              display the details for this page. This could be due to various
              reasons, including a temporary server outage or a
              misconfiguration.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="lg:px-24 md:px-12 sm:px-4 max-sm:px-4 mt-24 mb-4">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : bookings.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Our products
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of Flowbite products designed to help you work
                  and play, stay organized, get answers, keep in touch, grow
                  your business, and more.
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3">
                    To
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  return (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 ">
                          {booking.loadId.pickUpLocation}
                        </td>
                        <td className="px-6 py-4">
                          {booking.loadId.dropOffLocation}
                        </td>
                        <td className="px-6 py-4">
                          {booking.loadId.dropOffDate}
                        </td>
                        <td className="px-6 py-4">${booking.loadId.price}</td>
                        <td className="px-6 py-4">{booking.userId.name}</td>
                        <td className="px-6 py-4">{booking.userId.email}</td>
                        <td className="px-6 py-4">
                          {booking.status.toLowerCase() === "pending" ? (
                            <Chip
                              endContent={<ClockIcon />}
                              variant="flat"
                              size="sm"
                            >
                              {booking.status}
                            </Chip>
                          ) : booking.status.toLowerCase() === "accepted" ? (
                            <Chip
                              endContent={<CheckBadgeIcon />}
                              color="secondary"
                              variant="flat"
                              size="sm"
                            >
                              {booking.status}
                            </Chip>
                          ) : booking.status.toLowerCase() === "completed" ? (
                            <Chip color="success" variant="flat" size="sm">
                              {booking.status}
                            </Chip>
                          ) : booking.status.toLowerCase() === "denied" ? (
                            <Chip color="danger" variant="flat" size="sm">
                              {booking.status}
                            </Chip>
                          ) : booking.status.toLowerCase() === "processing" ? (
                            <Chip color="warning" variant="flat" size="sm">
                              {booking.status}
                            </Chip>
                          ) : (
                            <Chip color="danger" variant="flat" size="sm">
                              {booking.status}
                            </Chip>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedLoad(booking);
                              onOpen();
                            }}
                            className="mx-4"
                          >
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
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <h1 className="text-center text-2xl mt-48 text-neutral-700 font-extrabold">
              Currently, there are no bookings
            </h1>
            <div className="text-center mt-2  text-blue-600 underline">
              <Link to="/admin">Go to Dashboard</Link>
            </div>
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="py-6">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-lg font-bold text-neutral-800 uppercase">
                Update Status
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center gap-2">
                  <button>
                    <Chip
                      color="secondary"
                      variant="flat"
                      onClick={() => handleStatus("Accepted")}
                    >
                      Accept
                    </Chip>
                  </button>
                  <button onClick={() => handleStatus("Processing")}>
                    <Chip color="warning" variant="flat">
                      Processed
                    </Chip>
                  </button>
                  <button onClick={() => handleStatus("Completed")}>
                    <Chip color="success" variant="flat">
                      Completed
                    </Chip>
                  </button>
                  <button onClick={() => handleStatus("Denied")}>
                    <Chip color="danger" variant="flat">
                      Reject
                    </Chip>
                  </button>
                  <button onClick={handleDeleteBooking}>
                    <Chip color="danger" variant="flat">
                      Delete
                    </Chip>
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
