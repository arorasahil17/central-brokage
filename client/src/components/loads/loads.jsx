import React, { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  // DropdownTrigger,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Chip,
  Pagination,
  Tooltip,
} from "@nextui-org/react";

import { SearchIcon } from "./SearchIcon";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { makeLoadBooking } from "../../redux/actions/bookings/booking";
import { clearUserMessage } from "../../redux/actions/users/userActions";
import {
  CLEAR_BIDS_MESSAGE,
  makeBid,
} from "../../redux/actions/bids/bidsActions";
import { CalendarIcon } from "@heroicons/react/24/solid";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "pickUpLocation",
  "dropOffLocation",
  "price",
  "weight",
  "actions",
  "pickUpTime",
  "dropOffTime",
  "totalMiles",
  "ratePerMile",
  "loadType",
  "isBooked",
];

export default function App({ loads, columns }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [pickUpDate, setpickUpDate] = React.useState("");
  const [dropLocation, setDropLocation] = React.useState("");
  const [dropOffDate, setDropOffDate] = React.useState("");
  const [searchedButtonClick, setSearchButtonClick] = useState(false);
  const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [hiddenPrice, setHiddenPrice] = useState(true);
  // const [statusFilter, setStatusFilter] = React.useState("all");
  const [selectedLoad, setSelectedLoad] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bidAmount, setBidAmount] = React.useState("");
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const bidLoading = useSelector((state) => state.bids.isLoading);
  const bidSuccess = useSelector((state) => state.bids.success);
  const bidError = useSelector((state) => state.bids.error);
  const handleLoad = (load) => {
    setSelectedLoad(load);
    localStorage.setItem("loadId", load._id);
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Please Wait...");
      dispatch(clearUserMessage());
    }
    if (success) {
      toast.success(success);
      dispatch(clearUserMessage());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserMessage());
    }
    if (bidLoading) {
      toast.loading("Please Wait...");
      dispatch({ type: CLEAR_BIDS_MESSAGE });
    }
    if (bidSuccess) {
      toast.success(bidSuccess);
      dispatch({ type: CLEAR_BIDS_MESSAGE });
      onClose();
    }
    if (bidError) {
      toast.error(bidError);
      dispatch({ type: CLEAR_BIDS_MESSAGE });
      onClose();
    }
  }, [
    success,
    error,
    loading,
    user,
    dispatch,
    onClose,
    bidError,
    bidSuccess,
    bidLoading,
  ]);

  // const handleOpen = (load) => {
  //   onOpen();
  //   handleLoad(load);
  // };

  const handleOpen = useCallback(
    (load) => {
      onOpen();
      handleLoad(load);
    },
    [onOpen]
  );

  const hasPickup = Boolean(filterValue);
  const hasDate = Boolean(pickUpDate);
  const hasDrop = Boolean(dropLocation);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredloads = [...loads];

    if (hasPickup && hasDate && hasDrop && searchedButtonClick) {
      filteredloads = filteredloads.filter(
        (user) =>
          user.pickUpLocation
            .toLowerCase()
            .includes(filterValue.toLowerCase()) &&
          user.pickUpDate.includes(pickUpDate) &&
          user.dropOffLocation
            .toLowerCase()
            .includes(dropLocation.toLowerCase())
      );
    }
    // if (
    //   statusFilter !== "all" &&
    //   Array.from(statusFilter).length !== statusOptions.length
    // ) {
    //   filteredloads = filteredloads.filter((user) =>
    //     Array.from(statusFilter).includes(user.status)
    //   );
    // }

    return filteredloads;
  }, [
    loads,
    filterValue,
    pickUpDate,
    dropLocation,
    hasDate,
    hasPickup,
    // statusOptions.length,
    hasDrop,
    // statusFilter,
    searchedButtonClick,
  ]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "pickUpLocation":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.pickUpDate}
              </p>
            </div>
          );
        case "dropOffLocation":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.dropOffDate}
              </p>
            </div>
          );
        case "weight":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "price":
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              ${cellValue}
            </Chip>
          );
        case "pickUpTime":
          return <p>{cellValue}</p>;
        case "dropOffTime":
          return (
            <Chip color={statusColorMap[user.status]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "loadType":
          return (
            <>
              {cellValue.toLowerCase() === "full" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </>
          );
        case "ratePerMile":
          return <div className="mx-4">{cellValue}</div>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <button
                  onClick={() => handleOpen(user)}
                  className="bg-transparent mx-4"
                >
                  {" "}
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      focusable="false"
                      height="1em"
                      role="presentation"
                      viewBox="0 0 20 20"
                      width="1em"
                    >
                      <path
                        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      />
                      <path
                        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      />
                    </svg>
                  </span>
                </button>
              </Tooltip>
            </div>
          );
        case "isBooked":
          return cellValue ? (
            <Chip color="success" size="sm" variant="flat">
              Booked
            </Chip>
          ) : (
            <Chip color="success" size="sm" variant="flat">
              Available
            </Chip>
          );
        default:
          return cellValue;
      }
    },
    [handleOpen]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
      setSearchButtonClick(false);
    } else {
      setFilterValue("");
    }
  }, []);

  // const handleDateChange = (value) => {
  //   setpickUpDate(value);
  //   setPage(1);
  // };
  const handleDateChange = React.useCallback((value) => {
    if (value) {
      setpickUpDate(value);
      setPage(1);
      setSearchButtonClick(false);
    } else {
      setpickUpDate("");
    }
  }, []);

  const handleDropChange = React.useCallback((value) => {
    if (value) {
      setDropLocation(value);
      setPage(1);
      setSearchButtonClick(false);
    } else {
      setDropLocation("");
    }
  }, []);

  const handleDropDateChange = React.useCallback((value) => {
    if (value) {
      setDropOffDate(value);
      setPage(1);
      setSearchButtonClick(false);
    } else {
      setDropOffDate("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 -mx-4">
        <div className="">
          <div className="flex gap-4 flex-wrap justify-center">
            <div className="lg:w-[20%] gap-2 max-sm:w-[100%] sm:w-full">
              <span className="text-sm">Pickup Location</span>
              <Input
                isClearable
                className="w-full text-xs"
                startContent={<SearchIcon className="text-gray-400" />}
                value={filterValue}
                size="sm"
                variant="bordered"
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
            <div className="lg:w-[20%] gap-1 max-sm:w-[100%] sm:w-full relative">
              <span className="text-sm">Pickup Date</span>
              <CalendarIcon className="w-5 h-5 absolute dark:hidden z-10 right-8 flex items-center pointer-events-none  text-gray-700 top-7" />
              <Input
                isClearable
                className="w-full text-xs"
                type="date"
                value={pickUpDate}
                variant="bordered"
                size="sm"
                onValueChange={handleDateChange}
              />
            </div>
            <div className="lg:w-[20%] gap-1 max-sm:w-[100%] sm:w-full">
              <span className="text-sm">Dropoff Location</span>
              <Input
                isClearable
                className="w-full text-xs"
                type="text"
                startContent={<SearchIcon className="text-gray-400" />}
                size="sm"
                variant="bordered"
                value={dropLocation}
                onValueChange={handleDropChange}
              />
            </div>
            <div className="lg:w-[20%] gap-1 max-sm:w-[100%] sm:w-full relative">
              <span className="text-sm">Dropoff Date</span>
              <CalendarIcon className="w-5 h-5 absolute dark:hidden z-10 right-8 flex items-center pointer-events-none  text-gray-700 top-7" />
              <Input
                isClearable
                className="w-full text-xs"
                type="date"
                size="sm"
                variant="bordered"
                value={dropOffDate}
                onValueChange={handleDropDateChange}
              />
            </div>
            <Button
              color="primary"
              size="sm"
              className="lg:w-20 max-sm:w-full sm:w-full mt-6 max-sm:mt-1"
              onClick={() => setSearchButtonClick(true)}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {loads.length} loads
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    pickUpDate,
    onRowsPerPageChange,
    loads.length,
    handleDateChange,
    onSearchChange,
    handleDropChange,
    dropLocation,
    onClear,
    dropOffDate,
    handleDropDateChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onNextPage,
    onPreviousPage,
  ]);

  return (
    <Fragment>
      <Toaster position="bottom-center" expand={false} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
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
                      Rate
                    </h3>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      ${selectedLoad.price}
                    </p>
                  </li>
                  <li className="mb-6 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                    <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                      Weight
                    </h3>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {selectedLoad.weight}lbs
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
                      ${selectedLoad.ratePerMile}/mile
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
                      Commodity
                    </h3>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {selectedLoad.equipmentRequirement}
                    </p>
                  </li>
                </ol>
              </ModalBody>
              <ModalFooter className="justify-center flex-col">
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    size="md"
                    className="w-64"
                    variant="flat"
                    onPress={() => setHiddenPrice(!hiddenPrice)}
                  >
                    Make Offer
                  </Button>
                  <Button
                    isLoading={loading}
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                    size="md"
                    color="primary"
                    variant="flat"
                    className="w-64"
                    onPress={() => {
                      const loadId = localStorage.getItem("loadId");
                      dispatch(makeLoadBooking(loadId));
                    }}
                  >
                    Book Load
                  </Button>
                </div>
                <div className={`mt-4 ${hiddenPrice ? "hidden" : "block"}`}>
                  <label
                    htmlFor=""
                    className="text-sm text-black/70 dark:text-white/70"
                  >
                    Enter Your Price
                  </label>
                  <Input
                    type="text"
                    className={`block w-full outline-none `}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <Button
                    className=" mt-2 w-full"
                    color="primary"
                    variant="solid"
                    onClick={() => {
                      if (isNaN(bidAmount)) {
                        toast.error("Bid amount must be a number");
                      }
                      const loadId = localStorage.getItem("loadId");
                      dispatch(makeBid(loadId, Number(bidAmount)));
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        aria-label="Table Columns"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: " shadow-none dark:bg-background  dark:text-white",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No loads found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Fragment>
  );
}

App.propTypes = {
  loads: PropTypes.arrayOf(PropTypes.object).isRequired,
  statusOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
