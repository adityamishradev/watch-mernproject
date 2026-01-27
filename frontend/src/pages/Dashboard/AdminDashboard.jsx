import { useState, useEffect } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Dashboard/Users";
import Products from "../Dashboard/Products";
import AddProduct from "../Dashboard/AddProduct";
import API from "../../services/api";

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/products');
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/users');
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchProducts();
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar active={active} setActive={setActive} />

      <main className="flex-1 p-6">
        {active === "dashboard" && (
          <Dashboard 
            stats={stats} 
            loading={loading}
          />
        )}

        {active === "users" && (
          <Users 
            users={users} 
            setUsers={setUsers}
            fetchUsers={fetchUsers}
            loading={loading}
          />
        )}

        {active === "products" && (
          <Products 
            products={products} 
            setProducts={setProducts}
            fetchProducts={fetchProducts}
            loading={loading}
            setActive={setActive}
          />
        )}

        {active === "add" && (
          <AddProduct 
            setProducts={setProducts} 
            setActive={setActive}
            fetchProducts={fetchProducts}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
