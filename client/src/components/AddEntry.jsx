import React, { useState } from "react";
import axios from "axios";

const AddEntry = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    calories: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/entries",
        formData
      );
      setMessage(response.data.message);
      setFormData({ foodName: "", calories: "", date: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding entry");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Calorie Entry</h1>
      {message && (
        <div
          className={`p-2 mb-4 text-center rounded ${
            message.includes("successfully") ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            htmlFor="foodName"
            className="block text-gray-700 font-bold mb-2"
          >
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter food name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="calories"
            className="block text-gray-700 font-bold mb-2"
          >
            Calories
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter calorie count"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Date (Optional)
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default AddEntry;
