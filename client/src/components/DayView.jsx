import React, { useState } from "react";
import axios from "axios";

const DayView = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  const handleFetchEntries = async () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/entries/:${selectedDate}`
      );
      setEntries(response.data);
      setError("");
    } catch (err) {
      setEntries([]);
      setError(
        err.response?.data?.message ||
          "Error fetching entries. Please try again."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        View Entries by Date
      </h1>
      <div className="flex items-center justify-center mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleFetchEntries}
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Fetch Entries
        </button>
      </div>
      {error && (
        <div className="p-2 mb-4 bg-red-200 text-center rounded">{error}</div>
      )}
      {entries.length === 0 && !error ? (
        <p className="text-center text-gray-600">No entries to display.</p>
      ) : (
        <table className="w-full bg-white border border-gray-200 rounded shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-center">Food Name</th>
              <th className="px-4 py-2 border-b text-center">Calories</th>
              <th className="px-4 py-2 border-b text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-center">
                  {entry.foodName}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {entry.calories} Cal
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DayView;
