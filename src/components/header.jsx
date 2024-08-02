import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full my-5 flex justify-center items-center">
      <div className=" text-black flex flex-col md:flex-row justify-between items-center w-full ">
        <Link href="/" id="titleOfApp" className="mx-2 text-2xl border-b border-black">
          CUSTOMER MANAGEMENT
        </Link>
        <div id="appPages" className="flex mt-3 md:mt-0">
          <Link
            href="/addCustomer"
            id="addCustomer"
            className="bg-slate-100 hover:bg-slate-200 rounded-sm border border-black p-2 text-center mx-2"
          >
            ADD CUSTOMER
          </Link>
          <Link
            href="/customerList"
            id="customerList"
            className="bg-slate-100 hover:bg-slate-200 rounded-sm border border-black p-2 text-center mx-2"
          >
            CUSTOMER LIST
          </Link>
        </div>
      </div>
    </div>
  );
}
