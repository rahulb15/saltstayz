import React from "react";
import Button from "../core/Button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import getFlagEmoji from "../../utils/getFLagEMoji";
import Link from "next/link";

const Offers = () => {
  const offers = [
    {
      title: "Enjoy 20% off on your first booking",
      description:
        "Book your first stay with us and get 20% off on your booking",
      button: "Book now",
      image: "7.webp",
    },
    {
      title: "Refer a friend and get 10% off",
      description: "Refer a friend and get 10% off on your next booking",
      button: "Refer now",
      image: "7.webp",
    },
    {
      title: "Get 30% off on your next booking",
      description:
        "Book your next stay with us and get 30% off on your booking",
      button: "Book now",
      image: "7.webp",
    },
  ];

  const locations = [
    {
      name: "Saltstayz Le Icon – Cyber Hub",
      city: "9 J, near city club, DLF Phase 3, Sector 24, Gurugram, Haryana 122002, India",
      countryCode: "IN",
      image: "/assets/images/offer/4.webp",
    },
    {
      name: "Golf Course Extension Road",
      city: "Senate Court, Sector 62, Gurugram, Haryana 122101, India",
      countryCode: "IN",
      image: "/assets/images/offer/5.webp",
    },
    {
      name: "Saltstayz Le Icon – Cyber Hub",
      city: "9 J, near city club, DLF Phase 3, Sector 24, Gurugram, Haryana 122002, India",
      countryCode: "IN",
      image: "/assets/images/offer/6.webp",
    },
    {
      name: "Golf Course Extension Road",
      city: "Senate Court, Sector 62, Gurugram, Haryana 122101, India",
      countryCode: "IN",
      image: "/assets/images/offer/5.webp",
    },
    {
      name: "Saltstayz Le Icon – Cyber Hub",
      city: "9 J, near city club, DLF Phase 3, Sector 24, Gurugram, Haryana 122002, India",
      countryCode: "IN",
      image: "/assets/images/offer/6.webp",
    },
    {
      name: "Golf Course Extension Road",
      city: "Senate Court, Sector 62, Gurugram, Haryana 122101, India",
      countryCode: "IN",
      image: "/assets/images/offer/5.webp",
    },
    {
      name: "Saltstayz Le Icon – Cyber Hub",
      city: "9 J, near city club, DLF Phase 3, Sector 24, Gurugram, Haryana 122002, India",
      countryCode: "IN",
      image: "/assets/images/offer/4.webp",
    },
    {
      name: "Golf Course Extension Road",
      city: "Senate Court, Sector 62, Gurugram, Haryana 122101, India",
      countryCode: "IN",
      image: "/assets/images/offer/6.webp",
    },
  ];
  return (
    <div className="mt-48 sm:mt-32 lg:mt-28 mb-20 w-full relative">
      <div className="mb-5">
        <h1 className="font-bold text-2xl text-black">Offers</h1>
        <h2 className="text-primary font-light text-xl">
          Promotions, deals, and special offers for you
        </h2>
      </div>

      <div className="select-none mb-5">
        <Swiper
          spaceBetween={50}
          slidesPerView={1.5}
          loop={true}
          autoplay={true}
          modules={[Autoplay]}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.title}>
              <div className="relative w-full rounded-2xl overflow-hidden">
                <Image
                  className="absolute w-full h-full -z-10 object-cover"
                  src={`/assets/images/offer/${offer.image}`}
                  alt={offer.title}
                  width={1000}
                  height={300}
                  loading={"lazy"}
                  style={{ filter: "brightness(0.5)" }}
                />
                <div className="p-2.5 sm:px-5 sm:py-10 text-white">
                  <h2 className="font-bold mb-2 text-2xl sm:text-3xl h-24 sm:h-16 lg:h-max">
                    {offer.title}
                  </h2>
                  <h2 className="mb-5">{offer.description}</h2>
                  <Button
                    text={offer.button}
                    textColor={"text-white"}
                    bgColor={"bg-lightPrimary"}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mb-5">
        <h1 className="font-bold text-2xl text-black">Hotels</h1>
        <h2 className="text-primary font-light text-xl">
            Popular Hotels in India
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Fix key index */}
        {locations.map((location, index) => (
          <Link href={`/search/${location.city}`} key={index}>
            <div className={`relative block overflow-hidden rounded-xl `}>
              <Image
                className="absolute w-full h-full object-cover"
                src={location.image}
                alt={location.name}
                width={200}
                height={100}
                loading={"lazy"}
              />
              <div className="relative p-8 pt-40 text-white hover:bg-black hover:bg-opacity-40">
                <h3 className="text-2xl font-bold">{location.name}</h3>
                <p className="text-xl">{getFlagEmoji(location.countryCode)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Offers;
