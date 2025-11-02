import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({
      message: "Invalid Data",
      status: 400,
      type: "bad request",
    });
  }

  await dbConnect();

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    return NextResponse.json({
      message: "User not found",
      status: 400,
      type: "bad request",
    });
  }

  return NextResponse.json({
    message: "User registered Successfully!",
    data: user,
    status: 200,
    type: "success",
  });
}
