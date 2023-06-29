import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SubInformationProduct from "./SubInformationProduct";
import { UrlImage } from "../../../assets/configImage";

const InformationProduct = ({ data }) => {
  const [activeThumb, setActiveThumb] = useState();

  return (
    <div className="Information-product bg-white rounded-xl py-8 px-2">
      <div className="product-image">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Thumbs, Autoplay]}
          grabCursor={true}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          thumbs={{ swiper: activeThumb }}
          className="product-images-slider"
        >
          {data?.image_url?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={
                  UrlImage(item?.url) ||
                  "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
                }
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setActiveThumb}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          modules={[Navigation, Thumbs]}
          className="product-images-slider-thumbs"
        >
          {data?.image_url?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="product-images-slider-thumbs-wrapper">
                {/* <img src={`${process.env.URL_IMAGE}${item?.url}`} alt="" /> */}
                <img
                  src={
                    UrlImage(item?.url) ||
                    "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
                  }
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <SubInformationProduct data={data} />
    </div>
  );
};

export default InformationProduct;
