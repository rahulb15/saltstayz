// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { MdLocationOn, AiFillHeart, AiOutlineHeart, BsFillShareFill } from "../../utils/icons";
// import { Button, Modal } from "reactstrap";
// import { toast } from "react-toastify";
// import { HotelReview, ImageGallery } from "../../components/hotel";
// import { Layout, Header } from "../../components/layout";
// import StarRating from "../../components/core/StarRating";
// import axios from "axios";
// import { useAppSelector } from "../../store/hooks";
// import Swal from "sweetalert2";

// const HotelDetailPage = () => {
//   const router = useRouter();
//   const [hotelData, setHotelData] = useState<any>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isInWishList, setIsInWishList] = useState(false);
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [adult, setAdult] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");

//   const { bookings } = useAppSelector(
//     (state: any) => state.persistedReducer.app
//   );
//   console.log(bookings);
//   useEffect(() => {
//     // Fetch hotel data here
//     const fetchHotelData = async () => {
//       // Replace this with actual API call
//       const data:any = {
//         Room_Name: "Daily Value Deal- Superior(W) - With Breakfast",
//         Room_Description: "Deluxe Room (W) - With Breakfast<br><br>Size: 350 Sqft<br><br>Basic Amenities<br>AC and Smart TV | Complimentary Breakfast| Hot & Cold showers |Iron , Hair Dryer and Wardrobe| Laundry Service |Private Kitchen with Mini Bar| Tea/Coffee maker |Workstation",
//         Roomtype_Name: "Deluxe Room",
//         Room_Max_adult: "3",
//         Room_Max_child: "2",
//         Specials_Desc: "Best Price Guaranteed",
//         specialhighlightinclusion: "Couple friendly, Local ID accepted Breakfast Included, Pay at the property",
//         hotelcode: "35554",
//         room_rates_info: {
//           totalprice_inclusive_all: 1902.88,
//         },
//         RoomImages: [
//           { image: "https://static.ipms247.com/uploads/35554_20240605052707_0011186001717565227_830_27.jpg" },
//           { image: "https://static.ipms247.com/uploads/35554_20240605052708_0450821001717565228_852_28.jpg" },
//           { image: "https://static.ipms247.com/uploads/35554_20240605052709_0418179001717565229_643_32.jpg" },
//           { image: "https://static.ipms247.com/uploads/35554_20240605052710_0405799001717565230_76_34.jpg" },
//           { image: "https://static.ipms247.com/uploads/35554_20240605052711_0516736001717565231_957_50.jpg" },
//           { image: "https://static.ipms247.com/uploads/35554_20240605052712_0635850001717565232_391_56.jpg" },
//         ],
//       };
//       setHotelData(data);
//     };

//     fetchHotelData();
//   }, []);

//   useEffect(() => {
//     if (bookings && bookings[0]) {
//       setCheckIn(bookings[0].checkIn);
//       setCheckOut(bookings[0].checkOut);
//       setAdult(bookings[0].adult);
//       setChildren(bookings[0].children);
//     }
//   }, [bookings]);

//   const wishListHandle = () => {
//     setIsInWishList(!isInWishList);
//     toast.success(isInWishList ? "Deleted from wishlist" : "Saved to wishlist");
//   };

//   const handleBookNow = async () => {
//     try {
//       const { value: formValues } = await Swal.fire({
//         title: "Enter your contact details",
//         html:
//           '<input id="swal-input1" class="swal2-input" placeholder="First Name">' +
//           '<input id="swal-input2" class="swal2-input" placeholder="Last Name">' +
//           '<input id="swal-input3" class="swal2-input" placeholder="Email">' +
//           '<input id="swal-input4" class="swal2-input" placeholder="Phone">',
//         focusConfirm: false,
//         preConfirm: () => {

//         }
//       });

//       if (formValues) {
//         const [firstName, lastName, email, phone] = formValues;
//         setName(firstName);
//         setLastName(lastName);
//         setEmail(email);
//         setPhone(phone);

//         // Call your booking API here
//         // For now, we'll just show a success message
//         Swal.fire(
//           'Booking Successful!',
//           'Your booking has been confirmed.',
//           'success'
//         );
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire(
//         'Error',
//         'There was an error processing your booking.',
//         'error'
//       );
//     }
//   };

//   if (!hotelData) return <div>Loading...</div>;

//   return (
//     <>
//       <Header />
//       <Layout
//         metadata={{
//           title: `${hotelData.Room_Name} - Booking`,
//           description: hotelData.Room_Description,
//         }}
//       >
//         <div className="container mx-auto px-4 py-8">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">{hotelData.Room_Name}</h1>
//             <div className="flex items-center gap-4 mb-4">
//               <p className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
//                 {hotelData.Roomtype_Name}
//               </p>
//               <StarRating data={4} /> {/* Assuming 4-star rating */}
//               <div className="bg-blue-600 text-white px-2 py-1 rounded">
//                 {hotelData.Specials_Desc}
//               </div>
//             </div>
//           </div>

//           <ImageGallery photos={hotelData?.RoomImages.map((img:any) => img.image)} />

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//             <div className="lg:col-span-2">
//               <h2 className="text-2xl font-semibold mb-4">About this room</h2>
//               <div
//                 className="text-gray-700 mb-6"
//                 dangerouslySetInnerHTML={{ __html: hotelData.Room_Description }}
//               />

//               <h3 className="text-xl font-semibold mb-4">Room Highlights</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {hotelData.specialhighlightinclusion.split(', ').map((highlight:any, index:any) => (
//                   <div key={index} className="flex items-center">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>{highlight}</span>
//                   </div>
//                 ))}
//               </div>

//               <h3 className="text-xl font-semibold mt-8 mb-4">Room Capacity</h3>
//               <div className="flex gap-4">
//                 <div className="border rounded-lg p-4">
//                   <h4 className="font-semibold">Max Adults</h4>
//                   <p>{hotelData.Room_Max_adult}</p>
//                 </div>
//                 <div className="border rounded-lg p-4">
//                   <h4 className="font-semibold">Max Children</h4>
//                   <p>{hotelData.Room_Max_child}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-1">
//               <div className="bg-gray-100 p-6 rounded-lg sticky top-8">
//                 <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
//                 <div className="mb-4">
//                   <label className="block mb-2">Check-in</label>
//                   <input
//                     type="date"
//                     value={checkIn}
//                     onChange={(e) => setCheckIn(e.target.value)}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2">Check-out</label>
//                   <input
//                     type="date"
//                     value={checkOut}
//                     onChange={(e) => setCheckOut(e.target.value)}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2">Adults</label>
//                   <input
//                     type="number"
//                     value={adult}
//                     onChange={(e) => setAdult(Number(e.target.value))}
//                     min="1"
//                     max={hotelData.Room_Max_adult}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2">Children</label>
//                   <input
//                     type="number"
//                     value={children}
//                     onChange={(e) => setChildren(Number(e.target.value))}
//                     min="0"
//                     max={hotelData.Room_Max_child}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//                 <div className="text-2xl font-bold mb-4">
//                   ₹{hotelData.room_rates_info.totalprice_inclusive_all} / night
//                 </div>
//                 <Button
//                   color="danger"
//                   block
//                   size="lg"
//                   onClick={handleBookNow}
//                   className="mt-4"
//                 >
//                   Book Now
//                 </Button>
//                 <div className="flex justify-between items-center mt-4">
//                   <button
//                     onClick={wishListHandle}
//                     className="flex items-center text-gray-600 hover:text-red-500"
//                   >
//                     {isInWishList ? <AiFillHeart /> : <AiOutlineHeart />}
//                     <span className="ml-2">Save to wishlist</span>
//                   </button>
//                   <button className="flex items-center text-gray-600 hover:text-blue-500">
//                     <BsFillShareFill />
//                     <span className="ml-2">Share</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default HotelDetailPage;

import React, { Fragment, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  MdLocationOn,
  AiFillHeart,
  FaParking,
  AiOutlineWifi,
  MdFamilyRestroom,
  MdAirportShuttle,
  MdSmokeFree,
  Ri24HoursFill,
  AiOutlineHeart,
  BsFillShareFill,
} from "../../utils/icons";
import { FaSwimmingPool, FaSpa } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  Button,
  Modal,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { Dialog, Transition } from "@headlessui/react";
import { SearchVertical } from "../../components/core";
//import { Button, SearchVertical } from "../../components/core";
import { toast } from "react-toastify";
import { MapContainer } from "../../components/map";
import { HotelReview, ImageGallery } from "../../components/hotel";
import { Layout, Loader } from "../../components/layout";
import { RoomHotel } from "../../components/room";
import StarRating from "../../components/core/StarRating";
import axios from "axios";
import { Header } from "../../components/layout";
import { icons } from "react-icons";
import { useAppSelector } from "../../store/hooks";
import moment from "moment";
import Image from "next/image";
// Custom loader function
const customLoader = ({ src }: any) => src;
const hotel = {
  _id: "1",
  name: "Hotel 1",
  type: "Hotel",
  rating: 4,
  score: 8.5,
  title: "Hotel 1",
  desc: `Property Phone Number for Direct Booking: 9599199601
  <br>
  <br>
<p>Situated right next to Cybercity, the largest business hub of Gurgaon, Saltstayz Le Icon hotel is perfect for both business and leisure travellers looking for comfort and convenience. 
<br> 
<br>
The lobby is spacious and beautifully designed with modern decor, the rooms are tastefully decorated and well-appointed with all the essential amenities to ensure a comfortable stay. Each room comes with air-conditioning, comfortable beds, clean linens, a flat-screen smart TV, Mini Fridge, High speed Wi-Fi, In-room dining service, Tea/ Coffee Maker and premium toiletries which one requires while travelling. 
<br>
<br>
The hotel has a 24 x 7 restaurant that serves delicious Indian and international cuisine. Our chefs use only the freshest ingredients to prepare mouth-watering dishes. 
<br>
<br>
For business travellers, we have a fully-equipped conference room that can accommodate up to 50 people. We provide all the necessary equipment, including projectors, screens, and sound systems, to ensure your meetings or conferences run smoothly.
<br>
<br>
For social gatherings our hotel also has a 150 Pax capacity Banquet Hall, where we serve sumptuous buffet packages and provide customized decorations to suit your occasion. 
<br>
<br>
In addition, we also provide a range of other facilities to make your stay as enjoyable as possible. These include a fitness corner, yoga mats, Open-air terrace garden with music, where you can relax and rejuvenate after a long day.</p>
<br>
<br>
<b>Policies</b>
<br>
Standard as per current website.
<br>
<br> 

<b>Nearby Attractions:</b>
<br>
<br>
DLF CyberHub (3 Kms)
Ambience Mall (2 Kms)
Appu Ghar water park (9 Kms)
Leisure Valley Park (6 Kms)
Museo Camera Art museum (7 Kms)
Aerocity (11 Kms)
<br>
<br>
<b>Map/ Location:</b>
<br>
Molsari Avenue Rapid Metro Station (1.5 Kms)
Guru Dronacharya Metro Station (2 Kms)
Narayana Hospital, Phase 3 (<1 Km)
DLF Cybercity (1 Km)
Udyog Vihar (2 Kms)
Indira Gandhi International Airport (10 Kms)
Gurugram Railway Station (14 Kms)
`,

  descShort: "Hotel 1 description short",
  address: {
    name: "Hotel 1 address",
  },
  photos: [
    "/assets/images/offer/4.webp",

    "/assets/images/offer/4.webp",

    "/assets/images/offer/4.webp",

    "/assets/images/offer/4.webp",
  ],
  reviews: [
    {
      _id: "1",
      user: {
        name: "User 1",
      },
      comment: "Review 1",
      score: 8,
    },
    {
      _id: "2",
      user: {
        name: "User 2",
      },
      comment: "Review 2",
      score: 9,
    },
  ],
  roomTypes: [
    {
      id: "1",
      name: "Room 1",
      description: "Room 1 description",
      price: 1000,
    },
    {
      id: "2",
      name: "Room 2",
      description: "Room 2 description",
      price: 2000,
    },
  ],
};

const HotelDetailPage = () => {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<any>(null);
  const [guests, setGuests] = useState("1 adult");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const { bookings } = useAppSelector(
    (state: any) => state.persistedReducer.app
  );
  console.log(bookings);
  const { rooms } = useAppSelector((state: any) => state.persistedReducer.room);
  console.log("rooms", rooms);

  console.log("selectedRoomType", selectedRoomType);

  // const roomData = [
  //   {
  //     Room_Name: "Monsoon Sale - Deluxe Room (W) - With Breakfast",
  //     Room_Description:
  //       "Deluxe Room (W) - With Breakfast<br><br>Size: 350 Sqft<br><br>Basic Amenities<br>AC and Smart TV | Complimentary Breakfast| Hot & Cold showers |Iron , Hair Dryer and Wardrobe| Laundry Service |Private Kitchen with Mini Bar| Tea/Coffee maker |Workstation",
  //     Roomtype_Name: "Deluxe Room",
  //     Roomtype_Short_code: "Deluxe Room",
  //     Room_Max_adult: "3",
  //     Room_Max_child: "2",
  //     Package_Description: "",
  //     Specials_Desc: "Monsoon Sale | lowest price guaranteed",
  //     specialconditions:
  //       "<b>Not Applicable for Group Bookings|</b> : This price is only applicable for Individual & Family Travelers. Bulk Booking for more than 5 rooms will have separate price (Including Multiplies booking by single user or social event booking).<br>",
  //     specialhighlightinclusion:
  //       "Couple friendly, Local ID accepted Breakfast Included, Pay at the property",
  //     hotelcode: "35554",
  //     roomtypeunkid: "3555400000000000003",
  //     ratetypeunkid: "3555400000000000007",
  //     roomrateunkid: "3555400000000000017",
  //     base_adult_occupancy: 2,
  //     base_child_occupancy: 0,
  //     max_adult_occupancy: 3,
  //     max_child_occupancy: 2,
  //     max_occupancy: "",
  //     inclusion: "",
  //     available_rooms: { "2024-07-15": 24 },
  //     min_ava_rooms: 24,
  //     room_rates_info: {
  //       before_discount_inclusive_tax_adjustment: { "2024-07-15": 0 },
  //       exclusive_tax: { "2024-07-15": 1848 },
  //       exclusivetax_baserate: { "2024-07-15": 1848 },
  //       tax: { "2024-07-15": 221.76 },
  //       adjustment: { "2024-07-15": 0 },
  //       inclusive_tax_adjustment: { "2024-07-15": 2069.76 },
  //       rack_rate: "50300.0000",
  //       totalprice_room_only: 1848,
  //       totalprice_inclusive_all: 2069.76,
  //       avg_per_night_before_discount: 0,
  //       avg_per_night_after_discount: 2069.76,
  //       avg_per_night_without_tax: 1848,
  //       day_wise_baserackrate: [1848],
  //       day_wise_beforediscount: ["4200.0000"],
  //     },
  //     extra_adult_rates_info: {
  //       exclusive_tax: { "2024-07-15": "900.0000" },
  //       tax: { "2024-07-15": 108 },
  //       adjustment: { "2024-07-15": 0 },
  //       inclusive_tax_adjustment: { "2024-07-15": 1008 },
  //       rack_rate: "450.0000",
  //     },
  //     extra_child_rates_info: {
  //       exclusive_tax: { "2024-07-15": "900.0000" },
  //       tax: { "2024-07-15": 108 },
  //       adjustment: { "2024-07-15": 0 },
  //       inclusive_tax_adjustment: { "2024-07-15": 1008 },
  //       rack_rate: "450.0000",
  //     },
  //     min_nights: { "2024-07-15": "1" },
  //     stopsells: { "2024-07-15": "0" },
  //     close_on_arrival: { "2024-07-15": "0" },
  //     close_on_dept: { "2024-07-15": "0" },
  //     Hotel_amenities: "[]",
  //     Hotel_amenitiesNew: [],
  //     Avg_min_nights: "1",
  //     max_nights: [],
  //     check_in_time: "13:00",
  //     check_out_time: "11:00",
  //     TaxName: {
  //       "2024-07-15": {
  //         Taxname_0: "CGST",
  //         taxdate_0: "2022-09-07 15:46:49",
  //         exemptafter_0: "0",
  //         postingtype_0: "SLAB",
  //         postingrule_0: "",
  //         amount_0: "0.0000",
  //         slab_0: "0.00-7500.00-6,7500.01-100000.00-9",
  //         discounttype_0: "AFTERDISCOUNT",
  //         entrydatetime_0: "2022-09-07 10:16:49",
  //         taxapplyafter_0: "",
  //         applyonrackrate_0: "0",
  //         applytaxdate_0: "2022-09-07",
  //         exchange_rate1_0: "1.0000",
  //         exchange_rate2_0: "1.0000",
  //         Taxname_1: "SGST",
  //         taxdate_1: "2022-09-07 15:47:19",
  //         exemptafter_1: "0",
  //         postingtype_1: "SLAB",
  //         postingrule_1: "",
  //         amount_1: "0.0000",
  //         slab_1: "0.00-7500.00-6,7500.01-100000.00-9",
  //         discounttype_1: "AFTERDISCOUNT",
  //         entrydatetime_1: "2022-09-07 10:17:19",
  //         taxapplyafter_1: "",
  //         applyonrackrate_1: "0",
  //         applytaxdate_1: "2022-09-07",
  //         exchange_rate1_1: "1.0000",
  //         exchange_rate2_1: "1.0000",
  //       },
  //     },
  //     ShowPriceFormat: "Average Per Night Rate",
  //     DefaultDisplyCurrencyCode: "",
  //     deals: "Sp:PERCENTDISCOUNT|56|Per",
  //     IsPromotion: false,
  //     Promotion_Code: null,
  //     Promotion_Description: null,
  //     Promotion_Name: null,
  //     Promotion_Id: null,
  //     Package_Name: "Monsoon Sale - Deluxe Room (W) - With Breakfast",
  //     Package_Id: "3555400000000000055",
  //     currency_code: "INR",
  //     currency_sign: "Rs",
  //     localfolder: "saltstayzsector46",
  //     CalDateFormat: "dd-mm-yy",
  //     ShowTaxInclusiveExclusiveSettings: "0",
  //     hidefrommetasearch: "",
  //     prepaid_noncancel_nonrefundable: "0",
  //     cancellation_deadline: "",
  //     digits_after_decimal: "2",
  //     visiblity_nights: "false",
  //     BookingEngineURL:
  //       "https://live.ipms247.com/booking/book-rooms-saltstayzsector46",
  //     NewRoomAmenities: [],
  //     RoomAmenities: "",
  //     room_main_image:
  //       "https://static.ipms247.com/uploads/35554_20240605052707_0011186001717565227_830_27.jpg",
  //     RoomImages:
  //       Array(6)[
  //         ({
  //           room_main_image:
  //             "https://static.ipms247.com/uploads/35554_20240605052707_0011186001717565227_830_27.jpg",
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052707_0011186001717565227_830_27.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052708_0450821001717565228_852_28.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052709_0418179001717565229_643_32.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052710_0405799001717565230_76_34.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052711_0516736001717565231_957_50.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052712_0635850001717565232_391_56.jpg",
  //         })
  //       ],
  //   },
  //   {
  //     Room_Name: "Monsoon Sale - Superior Room (W)-With Breakfast",
  //     Room_Description:
  //       "Superior Room (W)-With Breakfast<br><br>Size: 350 Sqft<br><br>Basic Amenities<br>AC and Smart TV | Complimentary Breakfast| Hot & Cold showers |Iron , Hair Dryer and Wardrobe| Laundry Service | Tea/Coffee maker |Workstation| Private Kitchen with Mini Bar",
  //     Roomtype_Name: "Superior Room",
  //     Roomtype_Short_code: "Superior Room",
  //     Room_Max_adult: "3",
  //     Room_Max_child: "2",
  //     Package_Description: "",
  //     Specials_Desc: "Monsoon Sale | lowest price guaranteed",
  //     specialconditions:
  //       "<b>Not Applicable for Group Bookings|</b> : This price is only applicable for Individual & Family Travelers. Bulk Booking for more than 5 rooms will have separate price (Including Multiplies booking by single user or social event booking).<br>",
  //     specialhighlightinclusion:
  //       "Couple friendly, Local ID accepted Breakfast Included, Pay at the property",
  //     hotelcode: "35554",
  //     roomtypeunkid: "3555400000000000004",
  //     ratetypeunkid: "3555400000000000007",
  //     roomrateunkid: "3555400000000000014",
  //     base_adult_occupancy: 2,
  //     base_child_occupancy: 0,
  //     max_adult_occupancy: 2,
  //     max_child_occupancy: 2,
  //     max_occupancy: "",
  //     inclusion: "",
  //     available_rooms: { "2024-07-15": 8 },
  //     min_ava_rooms: 8,
  //     room_rates_info: {
  //       before_discount_inclusive_tax_adjustment: { "2024-07-15": 0 },
  //       exclusive_tax: { "2024-07-15": 1716 },
  //       exclusivetax_baserate: { "2024-07-15": 1716 },
  //       tax: { "2024-07-15": 205.92 },
  //       adjustment: { "2024-07-15": 0 },
  //       inclusive_tax_adjustment: { "2024-07-15": 1921.92 },
  //       rack_rate: "50000.0000",
  //       totalprice_room_only: 1716,
  //       totalprice_inclusive_all: 1921.92,
  //       avg_per_night_before_discount: 0,
  //       avg_per_night_after_discount: 1921.92,
  //       avg_per_night_without_tax: 1716,
  //       day_wise_baserackrate: [1716],
  //       day_wise_beforediscount: ["3900.0000"],
  //     },
  //     extra_adult_rates_info: {
  //       exclusive_tax: { "2024-07-15": "900.0000" },
  //       tax: { "2024-07-15": 108 },
  //       adjustment: { "2024-07-15": 0 },
  //       inclusive_tax_adjustment: { "2024-07-15": 1008 },
  //       rack_rate: "450.0000",
  //     },
  //     extra_child_rates_info: {
  //       exclusive_tax: { "2024-07-15": "900.0000" },
  //       tax: { "2024-07-15": 108 },
  //       adjustment: { "2024-07-15": 0 },
  //       inclusive_tax_adjustment: { "2024-07-15": 1008 },
  //       rack_rate: "450.0000",
  //     },
  //     min_nights: { "2024-07-15": "1" },
  //     stopsells: { "2024-07-15": "0" },
  //     close_on_arrival: { "2024-07-15": "0" },
  //     close_on_dept: { "2024-07-15": "0" },
  //     Hotel_amenities: "[]",
  //     Hotel_amenitiesNew: [],
  //     Avg_min_nights: "1",
  //     max_nights: [],
  //     check_in_time: "13:00",
  //     check_out_time: "11:00",
  //     TaxName: {
  //       "2024-07-15": {
  //         Taxname_0: "CGST",
  //         taxdate_0: "2022-09-07 15:46:49",
  //         exemptafter_0: "0",
  //         postingtype_0: "SLAB",
  //         postingrule_0: "",
  //         amount_0: "0.0000",
  //         slab_0: "0.00-7500.00-6,7500.01-100000.00-9",
  //         discounttype_0: "AFTERDISCOUNT",
  //         entrydatetime_0: "2022-09-07 10:16:49",
  //         taxapplyafter_0: "",
  //         applyonrackrate_0: "0",
  //         applytaxdate_0: "2022-09-07",
  //         exchange_rate1_0: "1.0000",
  //         exchange_rate2_0: "1.0000",
  //         Taxname_1: "SGST",
  //         taxdate_1: "2022-09-07 15:47:19",
  //         exemptafter_1: "0",
  //         postingtype_1: "SLAB",
  //         postingrule_1: "",
  //         amount_1: "0.0000",
  //         slab_1: "0.00-7500.00-6,7500.01-100000.00-9",
  //         discounttype_1: "AFTERDISCOUNT",
  //         entrydatetime_1: "2022-09-07 10:17:19",
  //         taxapplyafter_1: "",
  //         applyonrackrate_1: "0",
  //         applytaxdate_1: "2022-09-07",
  //         exchange_rate1_1: "1.0000",
  //         exchange_rate2_1: "1.0000",
  //       },
  //     },
  //     ShowPriceFormat: "Average Per Night Rate",
  //     DefaultDisplyCurrencyCode: "",
  //     deals: "Sp:PERCENTDISCOUNT|56|Per",
  //     IsPromotion: false,
  //     Promotion_Code: null,
  //     Promotion_Description: null,
  //     Promotion_Name: null,
  //     Promotion_Id: null,
  //     Package_Name: "Monsoon Sale - Superior Room (W)-With Breakfast",
  //     Package_Id: "3555400000000000054",
  //     currency_code: "INR",
  //     currency_sign: "Rs",
  //     localfolder: "saltstayzsector46",
  //     CalDateFormat: "dd-mm-yy",
  //     ShowTaxInclusiveExclusiveSettings: "0",
  //     hidefrommetasearch: "",
  //     prepaid_noncancel_nonrefundable: "0",
  //     cancellation_deadline: "",
  //     digits_after_decimal: "2",
  //     visiblity_nights: "false",
  //     BookingEngineURL:
  //       "https://live.ipms247.com/booking/book-rooms-saltstayzsector46",
  //     NewRoomAmenities: [],
  //     RoomAmenities: "",
  //     room_main_image:
  //       "https://static.ipms247.com/uploads/35554_20240605052403_0137310001717565043_473_34.jpg",
  //     RoomImages:
  //       Array(6)[
  //         ({
  //           room_main_image:
  //             "https://static.ipms247.com/uploads/35554_20240605052403_0137310001717565043_473_34.jpg",
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052403_0137310001717565043_473_34.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052404_0440925001717565044_778_41.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052405_0493343001717565045_758_42.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052406_0509179001717565046_333_54.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052407_0755868001717565047_96_56.jpg",
  //         },
  //         {
  //           image:
  //             "https://static.ipms247.com/uploads/35554_20240605052807_0029511001717565287_355_12.jpg",
  //         })
  //       ],
  //   },
  // ];

  useEffect(() => {
    setCheckIn(bookings[0]?.checkIn);
    setCheckOut(bookings[0]?.checkOut);
    setAdult(bookings[0]?.adult);
    setChildren(bookings[0]?.children);
  }, [bookings]);

  const handleSuccessModal = () => {
    setOpenSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const id = router.query?.id as string;
  console.log(id);

  const handleChangeBooking = async () => {
    try {
      console.log("90===");
    } catch (err) {
      console.error(err);
    }
  };
  if (hotel) {
    const wishListHandle = () => {
      if (!isInWishList) {
        setIsInWishList(true);
        toast.success("Saved to wishlist");
      } else {
        setIsInWishList(false);
        toast.success("Deleted from wishlist");
      }
    };
    
    // handleChangeBooking(firstName, lastName, email, phone);


    const handleChangeBooking = async (firstName:any, lastName:any, email:any, phone:any) => {
      try {
        const queryParams = new URLSearchParams({
          request_type: "InsertBooking",
          HotelCode: "8",
          APIKey: "11868080699e9df9a0-800a-11eb-9",
        }).toString();

        const bookingData = {
          Room_Details: {
            Room_1: {
              Rateplan_Id: "800000000000001",
              Ratetype_Id: "800000000000001",
              Roomtype_Id: "800000000000001",
              baserate: "3500",
              extradultrate: "500",
              extrachildrate: "500",
              number_adults: adult.toString(),
              number_children: children.toString(),
              ExtraChild_Age: "2",
              Title: "",
              First_Name: firstName,
              Last_Name: lastName,
              Gender: "",
              SpecialRequest: "",
            },
          },
          check_in_date: checkIn,
          check_out_date: checkOut,
          Booking_Payment_Mode: "",
          Email_Address: email,
          Source_Id: "",
          MobileNo: "",
          Address: "",
          State: "",
          Country: "",
          City: "",
          Zipcode: "",
          Fax: "",
          Device: "",
          Languagekey: "",
          paymenttypeunkid: "",
        };

        // const bookingData = {
        //   Room_Details: {
        //     Room_1: {
        //       Rateplan_Id: "800000000000001",
        //       Ratetype_Id: "800000000000001",
        //       Roomtype_Id: "800000000000001",
        //       baserate: "3500",
        //       extradultrate: "500",
        //       extrachildrate: "500",
        //       number_adults: "2",
        //       number_children: "1",
        //       ExtraChild_Age: "2",
        //       Title: "",
        //       First_Name: "ABC",
        //       Last_Name: "Joy",
        //       Gender: "",
        //       SpecialRequest: "",
        //     },
        //   },
        //   check_in_date: "2024-07-13",
        //   check_out_date: "2024-07-14",
        //   Booking_Payment_Mode: "",
        //   Email_Address: "abc@gmail.com",
        //   Source_Id: "",
        //   MobileNo: "",
        //   Address: "",
        //   State: "",
        //   Country: "",
        //   City: "",
        //   Zipcode: "",
        //   Fax: "",
        //   Device: "",
        //   Languagekey: "",
        //   paymenttypeunkid: "",
        // };

        console.log("bookingData===", bookingData);

        const formData = new FormData();
        formData.append("BookingData", JSON.stringify(bookingData));

        const headers = {
          "Content-Type": "multipart/form-data", // Ensure this is multipart/form-data for FormData
        };

        const response = await axios.post(
          `/api/booking?${queryParams}`,
          formData,
          { headers }
        );
        console.log("130===", response.data);

        if (response.data.ReservationNo) {
          const queryParames = new URLSearchParams({
            request_type: "ReadBooking",
            HotelCode: "8",
            APIKey: "11868080699e9df9a0-800a-11eb-9",
            ResNo: response.data.ReservationNo,
          }).toString();
          const responseGetBookingDetails = await axios.post(
            `/api/booking?${queryParames}`
          );

          console.log("145===", responseGetBookingDetails.data);

          Swal.fire({
            title: "Booking successful",
            icon: "success",
            html: `
                <p>Thank you for booking with us. Your booking reservation number is <strong>#${response.data.ReservationNo}</strong>. We have sent you an email confirmation.</p>
                <p>For any queries, please contact our customer service team.</p>
              `,
            showCloseButton: true,
            confirmButtonColor: "#3085d6",
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: "Close",
          });
        }

        console.log("130====", response.data); // Handle the response as needed
      } catch (err) {
        console.error(err);
      }
    };

    // const handleBookNow = async () => {
    //   try {
    //     Swal.fire({
    //       title: "Enter your email address",
    //       input: "email",
    //       inputLabel: "Your email address",
    //       inputPlaceholder: "Enter your email address",
    //       showCancelButton: true,
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: "Submit",
    //       showLoaderOnConfirm: true,
    //       preConfirm: (email) => {
    //         console.log("Email:", email);
    //       },
    //       allowOutsideClick: () => !Swal.isLoading(),
    //       confirmButtonColor: "#3085d6",
    //       inputValidator: (value) => {
    //         if (!value) {
    //           return "You need to write something!";
    //         }
    //         const emailPattern =
    //           /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //         if (!emailPattern.test(value)) {
    //           return "Please enter a valid email address";
    //         }
    //       },
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         Swal.fire({
    //           title: "Booking successful",
    //           icon: "success",
    //           html: `
    //             <p>Thank you for booking with us. Your booking reference number is <strong>#123456</strong>. We have sent you an email confirmation.</p>
    //             <p>For any queries, please contact our customer service team.</p>
    //           `,
    //           showCloseButton: true,
    //           showCancelButton: false,
    //           focusConfirm: false,
    //           confirmButtonText: "Close",
    //         });
    //       }
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    const handleBookNow = async () => {
      try {
        Swal.fire({
          title: "Enter your contact details",
          html: `
            <input type="text" id="swal-input-first-name" class="swal2-input" placeholder="Enter your first name">
            <input type="text" id="swal-input-last-name" class="swal2-input" placeholder="Enter your last name">
            <input type="email" id="swal-input-email" class="swal2-input" placeholder="Enter your email address">
            <input type="tel" id="swal-input-phone" class="swal2-input" placeholder="Enter your phone number">
          `,
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const firstName = (
              document.getElementById(
                "swal-input-first-name"
              ) as HTMLInputElement
            ).value;
            const lastName = (
              document.getElementById(
                "swal-input-last-name"
              ) as HTMLInputElement
            ).value;

            const email = (
              document.getElementById("swal-input-email") as HTMLInputElement
            ).value;
            const phone = (
              document.getElementById("swal-input-phone") as HTMLInputElement
            ).value;

            if (!email || !phone || !firstName || !lastName) {
              Swal.showValidationMessage("You need to fill out both fields!");
            }

            const emailPattern =
              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email)) {
              Swal.showValidationMessage("Please enter a valid email address");
            }

            const phonePattern = /^[0-9]{10}$/; // example pattern for 10-digit phone number
            if (!phonePattern.test(phone)) {
              Swal.showValidationMessage("Please enter a valid phone number");
            }

            return {
              email: email,
              phone: phone,
              firstName: firstName,
              lastName: lastName,
            };
          },
          allowOutsideClick: () => !Swal.isLoading(),
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            const email = result.value.email;
            console.log("Email:", email);
            const phone = result.value.phone;
            console.log("Phone:", phone);
            console.log("First Name:", result.value.firstName);
            console.log("Last Name:", result.value.lastName);
            // setPhone(phone);
            // setEmail(email);
            // setName(result.value.firstName);
            // setLastName(result.value.lastName);
            handleChangeBooking(result.value.firstName, result.value.lastName, email, phone);

            // Swal.fire({
            //   title: "Booking successful",
            //   icon: "success",
            //   html: `
            //     <p>Thank you for booking with us. Your booking reference number is <strong>#123456</strong>. We have sent you an email confirmation.</p>
            //     <p>For any queries, please contact our customer service team.</p>
            //   `,
            //   showCloseButton: true,
            //   confirmButtonColor: "#3085d6",
            //   showCancelButton: false,
            //   focusConfirm: false,
            //   confirmButtonText: "Close",
            // });

            // console.log("Email:", result.value.email);
            // console.log("Phone:", result.value.phone);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <>
        <Header />
        <Layout
          metadata={{
            title: `${hotel.name} - Booking`,
            description: hotel.desc,
          }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {hotel.type}
                </p>
                <StarRating data={hotel.rating} />
                <div className="bg-blue-600 text-white px-2 py-1 rounded">
                  {hotel.score.toFixed(1)}
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <MdLocationOn className="mr-2" />
                <span>{hotel.address.name}</span>
                <button
                  className="ml-4 text-blue-600 hover:underline"
                  onClick={() => setShowMap(true)}
                >
                  Show on map
                </button>
              </div>
            </div>

            {/* <ImageGallery photos={hotel.photos} /> */}
            {selectedRoomType ? (
              <>
              {selectedRoomType?.RoomImages?.length > 0 ? (
                <ImageGallery
                  photos={selectedRoomType?.RoomImages?.map(
                    (image: any) => image.image
                  )}
                />
              ) : (
                <ImageGallery photos={[selectedRoomType?.room_main_image]} />
              )}
              </>
            ) : (
              <ImageGallery photos={hotel.photos} />
            )}
            


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">
                  About this hotel
                </h2>
                <p className="text-gray-700 mb-6">
                  {
                    <div
                      dangerouslySetInnerHTML={{
                        __html: hotel.desc,
                      }}
                    />
                  }
                </p>

                <h3 className="text-xl font-semibold mb-4">Room Highlights</h3>

                <div className="grid grid-cols-2 gap-4">
                  {hotel.descShort.split(", ").map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  Popular amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* {[
                    { icon: <AiOutlineWifi />, label: "Free WiFi" },
                    { icon: <FaParking />, label: "Free parking" },
                    { icon: <MdFamilyRestroom />, label: "Family rooms" },
                    { icon: <MdAirportShuttle />, label: "Airport shuttle" },
                    { icon: <MdSmokeFree />, label: "Non-smoking rooms" },
                    { icon: <Ri24HoursFill />, label: "24-hour front desk" },
                    { icon: <FaSwimmingPool />, label: "Swimming pool" },
                    // { icon: <MdRestaurant />, label: "Restaurant" },
                    { icon: <FaSpa />, label: "Spa and wellness center" },
                    // { icon: <MdFitnessCenter />, label: "Fitness center" },
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">
                        {amenity.icon}
                      </span>
                      <span>{amenity.label}</span>
                    </div>
                  ))} */}

                  {/* {selectedRoomType?.NewRoomAmenities.map((amenity:any, index:any) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))} */}

{/* Room_Description */}

                  {selectedRoomType?.Room_Description.split("| ").map((amenity:any, index:any) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}






                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Choose your room</h3>
                <div className="space-y-4">
                  {/* {hotel.roomTypes.map((room: any) => (
                    <div
                      key={room.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold mb-2">{room.name}</h4>
                      <p className="text-gray-600 mb-2">{room.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">
                          ₹{room.price} / night
                        </span>
                        <Button
                          color="primary"
                          onClick={() => setSelectedRoomType(room)}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  ))} */}

                  {/* {roomData.map((room: any) => (
                    <div
                      key={room.Roomtype_Id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold mb-2">{room.Room_Name}</h4>
                      <p
                        className="text-gray-600 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: room.Room_Description,
                        }}
                      ></p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">
                          ₹{room.room_rates_info.totalprice_inclusive_all} / night
                        </span>
                        <Button
                          color="primary"
                          onClick={() => setSelectedRoomType(room)}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  ))} */}

                  {rooms?.map((room: any) => (
                    <div
                      key={room.Roomtype_Id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold mb-2">{room.Room_Name}</h4>
                      <div className="flex justify-between items-center">
                        <p
                          className="text-gray-600 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: room.Room_Description,
                          }}
                        ></p>

                        <Image
                          loader={customLoader}
                          src={room.room_main_image}
                          alt={room.Room_Name}
                          width={250}
                          height={250}
                        />
                      </div>

                      <div className="flex justify-between items-center mt-8">
                        <span className="font-bold text-lg">
                          ₹{room?.room_rates_info?.totalprice_inclusive_all} /
                          night
                        </span>
                        <button
                          color="primary"
                          onClick={() => setSelectedRoomType(room)}
                          className={`px-4 py-2 text-white rounded-lg font-semibold ${ selectedRoomType?.Room_Name === room.Room_Name ? "bg-green-600" : "bg-blue-500"}`}
                        >
                          {selectedRoomType?.Room_Name === room.Room_Name
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="lg:col-span-1">
                <div className="bg-gray-100 p-6 rounded-lg sticky top-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Price for your dates
                  </h3>
                  <div className="mb-4">
                    <label className="block mb-2">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Adults</label>
                    <input
                      type="number"
                      value={adult}
                      onChange={(e) => setAdult(+e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Children</label>
                    <input
                      type="number"
                      value={children}
                      onChange={(e) => setChildren(+e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <Button
                    color="danger"
                    block
                    size="lg"
                    onClick={handleBookNow}
                    className="mt-4"
                  >
                    Book Now
                  </Button>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={wishListHandle}
                      className="flex items-center text-gray-600 hover:text-red-500"
                    >
                      {isInWishList ? <AiFillHeart /> : <AiOutlineHeart />}
                      <span className="ml-2">Save to wishlist</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-500">
                      <BsFillShareFill />
                      <span className="ml-2">Share</span>
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="lg:col-span-1">
                <div className="bg-gray-100 p-6 rounded-lg sticky top-8">
                  <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
                  <div className="mb-4">
                    <label className="block mb-2">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Adults</label>
                    <input
                      type="number"
                      value={adult}
                      onChange={(e) => setAdult(Number(e.target.value))}
                      min="1"
                      max={
                        selectedRoomType
                          ? selectedRoomType?.room_rates_info
                              .max_adult_occupancy
                          : 1
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Children</label>
                    <input
                      type="number"
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      min="0"
                      max={
                        selectedRoomType
                          ? selectedRoomType?.room_rates_info
                              .max_child_occupancy
                          : 1
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="text-2xl font-bold mb-4">
                    {selectedRoomType
                      ? `₹${selectedRoomType?.room_rates_info.totalprice_inclusive_all} / night`
                      : "Please select a room"}
                  </div>
                  <button
                    color="danger"
                    onClick={selectedRoomType ? handleBookNow : undefined}
                    className= {`px-4 py-2 text-white rounded-lg font-semibold ${selectedRoomType ? "bg-blue-500" : "bg-gray-500"}`}
                  >
                    Book Now
                  </button>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={wishListHandle}
                      className="flex items-center text-gray-600 hover:text-red-500"
                    >
                      {isInWishList ? <AiFillHeart /> : <AiOutlineHeart />}
                      <span className="ml-2">Save to wishlist</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-500">
                      <BsFillShareFill />
                      <span className="ml-2">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
              <Button
                color="primary"
                onClick={() => setShowModal(true)}
                className="mb-4"
              >
                Read all {hotel.reviews.length} reviews
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotel.reviews.slice(0, 4).map((review) => (
                  <div key={review._id} className="border p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <h4 className="font-semibold">{review.user.name}</h4>
                        <StarRating data={review.score / 2} />
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Modal
            isOpen={showModal}
            toggle={() => setShowModal(false)}
            size="lg"
          >
            <HotelReview
              reviews={hotel.reviews}
              id={id}
              setShowModal={setShowModal}
            />
          </Modal>
        </Layout>
      </>
    );
  }
  return <div>Some thing is wrong</div>;
};

export default HotelDetailPage;
