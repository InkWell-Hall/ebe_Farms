import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  BanknoteArrowUp,
  Bell,
  ChartSpline,
  Search,
  Wallet,
} from "lucide-react";
import Tile from "../components/Tile";
import land from "../assets/landpic1.jpeg";
import ChartBox from "../components/ChartBox";
import Table from "../components/Table";
import { Link } from "react-router";
import Footer from "../components/Footer";
import { EbeContext } from "../context/EbeContext";

const Dashboard = () => {
  const { getAllUserInvestment, allUserInvestment } = useContext(EbeContext);

  const columns = [
    {
      header: "Activity",
      accessorKey: "activity",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Data",
      accessorKey: "date",
    },
  ];

  const data = [
    { activity: "Withdrawal", amount: "$90,000", date: "28-23-2025" },
    { activity: "Deposit", amount: "$40,000", date: "28-23-2025" },
    { activity: "Withdrawal", amount: "$40,000", date: "28-23-2025" },
    { activity: "Withdrawal", amount: "$40,000", date: "28-23-2025" },
    { activity: "Deposit", amount: "$40,000", date: "28-23-2025" },
    { activity: "Deposit", amount: "$40,000", date: "28-23-2025" },
  ];

  useEffect(() => {
    console.log(allUserInvestment);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex overflow-x-hidden">
        {/* ...........the left side of dashboard................. */}
        <div className="bg-white p-8 min-h-auto text-[#1F1E17] md:mt-20 flex-1 mt-40">
          <div className="flex justify-between w-full mb-0">
            <h1 className="font-bold text-white">
              {" "}
              <span className="font-light">
                <Link to={"/"}>Home</Link>
              </span>{" "}
              / Dashboard
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-80 h-10 bg-white rounded-full text-[#1F1E17] px-3 font-bold border border-gray-500 outline-none"
              />
              <Search className="absolute top-1.5 right-5" color="black" />
            </div>
          </div>
          {/* ...........welcoming text......... */}
          <div>
            <h1 className="font-bold text-[30px]">Hello "userName"</h1>
            <p className="font-semibold text-[16px]">
              You are a step closer to your dream
            </p>
          </div>
          {/* .........user Tiles......... */}
          <div className="mt-7">
            <Tile showEye={true} />
            <div className="mt-7 flex justify-between gap-3">
              <Tile
                title={"Total Withdrawals"}
                icon={<Wallet />}
                amount={"$23,000"}
              />
              <Tile
                title={"Total Deposits"}
                icon={<BanknoteArrowUp />}
                amount={"$13,000"}
              />
              <Tile
                title={"Total Investment"}
                icon={<ChartSpline />}
                amount={allUserInvestment}
              />
              <Tile
                title={"Current Investment"}
                icon={<Wallet color="text-green-500" />}
                amount={"$10,000"}
              />
            </div>
          </div>
          {/*  */}
          <div className="h-90 mt-10">
            <ChartBox />
          </div>
          <div className="mt-10">
            <Table data={data} columns={columns} />
          </div>
        </div>
        {/*  */}
        {/* ........the right side of the dashboard.............. */}
        <div className="bg-white w-90 h-auto flex mt-20 flex-col">
          <div className="bg-white w-70 h-20 mt-7 rounded-2xl flex items-center justify-around">
            <img src={land} alt="" className="w-15 rounded-4xl h-15" />
            <div>
              <h1 className="font-bold text-2xl">Swatson_Jnr</h1>
              <p>Nigeria</p>
            </div>
            <Bell className="mb-3" />
          </div>
          {/*  */}
          <div className="bg-white w-70 h-auto mt-10 p-4 flex flex-col gap-4 rounded text-[#1F1E17]">
            <div className="flex gap-3 items-center">
              <h1 className="w-[50%] ">Withdrawals</h1>
              <span className="bg-blue-300 w-30 h-10 rounded-xl"></span>
            </div>
            <div className="flex gap-3 items-center">
              <h1 className="w-[50%]">Deposits</h1>
              <span className="bg-green-500 w-25 h-10 rounded-xl"></span>
            </div>
            <div className="flex gap-3 items-center">
              <h1 className="w-[50%]">Investments</h1>
              <span className="bg-blue-800 w-20 h-10 rounded-xl"></span>
            </div>
          </div>
          {/*  */}
          <div className="bg-white w-70 h-[119vh] mt-10 p-4 flex flex-col gap-4 rounded">
            <h1 className="font-bold">TIPS</h1>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
