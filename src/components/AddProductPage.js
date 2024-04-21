import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
const Productpage = ({ showAddPage, setShowAddPage }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    tags: "",
    Category: "",
    thumbnailImage: "",
  });
  const [catogoryList, setCatogoryList] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  console.log(token);

  //   function changeHandler(event) {
  //     setFormData((pre) => ({ ...pre, [event.target.id]: event.target.value }));
  //   }

  function changeHandler(event) {
    if (event.target.id === "thumbnailImage") {
      const file = event.target.files[0];
      // If file input is changed
      setFormData((prev) => ({
        ...prev,
        thumbnailImage: file, // Set thumbnailImage to the selected file
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // For other input fields
      setFormData((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    }
  }

  useEffect(() => {
    console.log(formData);
    return () => {};
  }, [formData]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const cat = await axios.get(
          "https://backend-tub9.onrender.com/api/v1/product/getCategoryDetail"
        );

        console.log(cat.data.allCategory);
        setCatogoryList(cat.data.allCategory);

        console.log(cat);
      } catch (err) {}
    };

    fetch();
    return () => {};
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    //  console.log(formData);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productDescription", formData.productDescription);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("tags", formData.tags);
      //   const selectedCategory = JSON.parse(formData.Category);
      console.log("in form data", formData.Category);
      formDataToSend.append("Categorys", formData.Category);
      formDataToSend.append("thumbnailImage", formData.thumbnailImage);
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/product/createproduct",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) navigate("/gallary");

      toast.success("Product Inserted Successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white relative border-2  rounded-md p-1 font-poppins shadow-md shadow-black"
    >
      <div
        onClick={() => setShowAddPage(!showAddPage)}
        className="bg-red-600 w-fit p-1 text-white rounded-full absolute -right-2 -top-2 hover:scale-110 hover:bg-red-700 "
      >
        <RxCross2 />
      </div>
      <div className="flex gap-x-3 ">
        <div className="border-2 rounded-md ml-3 mt-3 min-w-[20vw]">
          <input
            id="thumbnailImage"
            type="file"
            accept="image/*"
            onChange={changeHandler}
            style={{ display: "none" }}
          ></input>
          <label htmlFor="thumbnailImage" className="cursor-pointer blink">
            Select Image
          </label>
          {imageUrl && <img src={imageUrl} className=" mt-0 p-1 max-w-[30rem]" />}
        </div>

        <div className="">
          <input
            className="font-bold text-3xl mt-[3rem] w-full rounded-md px-2 focus:outline-none"
            type="text"
            id="productName"
            placeholder="Please Enter The Title"
            value={formData.productName}
            onChange={changeHandler}
          />

          <input
            className="mt-[3rem] w-full rounded-md h-[3rem] font-semibold block text-xl whitespace-normal focus:outline-none"
            placeholder="Enter Description"
            id="productDescription"
            value={formData.productDescription}
            onChange={changeHandler}
          />

          <input
            className="mt-[1rem] font-semibold rounded-md w-full text-xl focus:outline-none "
            placeholder="Enter Price"
            id="price"
            type="number"
            value={formData.price}
            onChange={changeHandler}
          />

          <input
            className="mt-[1.5rem] font-semibold  w-full rounded-md text-xl focus:outline-none block "
            placeholder="Enter Tags"
            id="tags"
            value={formData.tags}
            onChange={changeHandler}
          />

          <div className="mt-[3rem]">
            <label for="category" className="mx-[1rem] font-bold">
              Select a Category:
            </label>
            <select id="Category" onChange={changeHandler}>
              <option>Select Category</option>
              {catogoryList &&
                catogoryList.map((ele) => {
                  return (
                    <option value={JSON.stringify(ele)}>{ele.name}</option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <button className=" left-1/2 ml-[50%] mt-[3%] border-2 bg-blue-600 py-2 px-[3rem] text-white font-semibold">
        Submit
      </button>
    </form>
  );
};

export default Productpage;
