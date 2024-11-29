// // import { useState } from "react";

// // const Sidebar = ({ onFilter }: any) => {
// //   const [category, setCategory] = useState<string>("All");
// //   const [price, setPrice] = useState<[number, number]>([10, 5000]);

// //   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setCategory(e.target.value);
// //   };

// //   const handlePriceChange = (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     index: number
// //   ) => {
// //     const newPrice = [...price];
// //     newPrice[index] = parseInt(e.target.value, 10);
// //     setPrice(newPrice as [number, number]);
// //   };

// //   return (
// //     <div className="p-4 w-64 bg-gray-100">
// //       <h2 className="text-xl font-bold mb-4">Filters</h2>

// //       <div className="mb-4">
// //         {" "}
// //         <h3 className="text-lg font-semibold">Category</h3>{" "}
// //         {["All", "Clothes", "Electronics", "Shoes", "Miscellaneous"].map(
// //           (categoryName) => (
// //             <div key={categoryName}>
// //               {" "}
// //               <input
// //                 type="radio"
// //                 id={categoryName}
// //                 name="category"
// //                 value={categoryName}
// //                 checked={category === categoryName}
// //                 onChange={handleCategoryChange}
// //               />{" "}
// //               <label htmlFor={categoryName} className="ml-2">
// //                 {categoryName}
// //               </label>{" "}
// //             </div>
// //           )
// //         )}{" "}
// //       </div>

// //       <div className="mb-4">
// //         <h3 className="text-lg font-semibold">Price</h3>
// //         <label>
// //           Min: $
// //           <input
// //             type="number"
// //             value={price[0]}
// //             min={10}
// //             max={5000}
// //             onChange={(e) => handlePriceChange(e, 0)}
// //             className="ml-2 w-20"
// //           />
// //         </label>
// //         <label className="ml-4">
// //           Max: $
// //           <input
// //             type="number"
// //             value={price[1]}
// //             min={10}
// //             max={5000}
// //             onChange={(e) => handlePriceChange(e, 1)}
// //             className="ml-2 w-20"
// //           />
// //         </label>
// //       </div>

// //       <button
// //         onClick={() => onFilter({ category, price })}
// //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //       >
// //         Apply Filters
// //       </button>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import { useState, useEffect } from "react";
// import { fetchCategories } from "../services/productService";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// const Sidebar = ({ onFilter }: any) => {
//   const [categories, setCategories] = useState<{ id: number; name: string }[]>(
//     []
//   );
//   const [selectedCategory, setSelectedCategory] = useState<number>(0); // Default to "All"
//   const [price, setPrice] = useState<[number, number]>([10, 500]);

//   useEffect(() => {
//     fetchCategories().then((data) => {
//       setCategories([{ id: 0, name: "All" }, ...data]);
//     });
//   }, []);

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedCategory(parseInt(e.target.value, 10));
//   };

//   const handlePriceChange = (value: number | number[]) => {
//     if (Array.isArray(value)) {
//       setPrice([value[0], value[1]] as [number, number]);
//     }
//   };

//   return (
//     <div className="p-4 w-96 bg-gray-100 dark:bg-blue-900">
//       <h2 className="text-xl font-bold mb-4">Filters</h2>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Category</h3>
//         {categories.map((category) => (
//           <div key={category.id}>
//             <input
//               type="radio"
//               id={category.name}
//               name="category"
//               value={category.id}
//               checked={selectedCategory === category.id}
//               onChange={handleCategoryChange}
//             />
//             <label htmlFor={category.name} className="ml-2">
//               {category.name}
//             </label>
//           </div>
//         ))}
//       </div>
//       <div className="mb-4">
//         {" "}
//         <h3 className="text-lg font-semibold">Price</h3>{" "}
//         <Slider
//           range
//           min={10}
//           max={500}
//           defaultValue={price}
//           onChange={handlePriceChange}
//           className="mb-4"
//         />{" "}
//         <div className="flex justify-between">
//           {" "}
//           <span>${price[0]}</span> <span>${price[1]}</span>{" "}
//         </div>{" "}
//       </div>

//       <button
//         onClick={() => onFilter({ categoryId: selectedCategory, price })}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Apply Filters
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

// import { useState, useEffect } from 'react';
// import { fetchCategories } from '../services/productService';

// const Sidebar = ({ onFilter }: any) => {
//   const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number>(0);
//   const [price, setPrice] = useState<[number, number]>([10, 5000]);

//   useEffect(() => {
//     fetchCategories().then((data) => {
//       setCategories([{ id: 0, name: 'All' }, ...data]);
//     });
//   }, []);

//   const handleCategoryChange = (categoryId: number) => {
//     setSelectedCategory(categoryId);
//     onFilter({ categoryId, price });
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const newPrice = [...price];
//     newPrice[index] = parseInt(e.target.value, 10);
//     setPrice(newPrice as [number, number]);
//     onFilter({ categoryId: selectedCategory, price: newPrice as [number, number] });
//   };

//   return (
//     <div className="p-4 w-64 bg-gray-100">
//       <h2 className="text-xl font-bold mb-4">Filters</h2>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Category</h3>
//         {categories.map((category) => (
//           <div
//             key={category.id}
//             className={`p-2 cursor-pointer ${selectedCategory === category.id ? 'bg-blue-500 text-white border-b-2 border-blue-700' : 'bg-white text-black'}`}
//             onClick={() => handleCategoryChange(category.id)}
//           >
//             {category.name}
//           </div>
//         ))}
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Price</h3>
//         <div>
//           <label>
//             Min: $
//             <input
//               type="number"
//               value={price[0]}
//               min={10}
//               max={5000}
//               onChange={(e) => handlePriceChange(e, 0)}
//               className="ml-2 w-20"
//             />
//           </label>
//           <label className="ml-4">
//             Max: $
//             <input
//               type="number"
//               value={price[1]}
//               min={10}
//               max={5000}
//               onChange={(e) => handlePriceChange(e, 1)}
//               className="ml-2 w-20"
//             />
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

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
