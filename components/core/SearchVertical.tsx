import Link from "next/link";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import moment from "moment";
import { setBookings, setHotelWishList } from "../../features/appSlice";
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

const SearchVertical = () => {
  const { register, watch } = useForm();
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector(
    (state: any) => state.persistedReducer.app
  );
  console.log(bookings);

  // [
  //     {
  //       city: 'Gurugram',
  //       checkIn: '2024-07-07',
  //       checkOut: '2024-07-08',
  //       room: 1,
  //       adult: 1,
  //       children: 0
  //     }
  //   ]
  const [cityList, setCityList] = useState(cityArray);
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [room, setRoom] = useState(0);
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const router = useRouter();
  const queryUrl = router?.query;

  const citySlug = queryUrl?.slug ? queryUrl?.slug[0] : "";
  const minSlug = queryUrl?.min;
  const maxSlug = queryUrl?.max;

  // const city = watch('city') || citySlug
  // const min = watch('min') || minSlug
  // const max = watch('max') || maxSlug

  console.log(citySlug, minSlug, maxSlug);

  let query = `/search/${city}`;
  if (min) query += `?min=${min}`;
  if (max) query += `&max=${max}`;

  const { width } = useWindowDimensions();

  useEffect(() => {
    setCity(bookings[0]?.city);
    setCheckIn(bookings[0]?.checkIn);
    setCheckOut(bookings[0]?.checkOut);
    setRoom(bookings[0]?.room);
    setAdult(bookings[0]?.adult);
    setChildren(bookings[0]?.children);
  }, [bookings]);

  console.log(city, checkIn, checkOut, room, adult, children);

  // useEffect(() => {
  //   if(city){
  //     //only update city in booking take whole booking as same
  //     const booking = { ...bookings[0], city, checkIn, checkOut, room };
  //     dispatch(setBookings([booking]));

  //   }
  // }, [city, checkIn, checkOut, room]);


  const onSubmit = () => {
    console.log(city, checkIn, checkOut, room);
    const booking = {...bookings[0], city, checkIn, checkOut, room};
    dispatch(setBookings([booking]));
  }





  console.log(bookings);

  return (
    <>
      <form className="w-full h-full p-5 fltr-side">
        <Disclosure defaultOpen={width > 1024}>
          <Disclosure.Button className="w-full">
            <label className="w-full">
              <span className="text-sm float-left">Location</span>
              <select
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
                className="form-select block w-full"
              >
                <option value="">Select City</option>
                {cityList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex flex-wrap gap-x-5">
                <label className="flex-1">
                  <span className="text-sm">Check In</span>
                  <input
                    type="date"
                    className="form-input block w-full"
                    value={moment(checkIn).format("YYYY-MM-DD")}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </label>
                <label className="flex-1">
                  <span className="text-sm">Check Out</span>
                  <input
                    type="date"
                    className="form-input block w-full"
                    value={moment(checkOut).format("YYYY-MM-DD")}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </label>
              </div>
              <label className="w-full">
                <span className="text-sm">Room</span>
                <input
                  type="number"
                  className="form-input block w-full"
                  value={room}
                  onChange={(e: any) => setRoom(e.target.value)}
                />
              </label>
              <div className="w-full flex flex-wrap gap-x-5">
                <label className="flex-1">
                  <span className="text-sm">Min Price</span>
                  <input
                    type="number"
                    className="form-input block w-full"
                    {...register("min")}
                    defaultValue={min}
                  />
                </label>
                <label className="flex-1">
                  <span className="text-sm">Max Price</span>
                  <input
                    type="number"
                    className="form-input block w-full"
                    {...register("max")}
                    defaultValue={max}
                  />
                </label>
              </div>

              
                <div className="w-full">
                  {/* <Button
                    text="Search"
                    textColor="text-white"
                    bgColor="bg-lightPrimary"
                    fullWidth={true}
                    onClick={onSubmit}
                  /> */}
                  <button
                    type="button"
                    className="w-full bg-lightPrimary text-white py-2 rounded-md"
                    onClick={onSubmit}
                  >
                    Search
                  </button>
                </div>
              
            </div>
          </Disclosure.Panel>
        </Disclosure>
      </form>
    </>
  );
};

export default SearchVertical;
