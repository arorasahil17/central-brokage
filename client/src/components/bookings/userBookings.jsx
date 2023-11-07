import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  clearUserMessage,
  getUserBookings,
} from "../../redux/actions/users/userActions";
import Loader from "../LOADER/loader";
import { Chip } from "@nextui-org/react";
import { ClockIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Toaster, toast } from "sonner";

export default function MyBookings() {
  const disptach = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const bookings = useSelector((state) => state.user.bookings);
  const user = useSelector((state) => state.user);
  const success = user.success;
  const error = user.error;
  useEffect(() => {
    if (success) {
      toast.success(success);
      disptach(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      disptach(clearUserMessage());
    }
    disptach(getUserBookings());
  }, [disptach, success, error]);

  if (!bookings.length > 0) {
    return (
      <div className="text-center my-56 text-4xl font-extrabold text-red-600">
        No Bookings Yet
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-center" />
      {isLoading ? (
        <div className="flex justify-center my-64">
          <Loader />
        </div>
      ) : (
        <div className="relative overflow-x-auto rounded-lg border-1 border-zinc-300 dark:border-neutral-800 lg:mx-16 md:mx-8 mt-24 mb-48 max-sm:mx-4 sm:mx-6 ">
          <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400 ">
            <thead className="text-xs text-black/50 uppercase bg-[#f4f4f5] dark:bg-[#141415] border-0 dark:text-white/60">
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
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="dark:text-white/60 text-black/50">
              {" "}
              {bookings.map((booking) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-transparent dark:border-neutral-800">
                      <th className="px-4 py-4 font-medium whitespace-nowrap">
                        {booking.loadId.pickUpLocation}
                      </th>
                      <td className="px-4 py-4">
                        {booking.loadId.dropOffLocation}
                      </td>
                      <td className="px-6 py-4">{booking.loadId.pickUpDate}</td>
                      <td className="px-6 py-4">${booking.loadId.price}</td>
                      <td className="px-6 py-4">
                        {booking.status.toLowerCase() === "pending" ? (
                          <Chip endContent={<ClockIcon />} variant="flat">
                            {booking.status}
                          </Chip>
                        ) : booking.status.toLowerCase() === "accepted" ? (
                          <Chip
                            endContent={<CheckBadgeIcon />}
                            color="secondary"
                            variant="flat"
                          >
                            {booking.status}
                          </Chip>
                        ) : booking.status.toLowerCase() === "completed" ? (
                          <Chip color="success" variant="flat">
                            {booking.status}
                          </Chip>
                        ) : booking.status.toLowerCase() === "denied" ? (
                          <Chip color="danger" variant="flat">
                            {booking.status}
                          </Chip>
                        ) : (
                          <Chip color="danger" variant="flat">
                            {booking.status}
                          </Chip>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-transparent text-danger-500 hover:underline disabled:text-danger-200 shadow-slate-950"
                          onClick={() => disptach(cancelBooking(booking._id))}
                          disabled={
                            booking.status.toLowerCase() === "canceled" ||
                            booking.status.toLowerCase() === "completed"
                          }
                        >
                          Cancel Booking
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
