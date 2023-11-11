import { CalendarIcon, ClockIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { addLoads } from "../../../../../redux/actions/loads/loads";
import Loader from "../../../../LOADER/loader";

export default function AddLoad() {
  const blank_data = {
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
    totalMiles: "",
    price: "",
    weight: "",
    eqLength: "",
    equipment: "",
    loadType: "",
    equipmentRequirement: "",
    mapLink: "",
  };

  const [formData, setFormData] = useState(blank_data);
  const dispatch = useDispatch();
  const success = useSelector((state) => state.loads.success);
  const error = useSelector((state) => state.loads.error);
  const isLoading = useSelector((state) => state.loads.isLoading);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.pickUpLocation.trim()) {
      toast.error("Pickup location field can't be empty");
      return;
    }
    if (!formData.dropOffLocation.trim()) {
      toast.error("Dropoff location field can't be empty");
      return;
    }
    if (!formData.pickUpDate) {
      toast.error("Pickup Date can't de empty");
      return;
    }
    if (!formData.dropOffDate) {
      toast.error("Pickup Date can't de empty");
      return;
    }
    if (!formData.totalMiles || isNaN(formData.totalMiles)) {
      toast.error("Total miles must be a number");
      return;
    }
    if (!formData.price) {
      toast.error("Price Field can't be empty");
      return;
    }
    if (!formData.weight) {
      toast.error("Weight field can't Be Empty");
      return;
    }
    if (!formData.eqLength) {
      toast.error("Equipment Length can't Be Empty");
      return;
    }
    if (!formData.equipment) {
      toast.error("Equipment Field Can't Be Empty");
      return;
    }
    if (!formData.equipmentRequirement) {
      toast.error("Equipment Requirement Field Can't Be Empty");
      return;
    }
    if (!formData.loadType) {
      toast.error("Load Type Field Cannot Be Empty");
      return;
    }
    if (!formData.mapLink) {
      toast.error("Please add map link");
      return;
    }
    if (!formData.pickUpTime) {
      toast.error("Please add pickup time");
      return;
    }
    if (!formData.dropOffTime) {
      toast.error("Please add dropoff time");
      return;
    }
    const loadData = {
      pickUpLocation: formData.pickUpLocation,
      dropOffLocation: formData.dropOffLocation,
      pickUpDate: formData.pickUpDate,
      pickUpTime: formData.pickUpTime,
      dropOffTime: formData.dropOffTime,
      totalMiles: parseInt(formData.totalMiles.replace(/,/g, "")),
      price: parseFloat(formData.price.replace(/,/g, "").trim()),
      weight: parseFloat(formData.weight.replace(/,/g, "").trim()),
      equipment: formData.equipment,
      eqLength: parseFloat(formData.eqLength.replace(/,/g, "").trim()),
      equipmentRequirement: formData.equipmentRequirement,
      loadType: formData.loadType,
      mapLink: formData.mapLink,
      dropOffDate: formData.dropOffDate,
    };

    dispatch(addLoads(loadData));
  };

  return (
    <>
      <Toaster position="bottom-center" />

      {isLoading ? (
        <div className="flex justify-center mt-56">
          <Loader />
        </div>
      ) : (
        <div className="isolate g-white px-6 -mt-12 max-sm:mt-0 sm:-py-0 lg:px-8 mb-12">
          <form className="mx-auto max-w-xl sm:mt-20" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Pickup
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={formData.pickUpLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickUpLocation: e.target.value,
                      })
                    }
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Dropoff
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.dropOffLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dropOffLocation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Pickup Time
                </label>
                <div className="mt-2.5 relative">
                  <ClockIcon className="w-5 h-5 absolute inset-y-0 right-2 flex items-center pointer-events-none  text-gray-500 top-2.5" />
                  <input
                    type="time"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.pickUpTime}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        pickUpTime: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Dropoff Time
                </label>
                <div className="mt-2.5 relative">
                  <ClockIcon className="w-5 h-5 absolute inset-y-0 right-2 flex items-center pointer-events-none  text-gray-500 top-2.5" />
                  <input
                    type="time"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.dropOffTime}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        dropOffTime: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Pickup Date
                </label>
                <div className="mt-2.5 relative">
                  <CalendarIcon className="w-5 h-5 absolute inset-y-0 right-2 flex items-center pointer-events-none  text-gray-500 top-2.5" />

                  <input
                    type="date"
                    className="block w-full bg-white rounded-md border-0 outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.pickUpDate}
                    onChange={(e) =>
                      setFormData({ ...formData, pickUpDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Dropoff Date
                </label>
                <div className="mt-2.5 relative">
                  <CalendarIcon className="w-5 h-5 absolute inset-y-0 right-2 flex items-center pointer-events-none  text-gray-500 top-2.5" />

                  <input
                    type="date"
                    className="block w-full bg-white rounded-md border-0 outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.dropOffDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dropOffDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Miles
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.totalMiles}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalMiles: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Price
                </label>
                <div className="relative mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Weight
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Equipment Length
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.eqLength}
                    onChange={(e) =>
                      setFormData({ ...formData, eqLength: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Commodity
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.equipmentRequirement}
                    onChange={(e) =>
                      setFormData({ ...formData, equipment: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Load Type
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.loadType}
                    onChange={(e) =>
                      setFormData({ ...formData, loadType: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Equipment
                </label>
                <div className="mt-2.5">
                  <select
                    value={formData.equipment}
                    className="w-full text-black py-2.5 px-2 bg-white ring-1 ring-gray-300 rounded ring-inset"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        equipmentRequirement: e.target.value,
                      });
                    }}
                  >
                    <option className="text-black" value="">
                      Select Equipment Requirement
                    </option>
                    <option className="text-black" value="Dry Van">
                      Dry Van
                    </option>
                    <option className="text-black" value="Reefer">
                      Reefer
                    </option>
                    <option className="text-black" value="Flatbed">
                      Flatbed
                    </option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-800">
                  Map Link
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white outline-none px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.mapLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mapLink: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-center text-sm  text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Add Load
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
