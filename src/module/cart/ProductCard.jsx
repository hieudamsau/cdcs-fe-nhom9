import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { UrlImage } from "../../assets/configImage";
const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = slugify(data?.product?.title, { strict: true });
    navigate(`/${path}/${data?.id}`);
  };
  return (
    <div className="flex items-center justify-start gap-x-3">
      <img
        src={
          UrlImage(data?.product?.image_url[0]?.url) ||
          "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
        }
        alt=""
        className="w-[100px] h-[100px] object-cover border-2 border-solid"
      />
      <div className="flex flex-col items-start flex-wrap gap-y-1">
        <span
          className="text-base font-medium hover:text-blue-800 cursor-pointer line-clamp-2"
          title={data.product.name}
          onClick={handleClick}
        >
          {data.product.name}
        </span>
        <span className="text-sm text-[#8e8db7]">SKU: {data.product.id}</span>
        {/* <span className="text-orange-500 text-sm font-medium">
          Chỉ còn {data.product.inventory} sản phẩm{" "}
        </span> */}
      </div>
    </div>
  );
};

export default ProductCard;
