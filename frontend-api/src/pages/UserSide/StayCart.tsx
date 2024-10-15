import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStayCategories } from "../../redux/stayCategorySlice";
import { FaShoppingCart } from "react-icons/fa";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";

// Define types for your state
interface StayCategory {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface StayCartProps {
  categories: StayCategory[]; // Use the correct prop type here
  loading: boolean;
  error: string | null;
}

const StayCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ensure to select categories from the correct state slice
  const { stayCategories: categories = [], loading = false, error = null }: StayCartProps = useSelector((state: any) => state.stayCategory || {});

  const tickets = useSelector((state: any) => state.tickets); // Assuming tickets are stored in Redux
  const selectedDate = useSelector((state: any) => state.date); 

  const [stayCounts, setStayCounts] = useState<{ [key: string]: number }>({});
  const [currentStep, setCurrentStep] = useState(2);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<StayCategory | null>(null);

  useEffect(() => {
    dispatch(fetchStayCategories() as any);
  }, [dispatch]);

  // Log ticket and date information from Redux
  useEffect(() => {
    console.log("Tickets:", tickets);
    console.log("Selected Date:", selectedDate);
  }, [tickets, selectedDate]);

  const handleCountChange = (id: string, operation: "increment" | "decrement") => {
    setStayCounts((prevCounts) => {
      const currentCount = prevCounts[id] || 0;
      const newCount = operation === "increment" ? currentCount + 1 : Math.max(0, currentCount - 1);
      return { ...prevCounts, [id]: newCount };
    });
  };

  const calculateTotal = () => {
    return Object.keys(stayCounts).reduce((total, id) => {
      const category = categories.find((cat: StayCategory) => cat._id === id);
      return total + (category?.price || 0) * (stayCounts[id] || 0);
    }, 0);
  };

  const handleConfirm = () => {
    const totalStays = Object.values(stayCounts).reduce((sum, count) => sum + count, 0);

    if (totalStays === 0) {
      toast.error("Please select at least one stay.");
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/park-rules");
  };

  if (loading) return <p className="text-center">Loading stays, please wait...</p>;
  if (error) return <p className="text-center text-red-500">Error loading stay categories: {error}</p>;

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const openModal = (category: StayCategory) => {
    setSelectedCategory(category);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
      <div className="bg-gray-100 min-h-screen p-4 sm:p-8 mt-12">
        <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col justify-between h-auto lg:h-[31.7rem]">
            <div>
              <button className="text-blue-600 font-semibold mb-4 flex items-center">
                <FaShoppingCart className="mr-2" />
                Choose Your Stay
              </button>
              <h2 className="text-2xl font-bold mb-4">Choose Your Stay</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Select your accommodation for the perfect experience.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col h-auto lg:h-[31.7rem] overflow-y-auto">
            {categories.map((category: StayCategory) => (
              <div key={category._id} className="border border-gray-300 rounded-md p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover mr-4 rounded-md border-2 border-gray-300 p-2 mb-4"
                    />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">{category.name}</h4>
                      <p className="text-base sm:text-lg">₹{category.price.toFixed(2)}</p>
                      <p className="text-gray-500 text-sm mb-2">{category.description}</p>
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded-md shadow hover:bg-blue-600 transition duration-200"
                        onClick={() => openModal(category)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out"
                      onClick={() => handleCountChange(category._id, "decrement")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-8 sm:w-12 text-center border-t border-b border-gray-300 focus:outline-none"
                      value={stayCounts[category._id] || 0}
                      readOnly
                    />
                    <button
                      className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out"
                      onClick={() => handleCountChange(category._id, "increment")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <p className="text-base sm:text-lg font-bold">
                Total: ₹{calculateTotal().toFixed(2)}
              </p>
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition-colors duration-200 text-sm sm:text-base"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        ariaHideApp={false} // Add this for accessibility
      >
        {selectedCategory && (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedCategory.name}</h2>
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <p className="text-gray-700 mb-4">{selectedCategory.description}</p>
            <p className="text-lg font-bold">Price: ₹{selectedCategory.price.toFixed(2)}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );

};
export default StayCart;
