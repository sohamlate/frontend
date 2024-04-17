import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = ({ item }) => {
  let text = item.productDescription;
  let head = item.productName;
  const [displayText, setDisplayText] = useState(text);
  const navigate = useNavigate();

  useEffect(() => {
    if (text.length > 100) {
      setDisplayText(text.slice(0, 80) + "...");
    } else {
      setDisplayText(text);
    }
  }, [text]);

  const [displayHead, setDisplayHead] = useState(head);

  useEffect(() => {
    if (head.length > 40) {
      setDisplayHead(head.slice(0, 40) + "...");
    } else {
      setDisplayHead(head);
    }
  }, [head]);

  // function handleClick() {
  //   navigate("/Product", { state: { item } });
  // }
  function handleClick() {
    navigate(`/product/${item._id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="min-w-[280px] stripe item-center max-h-[400px] bg-purple-200  hover:scale-110 transition-all duration-200 p-5 rounded-md"
    >
      <div className="flex justify-center my-[1rem] h-[9rem]">
        <img className="flex  rounded-md" src={item.thumbnail} />
      </div>
      <div className="flex justify-between items-center text-xl ">
        <div className=" font-roboto font-bold">
          <p>{displayHead}</p>
        </div>
        <div className="flex  justify-center py-2 ">
          <p>₹ {item.price}</p>
        </div>
      </div>
      <div className="text-center text-md font-poppins">
        <p>{displayText}</p>
      </div>
    </div>
  );
};

export default Products;
