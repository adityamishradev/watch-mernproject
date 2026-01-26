const Sidebar = ({ active, setActive }) => {
  const menu = ["dashboard", "users", "products", "add"];

  return (
    <aside className="w-56 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      {menu.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`block w-full text-left px-3 py-2 rounded mb-2
            ${active === item ? "bg-gray-800" : "text-gray-300 hover:text-white"}`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
