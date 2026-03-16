import React, { useState } from "react";
import "./Add.css";

export default function Add() {

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("file", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    try {

      const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      console.log("Server Response:", result);

      alert("Product added successfully");

      // Reset form
      setData({
        name: "",
        description: "",
        price: "",
        category: ""
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>

          <input
            type="file"
            onChange={onImageChange}
            required
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="4"
            placeholder="Write content here"
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="">Select</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="₹20"
              value={data.price}
              onChange={onChangeHandler}
              required
            />
          </div>

        </div>

        <button type="submit" className="add-btn">
          ADD ITEM
        </button>

      </form>
    </div>
  );
}