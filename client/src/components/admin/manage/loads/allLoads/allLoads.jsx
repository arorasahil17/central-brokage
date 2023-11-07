import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Tooltip,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import {
  CLEAR_LOADS,
  updateLoad,
  deleteLoadAC,
} from "../../../../../redux/actions/loads/loads";
import { Toaster, toast } from "sonner";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

const INITIAL_VISIBLE_COLUMNS = [
  "pickUpLocation",
  "dropOffLocation",
  "price",
  "weight",
  "actions",
  "totalMiles",
];

export default function AllLoad({ loads, statusOptions, columns }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [selectedLoad, setSelectedLoad] = React.useState({});
  // const [loadData, setLoadData] = React.useState(selectedLoad);
  const [statusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const dispatch = useDispatch();
  const success = useSelector((state) => state.loads.success);
  const error = useSelector((state) => state.loads.error);
  const [showStatusElement, setShowStatusElement] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [open, setOpen] = React.useState(false);

  const cancelButtonRef = React.useRef(null);

  const changeSelectedLoad = (load) => {
    localStorage.setItem("selectedLoad", JSON.stringify(load));
    const existedLoad = JSON.parse(localStorage.getItem("selectedLoad"));
    setSelectedLoad(existedLoad);
    onOpen();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: CLEAR_LOADS });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_LOADS });
    }
  }, [success, error, dispatch]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredloads = [...loads];

    if (hasSearchFilter) {
      filteredloads = filteredloads.filter((user) =>
        user.pickUpLocation.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredloads = filteredloads.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredloads;
  }, [loads, filterValue, statusFilter, hasSearchFilter, statusOptions.length]);

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
        case "price":
          return <p className="text-black">${cellValue}</p>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {/* <Tooltip content="Details">
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
              </Tooltip> */}
              <Tooltip content="Edit Load">
                <span
                  className="text-lg  text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    changeSelectedLoad(user);
                  }}
                >
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
                      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth={1.5}
                    />
                    <path
                      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth={1.5}
                    />
                    <path
                      d="M2.5 18.3333H17.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth={1.5}
                    />
                  </svg>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    localStorage.setItem("deleteLoad", JSON.stringify(user));
                    setOpen(true);
                  }}
                >
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
                      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                    <path
                      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                    <path
                      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                    <path
                      d="M8.60834 13.75H11.3833"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                    <path
                      d="M7.91669 10.4167H12.0834"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                  </svg>
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [changeSelectedLoad]
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
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by Pickup Location..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
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
  }, [filterValue, onRowsPerPageChange, loads.length, onSearchChange, onClear]);

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
  }, [page, pages, onNextPage, onPreviousPage]);

  return (
    <>
      <Toaster position="bottom-center" />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Load
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this load
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        const load = JSON.parse(
                          localStorage.getItem("deleteLoad")
                        );
                        dispatch(deleteLoadAC(load._id));
                        setOpen(false);
                      }}
                    >
                      Yes,Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full outline-none justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        scrollBehavior="inside"
        size="xl"
        className="h-[500px]"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold">
                Edit Details
              </ModalHeader>
              <ModalBody>
                <div>
                  <label className="text-sm text-black">Pickup Location</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="text"
                    value={selectedLoad.pickUpLocation}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        pickUpLocation: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Dropoff Location</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="text"
                    value={selectedLoad.dropOffLocation}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        dropOffLocation: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Pickup Date</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="date"
                    value={selectedLoad.pickUpDate}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        pickUpDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Dropoff Date</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="date"
                    value={selectedLoad.dropOffDate}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        dropOffDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Price</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="number"
                    value={selectedLoad.price}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Weight</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="number"
                    value={selectedLoad.weight}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        weight: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Equipment</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="text"
                    value={selectedLoad.equipment}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        equipment: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Miles</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    value={selectedLoad.totalMiles}
                    type="number"
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        totalMiles: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Equipment Length</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    value={selectedLoad.eqLength}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        eqLength: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">Load Type</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    type="text"
                    value={selectedLoad.loadType}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        loadType: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-black">
                    Equipment Commodity
                  </label>
                  <select
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    value={selectedLoad.equipmentRequirement}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        equipmentRequirement: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Equipment Requirement</option>
                    <option value="Dry Van">Dry van</option>
                    <option value="Reefer">Reefer</option>
                    <option value="Flatbed">Flatbed</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-black">Map Link</label>
                  <input
                    className="py-1.5 border-1 border-zinc-300 mt-2 bg-transparent outline-none px-3 text-black/70 text-sm w-full rounded"
                    value={selectedLoad.mapLink}
                    onChange={(e) =>
                      setSelectedLoad({
                        ...selectedLoad,
                        mapLink: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="text-sm">Booked</label>
                  <span
                    className={
                      selectedLoad.isBooked
                        ? "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mx-2"
                        : "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 mx-2"
                    }
                  >
                    {selectedLoad.isBooked ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <button
                    className="px-4 py-1.5  border-1 rounded text-black text-sm"
                    onClick={() => setShowStatusElement(!showStatusElement)}
                  >
                    Change Booking Status
                  </button>
                  <div
                    className={`flex gap-2 mt-2 ${
                      showStatusElement ? "block" : "hidden"
                    }`}
                  >
                    <button
                      className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      onClick={() =>
                        setSelectedLoad({ ...selectedLoad, isBooked: true })
                      }
                    >
                      Booked
                    </button>
                    <button
                      className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      onClick={() =>
                        setSelectedLoad({ ...selectedLoad, isBooked: false })
                      }
                    >
                      Available
                    </button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className="bg-primary text-white px-3 py-2 rounded text-sm w-full"
                  onClick={() => {
                    dispatch(updateLoad(selectedLoad));
                  }}
                >
                  Update Changes
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
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
                <TableCell className="text-black">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

AllLoad.propTypes = {
  loads: PropTypes.arrayOf(PropTypes.object).isRequired,
  statusOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
