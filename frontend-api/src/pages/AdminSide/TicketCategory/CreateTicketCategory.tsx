import React, { useState } from "react";
import { TicketCategoryService } from "../../../services/TicketCategoryService";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";

const CreateTicketCategory: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await TicketCategoryService.create(formData);
      setIsModalOpen(true);
      setFormData({
        name: "",
        description: "",
        price: 0,
      });

      setTimeout(() => navigate("/admin/ticket-Category"), 2000);
    } catch (error) {
      console.error("Failed to add Age Category:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/admin/ticket-Category");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Add Age Category</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Age Category
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Success"
        message="Age Category added successfully!"
      />
    </div>
  );
};

export default CreateTicketCategory;
