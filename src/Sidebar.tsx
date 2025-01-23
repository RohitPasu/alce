const Sidebar = ({header, listItems}) => {
  return (
    <div className="w-64 bg-white h-full fixed left-0 top-0 shadow-lg font-mono">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{header}</h2>
        <nav>
          <ul>
            {listItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a 
                  href={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
