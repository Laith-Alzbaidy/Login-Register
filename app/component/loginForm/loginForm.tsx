// LoginForm.tsx
"use client";
import React from "react";
import Input from "../input/input";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  error,
}) => {
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
      {/* error handle input */}
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium"></span>
          {error}
        </div>
      )}
      {/* email field */}
      <Input
        label="Your email"
        type="email"
        id="email"
        name="email"
        placeholder="name@company.com"
        value={formData.email}
        onChange={onInputChange}
      />
      {/* Password field */}
      <Input
        label="Password"
        type="password"
        id="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={onInputChange}
      />
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Login Account
      </button>
    </form>
  );
};

export default LoginForm;
