"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React, { useState } from "react";
import LoginForm from "../component/loginForm/loginForm";
import Link from "next/link";
import axios from "axios";

const Login: React.FC = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // get vlaue target on change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // submit form to login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", formData);

      if (res.status === 200) {
        const token = res.data.token;

        // set token in cookie
        Cookies.set("token", token, {
          expires: 1,
          secure: true,
        });
        router.push("/profile");
        setError("");
      }
    } catch (error) {
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
              Login Account
            </h1>
            <LoginForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              error={error}
            />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
