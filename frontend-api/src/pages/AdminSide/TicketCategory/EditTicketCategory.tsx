import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TicketCategoryService } from "../../../services/TicketCategoryService";
import Swal from "sweetalert2";

const EditTicketCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await TicketCategoryService.getById(id as string);
        setFormData(category);
      } catch (error) {
        console.error("Failed to fetch Ticket  category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await TicketCategoryService.update(id as string, {
        ...formData,
        id: id as string,
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Ticket  category updated successfully!",
        confirmButtonText: "OK",
      });
      navigate("/admin/ticket-Category");
    } catch (error) {
      console.error("Failed to update Ticket  category:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update Ticket  category. Please try again.",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Ticket category</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
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

export default EditTicketCategory;
