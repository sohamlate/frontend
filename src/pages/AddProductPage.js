import React from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
const Productpage = () => {
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

  const token = localStorage.getItem('token');

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
          "https://backend-1-9nhi.onrender.com/api/v1/product/getCategoryDetail"
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
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('productDescription', formData.productDescription);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('tags', formData.tags);
     //   const selectedCategory = JSON.parse(formData.Category);
     console.log("in form data",formData.Category);
        formDataToSend.append('Categorys', formData.Category);
        formDataToSend.append('thumbnailImage', formData.thumbnailImage);
        const response = await axios.post("https://backend-1-9nhi.onrender.com/api/v1/product/createproduct",formDataToSend,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

      if (response) navigate("/gallary");

      toast.success("Product Inserted Successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="">
      <div className="flex flex-row gap-x-[10rem]">
        <div className="w-[30rem] ml-[5rem] mt-[2rem] border-2 ">
          <input id="thumbnailImage" type="file" onChange={changeHandler}></input>
          {imageUrl && ( // Display the image if imageUrl is available
            <img src={imageUrl} alt="Thumbnail" style={{ maxWidth: "100%", marginTop: "0rem" }} /> )}
       
        </div>
        <div className="w-[40%] ml-[5rem] ">
          <input
            className="font-bold text-3xl mt-[3rem] p-2 focus:outline-none"
            type="text"
            id="productName"
            placeholder="Please Enter The Title"
            value={formData.productName}
            onChange={changeHandler}
          />

          <input
            className="mt-[3rem] w-[40rem] h-[3rem] font-semibold block text-xl whitespace-normal focus:outline-none"
            placeholder="Enter Description"
            id="productDescription"
            value={formData.productDescription}
            onChange={changeHandler}
          />

          <input
            className="mt-[1rem] font-semibold text-xl focus:outline-none "
            placeholder="Enter Price"
            id="price"
            type="number"
            value={formData.price}
            onChange={changeHandler}
          />

          <input
            className="mt-[1.5rem] font-semibold text-xl focus:outline-none block "
            placeholder="Enter Tags"
            id="tags"
            value={formData.tags}
            onChange={changeHandler}
          />

          {/* <input className="mt-[1rem] font-semibold text-xl focus:outline-none " placeholder="Enter Category"/> */}
          <div className="mt-[3rem]">
            <label for="category" className="mx-[1rem]">
              Select a Category:
            </label>
            {/* onSelect={() => console.log(123)} */}

            <select id="Category" onChange={changeHandler}>
              <option>Select Category</option>
              {catogoryList &&
                catogoryList.map((ele) => {
                  return <option value={JSON.stringify(ele)}>{ele.name}</option>;
                })}
            </select>
          </div>
        </div>
      </div>
      <button className="ml-[50%] mt-[3%] border-2 bg-blue-600 py-2 px-[3rem] text-white font-semibold">
        Submit
      </button>
    </form>
  );
};

export default Productpage;
