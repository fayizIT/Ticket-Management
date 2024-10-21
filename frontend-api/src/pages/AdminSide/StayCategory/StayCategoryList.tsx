import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { StayCategoryService } from "../../../services/StayCategoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDialog from "../../../components/ConfirmDialog";

interface StayCategory {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const StayCategoryList: React.FC = () => {
  const [stayCategories, setStayCategories] = useState<StayCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStayCategories = async () => {
      try {
        const data = await StayCategoryService.fetchAll();
        setStayCategories(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch stay categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStayCategories();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/editStayCategory/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      await StayCategoryService.delete(selectedCategoryId);
      setStayCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== selectedCategoryId)
      );
      toast.success("Category deleted successfully!");
      setSelectedCategoryId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const openDialog = (id: string) => {
    setSelectedCategoryId(id);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Stay Categories</h2>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/admin/addStayCategory")}
        >
          Create Category
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Actions</th>
            <th className="border border-gray-300 p-4">Name</th>
            <th className="border border-gray-300 p-4">Description</th>
            <th className="border border-gray-300 p-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {stayCategories.map((category) => (
            <tr key={category._id}>
              <td className="border border-gray-300 p-4 text-center">
                <button
                  onClick={() => handleEdit(category._id)}
                  className="text-yellow-500 hover:text-yellow-700 mx-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => openDialog(category._id)}
                  className="text-red-500 hover:text-red-700 mx-2"
                >
                  <FaTrash />
                </button>
              </td>
              <td className="border border-gray-300 p-4">{category.name}</td>
              <td className="border border-gray-300 p-4">
                {category.description}
              </td>
              <td className="border border-gray-300 p-4">{category.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Stay Category"
        message="Are you sure you want to delete this stay category? This action cannot be undone."
      />
    </div>
  );
};

export default StayCategoryList;
