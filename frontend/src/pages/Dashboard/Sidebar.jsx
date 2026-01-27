const Sidebar = ({ active, setActive }) => {
  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "users", label: "Users" },
    { key: "products", label: "Products" }
  ];

  return (
    <aside className="w-56 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActive(item.key)}
          className={`block w-full text-left px-3 py-2 rounded mb-2
            ${active === item.key ? "bg-gray-800" : "text-gray-300 hover:text-white"}`}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
