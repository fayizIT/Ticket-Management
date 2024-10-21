import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../../services/DashBoardService";

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error: any) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  return (
    <div className="flex-1 p-10 bg-gray-100">
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-blue-600">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-lg text-center text-gray-700">
            Here you can manage users, view reports, and perform administrative
            tasks.
          </p>


          {dashboardData && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800">
                Admin Dashboard Graph Data Showing Here...
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg">
                {JSON.stringify(dashboardData, null, 2)}
              </pre>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Go to User Management
            </button>
            <button className="px-4 py-2 ml-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
