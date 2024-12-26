import React, { useEffect, useState } from "react";
import axios from "axios";

const CalorieList = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/entries");
        setEntries(response.data);
      } catch (err) {
        setError("Error fetching entries. Please try again later.");
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
        Calorie Tracker Entries
      </h1>
      {error && (
        <div className="p-4 mb-6 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}
      {entries.length === 0 && !error ? (
        <p className="text-center text-lg text-gray-500">
          No entries found. Start adding some!
        </p>
      ) : (
        <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg">
          <table className="w-full border-collapse border-spacing-0">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center">
                  Food Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center">
                  Calories
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {entries.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-800 text-sm font-medium text-center">
                    {entry.foodName}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-800 text-sm text-center">
                    {entry.calories} Cal
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-600 text-sm text-center">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalorieList;
