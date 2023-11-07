import PropTypes from "prop-types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  useDisclosure,
  CardFooter,
  CardBody,
  Avatar,
  CardHeader,
  Card,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_BIDS_MESSAGE,
  updateBids,
} from "../../../../../redux/actions/bids/bidsActions";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

export default function AllBids({ bids }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLoad, setSelectedLoad] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const success = useSelector((state) => state.bids.success);
  const error = useSelector((state) => state.bids.error);
  const isLoading = useSelector((state) => state.bids.isLoading);
  const dispatch = useDispatch();
  const handleOpen = (load) => {
    setSelectedLoad(load);
    onOpen();
  };
  const handleModalClose = () => {
    onClose();
    setSelectedLoad({});
    setSelectedUser({});
  };

  const hanldeBidUpdate = (bidId, status) => {
    dispatch(updateBids(bidId, status));
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating Bid Status");
      dispatch({ type: CLEAR_BIDS_MESSAGE });
    }
    if (success) {
      toast.success(success);
      dispatch({ type: CLEAR_BIDS_MESSAGE });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_BIDS_MESSAGE });
    }
  }, [error, success, dispatch, isLoading]);

  return (
    <>
      <Toaster position="bottom-center" expand={false} />
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="opaque"
        scrollBehavior="inside"
        aria-label="Lable"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Load Details
              </ModalHeader>
              <ModalBody>
                {selectedUser.pickUpLocation ? (
                  <>
                    <iframe
                      src={selectedLoad.mapLink}
                      className="rounded-md w-full h-96"
                      style={{ border: 0 }}
                      width="600"
                      height="450"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                      <li className="mb-8 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Date: {selectedLoad.pickUpDate}
                        </time>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Pick Up
                        </h3>
                        <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.pickUpLocation}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Date: {selectedLoad.dropOffDate}
                        </time>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Drop Off
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.dropOffLocation}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Price
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.price}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Weight
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.weight}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Miles
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.totalMiles}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Rate Per Mile
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.ratePerMile}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Equipment
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.equipment}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Equipment Length
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.eqLength}
                        </p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Load Type
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.loadType}
                        </p>
                      </li>
                      <li className="ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Equipment Requirement
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {selectedLoad.equipmentRequirement}
                        </p>
                      </li>
                    </ol>
                  </>
                ) : (
                  <div className="flex justify-center">
                    <Card className="max-w-[400px]">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <Avatar
                            radius="full"
                            size="lg"
                            src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                          />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600 capitalize">
                              {selectedUser.name}
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                              {selectedUser.email}
                            </h5>
                          </div>
                        </div>
                        <Button
                          className={
                            isFollowed
                              ? "bg-transparent text-foreground border-default-200"
                              : ""
                          }
                          color="primary"
                          radius="full"
                          size="sm"
                          variant={isFollowed ? "bordered" : "solid"}
                          onPress={() => setIsFollowed(!isFollowed)}
                        >
                          {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                      </CardHeader>
                      <CardBody className="px-3 py-0 text-small text-default-400">
                        <p>
                          Frontend developer and UI/UX enthusiast. Join me on
                          this coding adventure!
                        </p>
                        <span className="pt-2">
                          #FrontendWithZoey
                          <span
                            className="py-2"
                            aria-label="computer"
                            role="img"
                          >
                            💻
                          </span>
                        </span>
                      </CardBody>
                      <CardFooter className="gap-3">
                        <div className="flex gap-1">
                          <p className="font-semibold text-default-400 text-small">
                            4
                          </p>
                          <p className=" text-default-400 text-small">
                            Following
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <p className="font-semibold text-default-400 text-small">
                            97.1K
                          </p>
                          <p className="text-default-400 text-small">
                            Followers
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => handleModalClose()}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {bids.length > 0 ? (
        <div className="flex justify-center my-6 w-screen">
          <div className="relative overflow-x-auto w-full lg:mx-32 md:mx-24 sm:mx-10 max-sm:mx-4 shadow-sm sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Pickup Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pickup
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dropoff
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bid Amount
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
                {bids.map((bid) => {
                  return (
                    <>
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={bid._id}
                      >
                        <td className="px-6 py-4 ">{bid.loadId.pickUpDate}</td>
                        <td className="px-6 py-4">
                          {bid.loadId.pickUpLocation}
                        </td>
                        <td className="px-6 py-4">
                          {bid.loadId.dropOffLocation}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          {bid.userId.name}
                        </td>
                        <td className="px-6 py-4">{bid.userId.email}</td>
                        <td className="px-6 py-4">{bid.bidAmount}</td>
                        <td className="px-6 py-4">
                          <Chip
                            color={
                              bid.bidStatus.toLowerCase() === "accepted"
                                ? "success"
                                : bid.bidStatus.toLowerCase() === "pending"
                                ? "warning"
                                : bid.bidStatus.toLowerCase() === "rejected"
                                ? "danger"
                                : "default"
                            }
                            variant="flat"
                            className=" capitalize"
                          >
                            {bid.bidStatus}
                          </Chip>
                        </td>
                        <td className="px-10 py-4">
                          <Dropdown>
                            <DropdownTrigger>
                              <button className="outline-none">
                                <EllipsisVerticalIcon className="w-4 h-4" />
                              </button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                              <DropdownItem
                                key="new"
                                onPress={() => handleOpen(bid.loadId)}
                                variant="light"
                              >
                                Load Details
                              </DropdownItem>
                              <DropdownItem
                                key="copy"
                                variant="light"
                                onPress={() => handleOpen(bid.userId)}
                              >
                                User Details
                              </DropdownItem>
                              <DropdownItem
                                key="edit"
                                variant="light"
                                onClick={() =>
                                  hanldeBidUpdate(bid._id, "accepted")
                                }
                              >
                                Accept offer request
                              </DropdownItem>
                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                variant="light"
                              >
                                Reject
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
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
    </>
  );
}
AllBids.propTypes = {
  bids: PropTypes.arrayOf(PropTypes.object).isRequired,
};
