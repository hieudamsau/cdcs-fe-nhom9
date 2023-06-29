import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../assets/configImage";
const InformationOrder = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = slugify(data?.product?.title, { strict: true });
    navigate(`/${path}/${data.id}`);
  };
  console.log("dataimh", data);
  return (
    <div className="flex items-center justify-between px-5 gap-x-5 py-5">
      <img
        src={
          UrlImage(data?.product?.image_url[0]?.url) ||
          "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
        }
        alt=""
        className="w-[80px] h-[80px] border-2 border-solid"
      />
      <div className="flex flex-col justify-start items-start">
        <span
          className="text-sm line-clamp-2 hover:text-blue-800 cursor-pointer font-medium"
          onClick={handleClick}
          title={data.product.title}
        >
          {data.product.title}
        </span>
        <span className="text-sm text-[#a28faa]">
          Số lượng: {data.quantity}
        </span>
        <span className="text-base font-semibold text-blue-700">
          {formatPrice(data.product.price)}
        </span>
      </div>
    </div>
  );
};

export default InformationOrder;
