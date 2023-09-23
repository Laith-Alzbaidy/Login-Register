import connectMongoDB from "@/libs/mongodb";
import User from "../../../model/register";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// function to create token 
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export async function POST(request) {
  try {
    await connectMongoDB();

    const { email, password, confirmPassword } = await request.json();

    //cheak the user  if  found in database
    const existingUser = await User.findOne({ email });
    console.log(email, password, confirmPassword);


    //handle warning fields
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "email and password required" },
        { status: 404 }
      );
    }
    //handle warning fields
    if (existingUser) {
      return NextResponse.json(
        { message: "email is already exist" },
        { status: 404 }
      );
    }
    //handle warning fields
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "password is not match" },
        { status: 404 }
      );
    }
    const user = await User.create({ email, password, confirmPassword });
  

    //create token and set token in cookie
    const token = signToken(user._id);
    return NextResponse.json(
      { message: "User Created", data: { user, token } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
