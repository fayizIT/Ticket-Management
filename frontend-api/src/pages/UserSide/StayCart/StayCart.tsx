import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementStay, fetchStayCategories, incrementStay } from "../../../redux/stayCategorySlice";
import Timeline from "../../../components/Timeline";
import Modal from "react-modal";
import StayCartLeft from "./StayCartLeft"; 
import StayCartRight from "./StayCartRight"; 
import { useNavigate } from "react-router-dom";


const StayCart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stayCategories, loading, error, tickets, total } = useSelector(
    (state: any) => state.stayCategory
  );

  const [currentStep, setCurrentStep] = useState(2);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    _id: string;
    image: string;
    name: string;
    price: number;
    description: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchStayCategories() as any);
  }, [dispatch]);

  const handleCountChange = (id: string, operation: "increment" | "decrement") => {
    if (operation === "increment") {
      dispatch(incrementStay(id));
    } else {
      dispatch(decrementStay(id));
    }
  };

  const handleConfirm = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/park-rules");
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const openModal = (category: { _id: string; image: string; name: string; price: number; description: string }) => {
    setSelectedCategory(category);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCategory(null);
  };

  if (loading) return <p className="text-center">Loading stays, please wait...</p>;
  if (error) return <p className="text-center text-red-500">Error loading stay categories: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
      <div className="bg-gray-100 min-h-screen p-4 sm:p-8 mt-12">
        <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8">
          <StayCartLeft />
          <StayCartRight 
            stayCategories={stayCategories} 
            tickets={tickets} 
            total={total} 
            handleCountChange={handleCountChange} 
            openModal={openModal} 
            handleConfirm={handleConfirm} 
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        ariaHideApp={false}
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
