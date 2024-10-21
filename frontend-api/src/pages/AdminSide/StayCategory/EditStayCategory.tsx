import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StayCategoryService } from "../../../services/StayCategoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const EditStayCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await StayCategoryService.fetchById(id!);
        setName(category.name);
        setDescription(category.description);
        setPrice(category.price);
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Failed to fetch stay category. Please try again.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const updatedCategory = {
          name,
          description,
          price,
        };
        await StayCategoryService.update(id!, updatedCategory);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Stay category updated successfully!",
          confirmButtonText: "OK",
        });

        navigate("/admin/stay-category");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update stay category. Please try again.");
      }
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Edit Stay Category</h2>
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
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            required
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditStayCategory;
