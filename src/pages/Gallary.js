import React from "react";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import Spinner from "../components/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
const Gallary = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [formData, setFormData] = useState({ Category: "" });
  const [catogoryList, setCatogoryList] = useState();
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  function changeHandler(event) {
    setFormData((pre) => ({ ...pre, [event.target.id]: event.target.value }));
    if (
      event.target.id === "Category" &&
      event.target.value !== "All" &&
      formData.Category
    ) {
      setSelectedCategory(JSON.parse(event.target.value));
    }
    if (event.target.id === "Category" && event.target.value === "All") {
      fetchProductData();
    }
    if (event.target.id === "Price") {
      setSelectedPriceRange(event.target.value);
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const cat = await axios.get(
          "https://backend-tub9.onrender.com/api/v1/product/getCategoryDetail"
        );
        setCatogoryList(cat.data.allCategory);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetch();
    return () => {};
  }, []);

  const categoryHandler = async (item) => {
    try {
      console.log("printing cat item ", item);
      const itemID = item._id;
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/product/getCategoryPageDetail",
        { itemID }
      );
      const item1 = response.data.data.selectedCategory.products;
      return item1;
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://backend-tub9.onrender.com/api/v1/product/getallproduct"
      );

      setOriginalPosts(res.data.data);
      setPosts(res.data.data);
    } catch (error) {
      console.log("error in gallary");
      toast.error(error.response.data.message);
      setPosts([]);
    }
    setLoading(false);
  }

  const applyFilters = async () => {
    let filteredPosts = [...originalPosts];

    if (selectedCategory !== "All") {
      filteredPosts = await categoryHandler(selectedCategory);
      console.log(filteredPosts, "logfnvdk");
    }

    if (selectedPriceRange !== "All") {
      const price = parseInt(selectedPriceRange);
      filteredPosts = filteredPosts.filter((post) => post.price <= price);
    }

    setPosts(filteredPosts);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedPriceRange, selectedCategory]);

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    const filteredPosts = originalPosts.filter((post) =>
      post.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(filteredPosts);
  }, [searchTerm, originalPosts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log("PRINTIJNNG LENFG", posts.length);

  return (
    <div className=" bg-gradient-to-br from-sky-200 to-white h-screen overflow-y-auto pt-[2rem] pb-[2rem]">
      <h1 className="font-bold text-xl xs:ml-[32%] xs1:ml-[37%] sm:ml-[45%]  mb-[2rem]">Product Gallery</h1>

      <div className="flex flex-row rounded-3xl border-2  justify-center xs:mx-[5%] sm:mx-[25%] mb-[3rem] py-[0.5rem] boder-2 border-black min-w-[280px]">
        <input
          onChange={handleSearchChange}
          className="w-[90%] bg-inherit text-black py-[0.3rem] border-none focus:outline-none min-w-[280px]"
          type="text"
          placeholder="Explore your passion: Search for your favorite art style or artist here..."
          
        ></input>
        <div className="pt-2 text-xl">
          <CiSearch />
        </div>
      </div>
      <div className="flex xs:flex-wrap sm:flex-nowrap  justify-between">
        <div className="my-[2rem] ml-[3rem]">
          <label
            for="category"
            className="mx-[1rem] font-poppins text-xl font-bold"
          >
            Select a Category:
          </label>
          <select
            id="Category"
            className="w-fit focus:outline-none rounded-md px-1 h-8"
            onChange={changeHandler}
          >
            <option>All</option>
            {catogoryList &&
              catogoryList.map((ele) => {
                return <option value={JSON.stringify(ele)}>{ele.name}</option>;
              })}
          </select>
        </div>

        <div className="my-[2rem] ml-[3rem] mr-[1rem] ">
          <label
            for="Price"
            className="mx-[1rem]  font-poppins text-xl font-bold"
          >
            Sort By Price :
          </label>
          <select
            id="Price"
            className="w-fit focus:outline-none rounded-md px-1 h-8"
            onChange={changeHandler}
          >
            <option className=" focus:outline-none w-[50rem] mx-[2rem] ">
              All
            </option>
            <option value="500">Below 500</option>;
            <option value="5000">Below 5000</option>;
            <option value="10000">Below 10000</option>;
            <option value="20000">Below 20000</option>;
          </select>
        </div>
      </div>

      <div className="">
        {loading ? (
          <Spinner />
        ) : posts.length > 0 ? (
          <div className="flex flex-row justify-center  item-center w-full h-[100vh] px-[2rem] flex-wrap gap-x-5 gap-y-9">
            {posts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Products item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <p className="font-semibold text-xl ml-[44%] mt-[10%]">
              No Product found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallary;
