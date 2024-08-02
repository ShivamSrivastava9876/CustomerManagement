"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  getPanCardDetails,
  panCardVerificationAsync,
  loadingStatusOfPan,
} from "@/lib/features/panCardVerification/panCardVerificationSlice";
import {
  getCityDetails,
  getDataByPostcodeAsync,
  getStateDetails,
  loadingStatusOfPostcode,
} from "@/lib/features/pincodeData/pincodeDataSlice";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [panCardNo, setPanCardNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [postcode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const name = useSelector(getPanCardDetails);
  const loadingOfPan = useSelector(loadingStatusOfPan);
  const loadingOfPostcode = useSelector(loadingStatusOfPostcode);
  let fetchedCityName = useSelector(getCityDetails);
  let fetchedStateName = useSelector(getStateDetails);

  // Update fullName when name.data changes
  useEffect(() => {
    if (name.data && name.data.fullName) {
      setFullName(name.data.fullName);
    }
  }, [name]);

  // Update city when fetchedCityName changes
  useEffect(() => {
    if (fetchedCityName) {
      setCity(fetchedCityName);
    }
  }, [fetchedCityName]);

  // Update state when fetchedStateName changes
  useEffect(() => {
    if (fetchedStateName) {
      setState(fetchedStateName);
    }
  }, [fetchedStateName]);

  //Used debouncing to avoid multiple API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return function (panCardReceived) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(panCardReceived);
      }, delay);
    };
  };

  //Fetch PAN card details
  const fetchPanCardDetails = (panCardReceived) => {
    dispatch(panCardVerificationAsync({ panNumber: panCardReceived }));
  };

  const debouncedFetchPanDetails = useMemo(
    () => debounce(fetchPanCardDetails, 1000),
    []
  );

  const handlePanCardApi = (e) => {
    setPanCardNo(e.target.value);
    debouncedFetchPanDetails(e.target.value);
  };

  // Fetch Postal Code details
  const fetchPostalCodeDetails = (postalCodeReceived) => {
    dispatch(getDataByPostcodeAsync({ postcode: postalCodeReceived }));
  };

  const debouncedFetchPostalCodeDetails = useMemo(
    () => debounce(fetchPostalCodeDetails, 1000),
    []
  );

  const handlePostalCodeApi = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setPostCode(value);
    }
    debouncedFetchPostalCodeDetails(e.target.value);
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleMobileNumber = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setMobileNo(value);
    }
  };

  //Create new customer
  const handleAddCustomerForm = (e) => {
    e.preventDefault();

    if (
      panCardNo !== "" &&
      fullName !== "" &&
      emailId !== "" &&
      mobileNo !== "" &&
      addressLineOne !== "" &&
      postcode !== "" &&
      (fetchedCityName !== "" || city !== "") &&
      (fetchedStateName !== "" || state !== "")
    ) {
      const customerData = {
        panCardNo,
        fullName: name.data ? name.data.fullName : fullName,
        emailId,
        mobileNo,
        addresses: [
          {
            id: generateUniqueId(),
            addressLineOne,
            addressLineTwo,
            postcode,
            city: fetchedCityName ? fetchedCityName : city,
            state: fetchedStateName ? fetchedStateName : state,
          },
        ],
      };

      // Retrieve the existing customer data from local storage
      const existingData =
        JSON.parse(localStorage.getItem("customerData")) || [];

      // Append the new customer data to the existing data
      existingData.push(customerData);

      // Store the updated data in local storage
      localStorage.setItem("customerData", JSON.stringify(existingData));

      // Reset the form fields
      setPanCardNo("");
      setFullName("");
      setEmailId("");
      setMobileNo("");
      setAddressLineOne("");
      setAddressLineTwo("");
      setPostCode("");
      setCity("");
      setState("");

      alert("Customer data added successfully");
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div>
      <Layout>
        <div id="addCustomerForm">
          <form
            onSubmit={handleAddCustomerForm}
            className="p-8 shadow-md flex flex-col items-center justify-center rounded-2xl md:w-34.125 bg-white relative"
          >
            <div className="mb-4">
              <h2 className=" text-[#0a0a0a] text-center text-2xl text-16px m-3 w-161">
                ADD CUSTOMER
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className={`mb-4 relative md:w-21.375`}>
                <input
                  type="text"
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  value={panCardNo}
                  maxLength={10}
                  onChange={handlePanCardApi}
                  placeholder="PAN (required)"
                />
                {loadingOfPan === "loading" && (
                  <div className="absolute right-2 top-2 w-5 h-5 border-4 border-gray-200 border-t-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>

              <div className={`mb-4 md:w-21.375 `}>
                <input
                  type="text"
                  disabled
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name (required)"
                />
              </div>

              <div className={`mb-4 md:w-21.375 `}>
                <input
                  type="text"
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  maxLength={255}
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="Email Id (required)"
                />
              </div>

              <div className={`relative mb-4 md:w-21.375 `}>
                <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs md:text-sm text-[#111010]">
                  +91
                </span>
                <input
                  type="number"
                  className="w-full pl-12 py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  maxLength={10}
                  value={mobileNo}
                  onChange={handleMobileNumber}
                  placeholder="Mobile number (required)"
                />
              </div>

              <div className={`mb-4 md:w-21.375 `}>
                <input
                  type="text"
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  value={addressLineOne}
                  onChange={(e) => setAddressLineOne(e.target.value)}
                  placeholder="Address Line 1 (required)"
                />
              </div>

              <div className={`mb-4 md:w-21.375 `}>
                <input
                  type="text"
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  value={addressLineTwo}
                  onChange={(e) => setAddressLineTwo(e.target.value)}
                  placeholder="Address Line 2"
                />
              </div>

              <div className={`relative mb-4 md:w-21.375 `}>
                <input
                  type="number"
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  maxLength={6}
                  value={postcode}
                  onChange={handlePostalCodeApi}
                  placeholder="Postal code (required)"
                />
                {loadingOfPostcode === "loading" && (
                  <div className="absolute right-9 top-2 w-5 h-5 border-4 border-gray-200 border-t-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>

              <div className={`mb-4 md:w-21.375 `}>
                <input
                  type="text"
                  disabled
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  value={city}
                  placeholder="City"
                />
              </div>

              <div className={`mb-4 md:w-21.375 `}>
                <input
                  type="text"
                  disabled
                  className="w-full py-2 px-3 text-xs md:text-sm h-3.3125 flex flex-row items-center justify-center border rounded-sm outline-none border-[#9C9C9C] text-[#111010]"
                  value={state}
                  placeholder="State"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="rounded-sm h-3.3125 w-1/4 md:w-21.375 m-4 font-normal text-white py-2 transition duration-300"
            >
              Add
            </Button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default AddCustomer;
