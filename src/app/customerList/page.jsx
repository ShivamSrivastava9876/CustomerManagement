"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import AddNewAddressForm from "@/components/addNewAddressForm";
import EditAddressForm from "@/components/editAddress";
import NoDataComponent from "@/components/noDataComponent";

const CustomerList = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [addAddressForCustomerId, setAddAddressForCustomerId] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);
  // const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    const storedCustomerData =
      JSON.parse(localStorage.getItem("customerData")) || [];
    setCustomerDetails(storedCustomerData);
  }, []);

  const handleNewAddressForm = (customerId) => {
    setAddAddressForCustomerId(customerId);
  };

  const handleCloseAddForm = () => {
    setAddAddressForCustomerId(null);
  };

  const handleEditAddressForm = (addressId) => {
    setEditAddressId(addressId);
  };

  const handleCloseEditForm = () => {
    setEditAddressId(null);
  };

  //Defined a function to delete customer
  const handleDeleteCustomer = (emailId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const updatedCustomers = customerDetails.filter(
        (customer) => customer.emailId !== emailId
      );
      setCustomerDetails(updatedCustomers);
      localStorage.setItem("customerData", JSON.stringify(updatedCustomers));
      alert("Customer deleted successfully");
    }
  };

  //Defined a function to delete address
  const handleDeleteAddress = (customerEmailId, addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedCustomers = customerDetails.map((customer) => {
        if (customer.emailId === customerEmailId) {
          const updatedAddresses = customer.addresses.filter(
            (address) => address.id !== addressId
          );
          return { ...customer, addresses: updatedAddresses };
        }
        return customer;
      });
      setCustomerDetails(updatedCustomers);
      localStorage.setItem("customerData", JSON.stringify(updatedCustomers));
      alert("Address deleted successfully");
    }
  };

  return (
    <Layout>
      <h1 className="mb-10 border-b border-black">CUSTOMER LIST</h1>
      <div id="customerList" className="grid gap-10">
        {customerDetails.length === 0 ? (
          <NoDataComponent /> // Render NoDataComponent when no customers are available
        ) : (
          customerDetails.map((customerDetail) => (
            <div
              key={customerDetail.emailId}
              className="border border-black p-2"
            >
              <div id="panCardNo">PAN card no: {customerDetail.panCardNo}</div>
              <div id="fullName">Full name: {customerDetail.fullName}</div>
              <div id="emailId" className="break-words">
                Email ID: {customerDetail.emailId}
              </div>
              <div id="mobileNumber" className="break-words">
                Contact number: {customerDetail.mobileNo}
              </div>
              <div id="editAndDeleteOption" className="flex mt-3">
                <div className="flex bg-slate-100 hover:bg-slate-200 border cursor-pointer border-gray-600 p-1 mr-1">
                  <MdAdd
                    size={24}
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => handleNewAddressForm(customerDetail.emailId)} // Used customer emailId as the unique identifier
                    className=""
                  />
                  <p
                    onClick={() => handleNewAddressForm(customerDetail.emailId)} // Used customer emailId as the unique identifier
                  >
                    Add new address
                  </p>
                  {addAddressForCustomerId === customerDetail.emailId && (
                    <AddNewAddressForm
                      customerDetail={customerDetail}
                      handleCloseAddForm={handleCloseAddForm}
                      customerDetails={customerDetails}
                      setCustomerDetails={setCustomerDetails}
                    />
                  )}
                </div>

                <div
                  onClick={() => handleDeleteCustomer(customerDetail.emailId)}
                  className="flex bg-slate-100 hover:bg-slate-200 cursor-pointer border border-gray-600 p-1"
                >
                  <MdDelete
                    size={24}
                    style={{ cursor: "pointer", color: "red" }}
                    className=""
                  />
                  <p>Delete the customer</p>
                </div>
              </div>

              {customerDetail.addresses.map((address) => (
                <div
                  key=""
                  id="addresses"
                  className="border border-black p-2 grid md:grid-cols-2 gap-1 my-2"
                >
                  <div id="addressLineOne" className="break-words">
                    Address line 1: {address.addressLineOne}
                  </div>
                  <div id="addressLineTwo" className="break-words">
                    Address line 2: {address.addressLineTwo}
                  </div>
                  <div id="pinCode" className="break-words">
                    PIN code: {address.postcode}
                  </div>
                  <div id="city" className="break-words">
                    City: {address.city}
                  </div>
                  <div id="state" className="break-words">
                    State: {address.state}
                  </div>
                  <div id="editAndDeleteAddressOption" className="flex">
                    <div className="flex bg-slate-100 hover:bg-slate-200 border cursor-pointer border-gray-600 p-1 mr-1">
                      <MdEdit
                        onClick={() => handleEditAddressForm(address.id)} // Use a unique identifier
                        size={24}
                        style={{ cursor: "pointer", color: "blue" }}
                      />
                      <p
                        onClick={() => handleEditAddressForm(address.id)} // Use a unique identifier
                      >
                        Update address
                      </p>
                      {editAddressId === address.id && (
                        <EditAddressForm
                          customerDetail={customerDetail}
                          setCustomerDetails={setCustomerDetails}
                          address={address}
                          handleCloseEditForm={handleCloseEditForm}
                        />
                      )}
                    </div>

                    <div className="flex bg-slate-100 hover:bg-slate-200 border cursor-pointer border-gray-600 p-1 mr-1">
                      <MdDelete
                        size={24}
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() =>
                          handleDeleteAddress(
                            customerDetail.emailId,
                            address.id
                          )
                        }
                        className=""
                      />
                      <p
                        onClick={() =>
                          handleDeleteAddress(
                            customerDetail.emailId,
                            address.id
                          )
                        }
                      >
                        Delete the address
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default CustomerList;
