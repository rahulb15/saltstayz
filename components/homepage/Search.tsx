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

const Search = () => {
  const [city, setCity] = useState("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  console.log("user", user);
  return (
    <div className="w-full theme-bg">
      <header className="w-full theme-bg-head">
        <nav className="">
          <div className="flex flex-wrap justify-between items-center gap-2.5 mx-auto container px-4 lg:px-6 py-2.5 ">
            <Link href="/">
              {/* <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Booking</span> */}
              <Image
                src="/assets/logo/Logo.png"
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
              <span className="text-black">Location</span>
              <input
                value={city}
                className="form-input block rounded"
                placeholder="Where are you going?"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <span>Check In</span>
              <input type="date" className="form-input block rounded" />
            </div>
            <div className="">
              <span>Check Out</span>
              <input type="date" className="form-input block rounded" />
            </div>
            {/* <div className="">
              <span>Room</span>
              <input type="number" className="form-input block rounded" />
            </div> */}

            {/* ROOM ADULT CHILDREN AND SEPRATE DROPDOWN FOR CHILDREN AGE AND PETS ALLOW OR NOT */}
            <div className="">
              <span>Room</span>
              <input type="number" className="form-input block rounded w-20" />
            </div>
            <div className="">
              <span>Adult</span>
              <input type="number" className="form-input block rounded w-20" />
            </div>
            <div className="">
              <span>Children</span>
              <input type="number" className="form-input block rounded w-20" />
            </div>

            <Link
              href={`search/${city}`}
              className={!city ? "pointer-events-none cursor-not-allowed" : ""}
            >
              <div>
                <Button
                  text="Search"
                  textColor="text-white"
                  bgColor="bg-lightPrimary"
                />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;
