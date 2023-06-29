import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../assets/configImage";

const CartItem = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = slugify(product.product.title, { strict: true });
    navigate(`/${path}/${product.id}`);
  };
  return (
    <div className="flex items-center gap-x-3 mb-5">
      <img
        src={
          UrlImage(product?.product.image_url[0]?.url) ||
          "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
        }
        alt=""
        className="w-[80px] h-[80px] border-2 border-solid cursor-pointer"
        onClick={handleClick}
      />
      <div className="flex flex-col items-start text-black">
        <span
          className=" text-sm line-clamp-2 hover:text-blue-800 font-medium"
          title={product.product.title}
          onClick={handleClick}
        >
          {" "}
          {product.product.title}
        </span>
        <span className="text-sm text-[#a28faa]">
          Số lượng: {product.quantity}
        </span>
        <span className="text-base font-medium">
          {formatPrice(product.product.price)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
