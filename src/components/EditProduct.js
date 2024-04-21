import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import axios from "axios";
const EditProduct = ({ item, showEditPage, setShowEditPage }) => {
  const [formData, setFormData] = useState({
    productName: item.productName,
    productDescription: item.productDescription,
    price: item.price,
    thumbnail: item.thumbnail,
    image: null,
  });
  const editHandler = async () => {
    const response = await axios.post(
      "https://backend-tub9.onrender.com/api/v1/product/editProduct",
      {
        productName: formData.productName,
        productDescription: formData.productDescription,
        price: formData.price,
        thumbnail: formData.thumbnail,
        productId: item._id,
      }
    );
    console.log("edit response",response);
  };
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: URL.createObjectURL(file),
        image : file,
      }));
    }
  };

  const handleEditThumbnailClick = () => {
    document.getElementById("thumbnailInput").click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    try{
        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image);
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('productDescription', formData.productDescription);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('thumbnail', formData.thumbnail);
        formDataToSend.append('productId', item._id);

      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/product/editProduct",formDataToSend
      );
      console.log("edit response",response);
    }
    catch(err){
      console.log(err);
    }
    
  };
  
  console.log(formData.image);

  return (
    
    <div className="bg-blue-50 border-2 border-black w-[80%] p-4 relative rounded-md shadow-md font-poppins">
      <div
        onClick={() => setShowEditPage(!showEditPage)}
        className="bg-red-500 text-white p-1 rounded-full w-fit absolute -right-2 -top-3 hover:scale-110 hover:bg-red-600 transition-all duration-300"
      >
        <RxCross2 />
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 justify-center items-center">
          <div className="w-[50%] relative">
            <label className="block mb-2">
              <img
                src={formData.thumbnail}
                className="w-full h-auto relative"
                alt="Thumbnail"
              />
              <input
                type="file"
                accept="image/*"
                id="thumbnailInput"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              <button
                onClick={handleEditThumbnailClick}
                className=" absolute -top-2 -right-2 bg-blue-500 text-white  p-1 rounded-full "
              >
                <MdEdit className="mr-2" />
              </button>
            </label>
          </div>
          <div className="flex flex-col w-[50%] my-auto gap-y-4">
            <div className="flex flex-col">
              <label className="flex flex-col mb-2">
                <span className="text-lg">Product Name:</span>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 focus:outline-none rounded-md bg-blue-200"
                />
              </label>
            </div>
            <div className="flex flex-col">
              <label className="flex flex-col mb-2 text-lg">
                Product Description:
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 rounded-md resize-none overflow-y-scroll scrollbar-hide focus:outline-none bg-blue-200 "
                />
              </label>
            </div>
            <div className="flex flex-col text-lg">
              <label className="flex flex-col mb-2">
                Price:
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none bg-blue-200"
                />
              </label>
            </div>
          </div>
        </div>
        <button
          onClick={()=>editHandler()}
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md mt-3"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
