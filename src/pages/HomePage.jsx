import { useTheme } from "../context/Theme/ThemeContext";

function HomePage() {
  // return <div className="p-4 text-xl">Inventory Home</div>;
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Current Theme: {theme}</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Toggle Theme
      </button>
    </div>
  );
}
export default HomePage;
