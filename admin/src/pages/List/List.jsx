import React, { useEffect, useState } from "react";
import "./List.css";

export default function List() {

  const [list, setList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/product/${id}`, {
        method: "DELETE"
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Products List</p>

      <div className="list-table">

        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item) => {
          return (
            <div className="list-table-format" key={item.id}>
              <img
                src={item.image_url}
                alt={item.name}
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p
                onClick={() => removeProduct(item.id)}
                className="cursor"
                style={{ color: "red", fontWeight: "bold" }}
              >
                X
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
}