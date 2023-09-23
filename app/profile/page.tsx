"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

const Profile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});

  // get data user via token
  const getDataUser = async () => {
    const token = Cookies.get("token");
    try {
      // the token as a bearer token
      const response = await axios.get("http://localhost:3000/api/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const LogOut = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className="bg-black-100 h-screen flex items-center justify-center">
      <div className="bg-blue-100 p-4 flex flex-col items-center justify-center w-96 h-64">
        <div className="text-2xl font-bold">Hello</div>
        <div className="text-lg">{user.email}</div>
        <button
          onClick={LogOut}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mt-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
