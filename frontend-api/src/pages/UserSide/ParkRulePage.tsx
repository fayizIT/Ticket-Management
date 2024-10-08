import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "../../components/Timeline";

const ParkRulesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(2);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleConfirm = () => {
    // Increment the current step to mark it as completed and set it to green
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/");
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Timeline */}
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="flex flex-col md:flex-row justify-center items-start p-8 space-y-6 md:space-y-0 md:space-x-6 mt-12 bg-gray-50">
        {/* Left Side - Park Rules & Guides */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
          <h2 className="text-3xl font-bold mb-4">Park Rules & Guides</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            To ensure your safety within our park, we kindly ask all guests to adhere to the dress code and familiarize themselves with the park's do's and don'ts.
          </p>
          <div className="flex justify-center items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Park illustration"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Collapsible Sections */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
          <h3 className="text-2xl font-bold mb-4">More Information</h3>

          {/* Dress Code Of Fun Section */}
          <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
            <button
              className="w-full text-left text-lg font-semibold text-blue-700 flex justify-between items-center"
              onClick={() => toggleSection("dressCode")}
            >
              Dress Code Of Fun
              <span>{activeSection === "dressCode" ? "-" : "+"}</span>
            </button>
            {activeSection === "dressCode" && (
              <div className="mt-2 text-gray-600 text-sm">
                <p>
                  Guests are expected to wear comfortable, family-friendly attire. No offensive slogans or images are allowed on clothing.
                </p>
              </div>
            )}
          </div>

          {/* Other Sections (Similar to Dress Code) */}
          {/* Special Services Section */}
          <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
            <button
              className="w-full text-left text-lg font-semibold text-blue-700 flex justify-between items-center"
              onClick={() => toggleSection("specialServices")}
            >
              Special Services
              <span>{activeSection === "specialServices" ? "-" : "+"}</span>
            </button>
            {activeSection === "specialServices" && (
              <div className="mt-2 text-gray-600 text-sm">
                <p>
                  Wheelchairs & Prams are available for Sr. Citizens and Toddlers.
                </p>
              </div>
            )}
          </div>

          {/* Terms & Conditions Section */}
          <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
            <button
              className="w-full text-left text-lg font-semibold text-blue-700 flex justify-between items-center"
              onClick={() => toggleSection("terms")}
            >
              Terms & Conditions
              <span>{activeSection === "terms" ? "-" : "+"}</span>
            </button>
            {activeSection === "terms" && (
              <div className="mt-2 text-gray-600 text-sm">
                <ul className="list-disc list-inside">
                  <li>To ensure the safety of the guests, height and weight restrictions are applicable for certain rides.</li>
                  <li>Entry is restricted to one person per ticket, valid only for a date and specified time.</li>
                  <li>Tickets are non-transferable.</li>
                  <li>Foods from outside and alcoholic drinks are not allowed inside the park.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Locker Information Section */}
          <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
            <button
              className="w-full text-left text-lg font-semibold text-blue-700 flex justify-between items-center"
              onClick={() => toggleSection("lockerInfo")}
            >
              Locker Information
              <span>{activeSection === "lockerInfo" ? "-" : "+"}</span>
            </button>
            {activeSection === "lockerInfo" && (
              <div className="mt-2 text-gray-600 text-sm">
                <p>
                  Lockers are available for rent near the park entrance. Please secure your belongings for the duration of your visit.
                </p>
              </div>
            )}
          </div>

          {/* Agree & Proceed Button */}
          <button
            className="mt-6 bg-blue-700 text-white py-3 px-6 rounded-full w-full hover:bg-blue-800"
            onClick={handleConfirm}
          >
            Agree & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkRulesPage;
