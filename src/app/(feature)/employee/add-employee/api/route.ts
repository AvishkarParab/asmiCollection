import mongoose from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Employee from "@/models/employee";

export async function POST(request: Request) {
  const { name, age, email, referredFrom, referralCode, isCommissionPaid } =
    await request.json();

  if (!name || !age || !email || !isCommissionPaid) {
    return NextResponse.json({
      message: "Invalid Data",
      status: 400,
      type: "bad request",
    });
  }

  await dbConnect();

  const employee = await Employee.create({
    name,
    age,
    email,
    referredFrom: new mongoose.Types.ObjectId(referredFrom),
    referralCode,
    isCommissionPaid,
  });

  return NextResponse.json({
    message: "Employee Added Successfully!",
    data: employee,
    status: 200,
    type: "success",
  });
}
