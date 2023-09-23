import connectMongoDB from "@/libs/mongodb";
import User from "../../../model/register";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { serialize } from "cookie";
// import { setCookie } from "next-iron-session"; // Import the appropriate cookie library

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export async function POST(request) {
  await connectMongoDB();
  const { email, password } = await request.json();
  try {
    // check if email or password is correct
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide both email and password" },
        { status: 400 } // Use 400 for bad requests
      );
    }

    const user = await User.findOne({ email });

    // check if user exist or the check the password user the same password hashing in database
    if (!user || !(await user.correctPassword(password, user.password))) {
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 401 }
      );
    }

    //create token 
    const token = signToken(user._id);

    return NextResponse.json(
      { message: "Success login user", token },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}


// this method protect to get data user when login 
export async function GET(request) {
  // Get the token from the Authorization header and cheak
  const authorizationHeader = request.headers.get("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }


  // decoded token to get id user and check
  const token = authorizationHeader.replace("Bearer ", "");
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);


  //cheak decoded inforamtion
  if (!decodedToken) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }

  const userId = decodedToken.id;

  const user = await User.findById(userId); // Assuming you have a User mode

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "User data retrieved successfully", user },
    { status: 200 }
  );
}
