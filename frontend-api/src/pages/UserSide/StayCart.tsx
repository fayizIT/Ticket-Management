import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStayCategories } from "../../redux/stayCategorySlice"; // Adjust path as necessary
import { FaShoppingCart } from "react-icons/fa";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StayCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Provide default values in case state is initially undefined
  const {
    categories = [],
    loading = false,
    error = null,
  } = useSelector((state: any) => state.stayCategory || {});

  const [stayCounts, setStayCounts] = useState<{ [key: string]: number }>({});
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
  dispatch(fetchStayCategories() as any);
       // Ensure result is set to an empty array if undefined
  }, [dispatch]);


  useEffect(() => {
    console.log("Stay Categories in Redux:", categories);
  }, [categories]);

  const handleCountChange = (
    id: string,
    operation: "increment" | "decrement"
  ) => {
    setStayCounts((prevCounts) => {
      const currentCount = prevCounts[id] || 0;
      const newCount =
        operation === "increment"
          ? currentCount + 1
          : Math.max(0, currentCount - 1);
      return { ...prevCounts, [id]: newCount };
    });
  };

  const calculateTotal = () => {
    return Object.keys(stayCounts).reduce((total, id) => {
      const category = categories.find((cat:any) => cat._id === id);
      return total + (category?.price || 0) * (stayCounts[id] || 0);
    }, 0);
  };

  const handleConfirm = () => {
    const totalStays = Object.values(stayCounts).reduce(
      (sum, count) => sum + count,
      0
    );

    if (totalStays === 0) {
      toast.error("Please select at least one stay.");
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/park-rules");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading stay categories: {error}</p>;

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
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
            {categories.map((category:any) => (
              <div
                key={category._id}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex items-center">
                  <FaShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-4 text-gray-500" />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">
                      {category.name}
                    </h4>
                    <p className="text-base sm:text-lg">
                      ₹{category.price.toFixed(2)}
                    </p>
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
            ))}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-base sm:text-lg font-bold">
                  Total: ₹{calculateTotal().toFixed(2)}
                </p>
              </div>
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
    </div>
  );
};

export default StayCart;
