import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AgeCategoryService } from '../../services/AgeCategoryService';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import ConfirmDialog from '../../components/ConfirmDialog'; 

interface AgeCategory {
  _id: string; 
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
}

const AgeCategoriesList: React.FC = () => {
  const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // State for confirmation dialog
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgeCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/age-categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch age categories');
        }
        const data = await response.json();
        console.log(data);
        setAgeCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgeCategories();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/editAgeCategory/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      await AgeCategoryService.delete(selectedCategoryId);
      setAgeCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== selectedCategoryId)
      );
      toast.success("Category deleted successfully!");
      setSelectedCategoryId(null);  // Reset the selected category after deletion
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setIsDialogOpen(false);  // Close the dialog after action
    }
  };

  const openDialog = (id: string) => {
    setSelectedCategoryId(id);
    setIsDialogOpen(true);  // Open the dialog when user clicks delete
  };

  // Loading Spinner
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
      <h2 className="text-2xl font-bold mb-4">Age Categories</h2>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate('/admin/addAgeCategory')}
        >
          Create Category
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Name</th>
            <th className="border border-gray-300 p-4">Description</th>
            <th className="border border-gray-300 p-4">Price</th>
            <th className="border border-gray-300 p-4">Discounted Price</th>
            <th className="border border-gray-300 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ageCategories.map((category) => (
            <tr key={category._id}>
              <td className="border border-gray-300 p-4">{category.name}</td>
              <td className="border border-gray-300 p-4">{category.description}</td>
              <td className="border border-gray-300 p-4">{category.price}</td>
              <td className="border border-gray-300 p-4">{category.discountedPrice}</td>
              <td className="border border-gray-300 p-4 text-center">
                <button 
                  onClick={() => handleEdit(category._id)}
                  className="text-yellow-500 hover:text-yellow-700 mx-2"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => openDialog(category._id)} // Open dialog on delete
                  className="text-red-500 hover:text-red-700 mx-2"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Age Category"
        message="Are you sure you want to delete this age category? This action cannot be undone."
      />
    </div>
  );
};

export default AgeCategoriesList;
