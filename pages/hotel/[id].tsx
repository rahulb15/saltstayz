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
  const [selectedRoomType, setSelectedRoomType] = useState(null);
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

    const handleChangeBooking = async () => {
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
              First_Name: name,
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
              document.getElementById("swal-input-first-name") as HTMLInputElement
            ).value;
            const lastName = (
              document.getElementById("swal-input-last-name") as HTMLInputElement
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

            return { email: email, phone: phone, firstName: firstName, lastName: lastName };
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
            setPhone(phone);
            setEmail(email);
            setName(result.value.firstName);
            setLastName(result.value.lastName);
            handleChangeBooking();

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

            <ImageGallery photos={hotel.photos} />

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

                <h3 className="text-xl font-semibold mb-4">
                  Popular amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
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
                  ))}
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Room Types</h3>
                <div className="space-y-4">
                  {hotel.roomTypes.map((room: any) => (
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
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
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
