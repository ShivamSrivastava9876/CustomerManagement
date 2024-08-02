import React, { ReactNode } from "react";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className=" bg-slate-300">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="content flex flex-col justify-center m-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
