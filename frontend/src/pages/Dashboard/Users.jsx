import API from "../../services/api";

const Users = ({ users, setUsers, fetchUsers, loading }) => {
  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const res = await API.delete(`/admin/users/${id}`);
      if (res.data.success) {
        setUsers(users.filter((user) => user._id !== id));
        alert('User deleted successfully');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Users</h2>
        <button 
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-300">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3 text-gray-300">Name</th>
                <th className="text-left p-3 text-gray-300">Email</th>
                <th className="text-left p-3 text-gray-300">Joined</th>
                <th className="text-center p-3 text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3 text-white">{user.name}</td>
                  <td className="p-3 text-gray-300">{user.email}</td>
                  <td className="p-3 text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
