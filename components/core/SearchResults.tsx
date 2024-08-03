import Link from "next/link";
import React, { useEffect } from "react";
import { IHotel } from "../../models";
import Button from "./Button";
import StarRating from "./StarRating";
import Image from "next/image";
import { MdLocationOn } from "../../utils/icons";
import { name } from "react-lorem-ipsum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setRooms } from "../../features/roomSlice";
import axios from "axios";

interface Props {
  data?: IHotel[];
  city?: string;
}

const SearchResults: React.FC<Props> = ({ city }) => {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector(
    (state: any) => state.persistedReducer.app
  );

  const {rooms} = useAppSelector((state: any) => state.persistedReducer.room);
  console.log("rooms", rooms);





  const data = [
    {
      _id: "1",
      title: "Hotel 1",
      name: "Hotel 1",
      rating: 4,
      address: {
        name: "Gurugram",
      },
      descShort: "Hotel 1 description",
      photos: ["/assets/images/offer/4.webp"],
      score: 8.5,
    },
    // {
    //     _id: '2',
    //     title: 'Hotel 2',
    //     rating: 3,
    //     address: {
    //         name: 'Los Angeles',
    //     },
    //     descShort: 'Hotel 2 description',
    //     photos: ['https://via.placeholder.com/150'],
    //     score: 7.5,
    // },
    // {
    //     _id: '3',
    //     title: 'Hotel 3',
    //     rating: 5,
    //     address: {
    //         name: 'San Francisco',
    //     },
    //     descShort: 'Hotel 3 description',
    //     photos: ['https://via.placeholder.com/150'],
    //     score: 9.5,
    // },
  ];

  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  const handleClick = async ()=>{
    console.log("INNNNNN+++++++++++++++++++++++++")
    const queryParames = new URLSearchParams({
      request_type: "RoomList",
      HotelCode: "8",
      APIKey: "11868080699e9df9a0-800a-11eb-9",
      check_in_date: bookings[0]?.checkIn,
      check_out_date: bookings[0]?.checkOut,
      number_adults:bookings[0]?.adult,
      number_children:bookings[0]?.children,
    }).toString();
    const responseGetAvailability = await axios.get(
      `/api/booking?${queryParames}`
    );

    console.log("82===", responseGetAvailability.data);
    dispatch(setRooms({rooms: responseGetAvailability.data}));
  }
  return (
    <div>
      {city && (
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {city}:{" "}
          {data?.length
            ? data?.filter((hotel) => hotel?.address.name === bookings[0]?.city).length
            : 0}{" "}
          hotels
        </h2>
      )}
      {data
        ?.filter((hotel) => hotel?.address.name === bookings[0]?.city)
        .map((hotel) => (
          <div onClick={handleClick}>
          <Link href={`/hotel/${hotel._id}`} key={hotel._id}>
            <div className="flex flex-col lg:flex-row gap-1 border p-5 mb-5">
              <Image
                className="w-full lg:w-1/4 object-cover"
                width={500}
                height={500}
                src={hotel.photos[0]}
                alt={hotel.name}
              />
              <div className="flex-1 flex flex-col justify-between lg:flex-row gap-1">
                <div className="lg:mx-4">
                  <div className="flex flex-wrap gap-1">
                    <p className="text-xl font-bold text-secondary">
                      {hotel.title}
                    </p>
                    <StarRating data={hotel.rating} />
                  </div>
                  <div className="text-sm underline text-secondary flex items-center flex-wrap gap-2">
                    <MdLocationOn />
                    <span className="cursor-pointer capitalize">
                      {hotel.address.name}
                    </span>
                    <span className="cursor-pointer">Show on map</span>
                  </div>

                  <p className="text-sm mt-2">{hotel.descShort}</p>
                </div>
                <div className="font-semibold flex flex-row lg:flex-col justify-between items-center lg:items-end ">
                  <div className="items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg float-right lg:mb-4">
                    {hotel.score ? hotel.score : "No score"}
                  </div>
                  {/* <Button
                                    text="Show prices"
                                    textColor="text-white"
                                    bgColor="bg-lightPrimary"
                                /> */}
                </div>
              </div>
            </div>
          </Link>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
