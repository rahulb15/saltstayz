import Link from "next/link";
import React, { useState } from "react";
import Button from "../core/Button";
import {
  HiUser,
  AiOutlineUser,
  RiSuitcaseLine,
  AiOutlineWallet,
  AiOutlineHeart,
  VscSignOut,
  BiBed,
  MdOutlineAirplaneTicket,
  GiEarthAsiaOceania,
  AiOutlineCar,
  MdOutlineAttractions,
  RiTaxiWifiLine,
} from "../../utils/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { setBookings, setHotelWishList } from "../../features/appSlice";
import Image from "next/image";
import { motion } from "framer-motion";
import moment from "moment";
const cityArray = [
  "Gurugram",
  "Noida",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Jaipur",
  "Ahmedabad",
  "Lucknow",
  "Kanpur",
  "Patna",
  "Bhopal",
  "Indore",
  "Agra",
  "Varanasi",
  "Allahabad",
  "Meerut",
  "Jhansi",
  "Gwalior",
  "Mathura",
  "Vrindavan",
  "Ayodhya",
  "Faizabad",
  "Basti",
  "Gorakhpur",
  "Deoria",
  "Kushinagar",
  "Azamgarh",
  "Mau",
  "Ballia",
  "Ghazipur",
  "Varanasi",
  "Jaunpur",
  "Mirzapur",
  "Sonbhadra",
  "Bhadohi",
  "Prayagraj",
  "Fatehpur",
  "Kaushambi",
  "Kanpur",
  "Unnao",
  "Hardoi",
  "Sitapur",
  "Lakhimpur",
  "Shahjahanpur",
  "Pilibhit",
  "Bareilly",
  "Budaun",
  "Shahjahanpur",
  "Rampur",
  "Moradabad",
  "Sambhal",
  "Amroha",
  "Bijnor",
  "Meerut",
  "Baghpat",
  "Ghaziabad",
  "Hapur",
  "Bulandshahr",
  "Aligarh",
  "Kasganj",
  "Etah",
  "Mainpuri",
  "Firozabad",
  "Agra",
  "Mathura",
  "Hathras",
  "Etawah",
  "Auraiya",
  "Kanpur",
  "Jalaun",
  "Jhansi",
  "Lalitpur",
  "Hamirpur",
  "Mahoba",
  "Banda",
  "Chitrakoot",
  "Fatehpur",
  "Pratapgarh",
  "Kaushambi",
  "All",
];

const accountMenu = [
  {
    icon: <AiOutlineUser />,
    name: "Manage account",
    link: "/user",
  },
  {
    icon: <RiSuitcaseLine />,
    name: "Bookings & Trips",
    link: "/user/booking",
  },
  {
    icon: <AiOutlineWallet />,
    name: "Reward & Wallet",
    link: "/",
  },
  {
    icon: <AiOutlineHeart />,
    name: "Saved",
    link: "/user/wishlist",
  },
];
const menu = [
  {
    icon: <BiBed />,
    name: "Home",
    link: "/",
  },
  {
    icon: <GiEarthAsiaOceania />,
    name: "Hotels",
    link: "/",
  },
  {
    icon: <AiOutlineCar />,
    name: "Day Use Rooms",
    link: "/",
  },
  {
    icon: <MdOutlineAttractions />,
    name: "Pay & Events",
    link: "/",
  },
  {
    icon: <RiTaxiWifiLine />,
    name: "About Us",
    link: "/",
  },
  {
    icon: <AiOutlineUser />,
    name: "Corporate Booking",
    link: "/",
  },

  {
    icon: <MdOutlineAirplaneTicket />,
    name: "Contact Us",
    link: "/",
  },
];

const Search = () => {
  // Gurugram, noida, delhi
  const [cityList, setCityList] = useState(cityArray);
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [room, setRoom] = useState(0);
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);

  const router = useRouter();
  const { user } = useAppSelector((state: any) => state.persistedReducer.auth);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(setHotelWishList([]));
    dispatch(setBookings([]));
    toast.success("User logged out...");
    await router.push("/auth");
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  console.log("user", user);

  const handleSearch = () => {
    console.log("checkIn", checkIn);
    console.log("checkOut", checkOut);
    if (!city) {
      toast.error("Please select city");
      return;
    }
    if (!checkIn) {
      toast.error("Please select check in date");
      return;
    }
    if (!checkOut) {
      toast.error("Please select check out date");
      return;
    }
    if (moment(checkOut).isBefore(moment(checkIn))) {
      toast.error("Check out date should be greater than check in date");
      return;
    }
    if (room < 1) {
      toast.error("Room should be greater than 0");
      return;
    }
    if (adult < 1) {
      toast.error("Adult should be greater than 0");
      return;
    }
    if (children < 0) {
      toast.error("Children should be greater than or equal to 0");
      return;
    }

    dispatch(
      setBookings([
        {
          city,
          checkIn,
          checkOut,
          room,
          adult,
          children,
        },
      ])
    );


    router.push(
      `/search/${city}?checkIn=${checkIn}&checkOut=${checkOut}&room=${room}&adult=${adult}&children=${children}`
    );
  };

  const handleCheckIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckIn(e.target.value);
  };

  const handleCheckOut = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(e.target.value);
  };

  const handleRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(parseInt(e.target.value));
  };

  const handleAdult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdult(parseInt(e.target.value));
  };

  const handleChildren = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildren(parseInt(e.target.value));
  };

  return (
    <div className="w-full theme-bg">
      <header className="w-full theme-bg-head">
        <nav className="">
          <div className="flex flex-wrap justify-between items-center gap-2.5 mx-auto container px-4 lg:px-6 py-2.5 ">
            <Link href="/">
              {/* <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Booking</span> */}
              <Image
                src="/assets/logo/Logo_White.webp"
                alt="logo"
                width={120}
                height={40}
              />
            </Link>
            <div className="hidden md:flex items-center gap-2.5">
              {menu.map((item) => (
                <Link key={item.name} href={item.link}>
                  <div className="flex items-center gap-2.5 text-white cursor-pointer hover:text-gray-300 font-semibold font-sans text-md">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className=" flex flex-end items-center gap-2 sm:gap-4">
              {/* <Link href="/join">
                        <Button text="List your property" textColor="text-white" bgColor="bg-transparent"/>
                    </Link> */}
              {user ? (
                <>
                  <div className="group inline-block relative">
                    <button className=" w-full px-2 flex items-center text-white gap-1 ">
                      <div
                        className="w-8 h-8 border-2 border-orange-500 rounded-full
                                            flex items-center justify-center
                                            overflow-hidden"
                      >
                        <HiUser size={30} />
                      </div>
                      <span className="hidden md:block">Your account</span>
                    </button>
                    <ul className="w-max absolute z-50 right-0 hidden text-primary pt-2 group-hover:block">
                      {accountMenu.map((item) => (
                        <li
                          key={item.name}
                          className="bg-white hover:bg-gray-300 block whitespace-no-wrap"
                        >
                          <Link
                            href={`${item.link}`}
                            className="flex items-center py-2 px-4 gap-x-2.5 "
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="bg-white hover:bg-gray-300 block whitespace-no-wrap">
                        <div
                          onClick={() => handleLogout()}
                          className="flex items-center py-2 px-4 gap-x-2.5 cursor-pointer"
                        >
                          <VscSignOut />
                          <span>Sign out</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button
                      text="Sign In"
                      textColor="text-primary"
                      bgColor="bg-white"
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className=" mx-auto container px-4 lg:px-6 relative ">
        <div className="text-white mx-2 mt-16 mb-48 sm:mb-32 lg:mb-28">
          <h1 className="text-5xl font-bold ">
            Discover Unparalleled Luxury at SaltStayz
          </h1>
          <h3 className="mt-2 text-2xl font-thin">
            Experience Unmatched Comfort and Style
          </h3>
        </div>
        {/* <div
          className="
                    absolute z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    container px-4 lg:px-6 xl:px-40
                    "
        > */}

        <motion.div
          // initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container px-4 lg:px-6 xl:px-40"
        >
          <div className="mx-auto w-full rounded sch-top flex flex-wrap items-end justify-center gap-2.5 p-2 pb-5">
            <div className="">
              <span className="text-black">City</span>
              {/* <input
                value={city}
                className="form-input block rounded"
                placeholder="Where are you going?"
                onChange={handleChange}
              /> */}

              <select
                value={city}
                onChange={handleChange}
                className="form-input block rounded"
              >
                <option value="">Select City</option>
                {cityList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <span>Check In</span>
              <input
                type="date"
                className="form-input block rounded"
                onChange={handleCheckIn}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
            <div className="">
              <span>Check Out</span>
              <input
                type="date"
                className="form-input block rounded"
                onChange={handleCheckOut}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
            {/* <div className="">
              <span>Room</span>
              <input type="number" className="form-input block rounded" />
            </div> */}

            {/* ROOM ADULT CHILDREN AND SEPRATE DROPDOWN FOR CHILDREN AGE AND PETS ALLOW OR NOT */}
            <div className="">
              <span>Room</span>
              <input
                type="number"
                className="form-input block rounded w-20"
                onChange={handleRoom}
                value={room}
              />
            </div>
            <div className="">
              <span>Adult</span>
              <input
                type="number"
                className="form-input block rounded w-20"
                onChange={handleAdult}
                value={adult}
              />
            </div>
            <div className="">
              <span>Children</span>
              <input
                type="number"
                className="form-input block rounded w-20"
                onChange={handleChildren}
                value={children}
              />
            </div>

            {/* <Link
              href={`search/${city}`}
              className={!city ? "pointer-events-none cursor-not-allowed" : ""}
            > */}
            <div>
              <button
                onClick={handleSearch}
                className={`bg-primary text-white rounded px-4 py-2.5 font-semibold`}
              >
                Search
              </button>
            </div>
            {/* </Link> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;
