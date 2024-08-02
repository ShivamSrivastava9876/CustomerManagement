import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 w-full border flex flex-col items-center justify-center fixed top-0 left-0 right-0">
      <div id="title" className="flex justify-center text-center text-2xl sm:text-3xl md:text-5xl m-10 fixed top-0">
        CUSTOMER MANAGEMENT
      </div>
      <div id="components" className="flex flex-wrap justify-center items-center">
        <Link
          href="/customerList"
          id="customerList"
          className="border rounded-full bg-slate-300 hover:bg-slate-200 flex items-center justify-center w-52 h-52 mx-4 mt-4"
        >
          LIST OF CUSTOMERS
        </Link>
        <Link
          href="/addCustomer"
          id="addCustomer"
          className="border rounded-full bg-slate-300 hover:bg-slate-200 flex items-center justify-center w-52 h-52 mx-4 mt-4"
        >
          ADD A NEW CUSTOMER
        </Link>
      </div>
    </main>
  );
}
