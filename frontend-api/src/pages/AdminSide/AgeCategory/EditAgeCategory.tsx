import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AgeCategoryService } from '../../../services/AgeCategoryService';
import Swal from 'sweetalert2';

const EditAgeCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await AgeCategoryService.getById(id as string);
        setFormData(category);
      } catch (error) {
        console.error('Failed to fetch age category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price'  ? Number(value) : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show SweetAlert for confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      // If confirmed, submit the form
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await AgeCategoryService.update(id as string, { ...formData, id: id as string });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Age category updated successfully!',
        confirmButtonText: 'OK',
      });
      navigate('/admin/age-categories');
    } catch (error) {
      console.error('Failed to update age category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update age category. Please try again.',
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Age Category</h2>
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

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditAgeCategory;
