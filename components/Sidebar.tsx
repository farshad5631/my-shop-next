import { useState, useEffect } from "react";
import { fetchCategories } from "../services/productService";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Sidebar = ({ onFilter }: any) => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [price, setPrice] = useState<[number, number]>([0, 400]);

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories([{ id: 0, name: "All" }, ...data]);
    });
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    onFilter({ categoryId, price });
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice([value[0], value[1]]);
      onFilter({ categoryId: selectedCategory, price: [value[0], value[1]] });
    }
  };

  return (
    <div className="p-4 w-1/5 bg-gray-100 dark:bg-slate-800">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Category</h3>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-2 cursor-pointer ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white border-b-2 border-blue-700"
                : "bg-white text-black"
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Price</h3>
        <Slider
          range
          min={0}
          max={400}
          defaultValue={price}
          onChange={handlePriceChange}
          className="mb-4"
        />
        <div className="flex justify-between">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
