"use client";
import { useState } from "react";
import React from "react"; // Import React
import RegisterForm from "../component/registerForm/registerForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Register: React.FC = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // get vlaue target on change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );
      if (response.status === 201) {
        console.log("Registration successful");
        // Reset the form data
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("login");
        setError("");
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Account
            </h1>
            <RegisterForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              error={error}
            />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
