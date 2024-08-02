"use client";

import React from "react";

const NoDataComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-sm mb-4">No Customers Available</h2>
      <p className="text-sm text-gray-600">Please add some customers to see the list.</p>
    </div>
  );
};

export default NoDataComponent;