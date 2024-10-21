import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StayCategoryService } from "../../../services/StayCategoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateStayCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (price === undefined) {
        throw new Error("Price is required");
      }
      const newCategory = { name, description, price };
      await StayCategoryService.create(newCategory);
      toast.success("Stay category created successfully!");

      setTimeout(() => {
        navigate("/admin/stay-category");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create stay category. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Stay Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price === undefined ? "" : price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            required
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateStayCategory;
