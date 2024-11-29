// import { useState } from "react";
// import { useRouter } from "next/router";
// import { User } from "../types";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState<User>({
//     name: "",
//     family: "",
//     address: "",
//     postalCode: "",
//     phone: "",
//     email: "",
//     password: "",
//     orders: [],
//   });
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
//     users.push(formData);
//     localStorage.setItem("users", JSON.stringify(users));
//     alert("Registration successful!");
//     router.push("/login");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-blue-900">
//       <h1 className="text-2xl mb-6">Register</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="name"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="family"
//           >
//             Family Name
//           </label>
//           <input
//             type="text"
//             id="family"
//             name="family"
//             value={formData.family}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="address"
//           >
//             Address
//           </label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="postalCode"
//           >
//             Postal Code
//           </label>
//           <input
//             type="text"
//             id="postalCode"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="phone"
//           >
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     family: "",
//     address: "",
//     postalCode: "",
//     phone: "",
//     email: "",
//     password: "",
//   });
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:3000/register", formData);

//       if (res.status === 201) {
//         const users = JSON.parse(localStorage.getItem("users") || "[]");
//         users.push(formData);
//         localStorage.setItem("users", JSON.stringify(users));
//         alert("Registration successful!");
//         router.push("/login");
//       }
//     } catch (error: any) {
//       if (error.response) {
//         alert(error.response.data.error);
//       } else {
//         console.error("Registration error:", error);
//         alert("Registration failed");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-blue-900">
//       <h1 className="text-2xl mb-6">Register</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="name"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="family"
//           >
//             Family Name
//           </label>
//           <input
//             type="text"
//             id="family"
//             name="family"
//             value={formData.family}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="address"
//           >
//             Address
//           </label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="postalCode"
//           >
//             Postal Code
//           </label>
//           <input
//             type="text"
//             id="postalCode"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="phone"
//           >
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { register } from "../services/authService";
// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     family: "",
//     address: "",
//     postalCode: "",
//     phone: "",
//     email: "",
//     password: "",
//   });
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };
//   const handleSubmit = async (e:React.FormEvent) => {
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     users.push(formData);
//     localStorage.setItem("users", JSON.stringify(users));
//     try {
//       const response = await register(formData);
//       console.log("Registration response:", response);
//       alert(response.message);
//       router.push("/login");
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         alert(error.response.data.error);
//       } else {
//         console.error("Registration error:", error);
//         alert("Registration failed");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-blue-900 dark:text-white">
//       <h1 className="text-2xl mb-6">Register</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="name"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="family"
//           >
//             Family Name
//           </label>
//           <input
//             type="text"
//             id="family"
//             name="family"
//             value={formData.family}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="address"
//           >
//             Address
//           </label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="postalCode"
//           >
//             Postal Code
//           </label>
//           <input
//             type="text"
//             id="postalCode"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="phone"
//           >
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { register } from "../services/authService";
// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     family: "",
//     address: "",
//     postalCode: "",
//     phone: "",
//     email: "",
//     password: "",
//   });
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };
//   const handleSubmit = async (e:React.FormEvent) => {
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     users.push(formData);
//     localStorage.setItem("users", JSON.stringify(users));
//     try {
//       const response = await register(formData);
//       console.log("Registration response:", response);
//       alert(response.message);
//       router.push("/login");
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         alert(error.response.data.error);
//       } else {
//         console.error("Registration error:", error);
//         alert("Registration failed");
//       }
//     }
//   };
import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "../services/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make the registration API call
      const response = await register(formData);

      // Store the new user in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      alert(response.message); // This ensures we display the backend's success message
      router.push("/login");
    } catch (error: any) {
      if (error.message) {
        alert(error.message);
      } else {
        alert("Registration failed!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-blue-900 dark:text-white">
      <h1 className="text-2xl mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        
        
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Avatar
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
