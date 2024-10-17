import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../../public/assets/notFoundImage.jpg";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src={notFoundImage}
        alt="Page Not Found"
        className="mb-4 w-1/2 max-w-sm"
      />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
