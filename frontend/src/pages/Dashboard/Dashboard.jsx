const Dashboard = ({ stats, loading }) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-300 text-sm font-medium">Total Users</h3>
          <span className="block text-3xl font-bold mt-2 text-white">
            {loading ? "..." : stats.totalUsers}
          </span>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-300 text-sm font-medium">Total Products</h3>
          <span className="block text-3xl font-bold mt-2 text-white">
            {loading ? "..." : stats.totalProducts}
          </span>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-300 text-sm font-medium">Revenue</h3>
          <span className="block text-3xl font-bold mt-2 text-white">
            ₹0
          </span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
