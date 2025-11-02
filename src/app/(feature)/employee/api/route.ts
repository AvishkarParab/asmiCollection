import dbConnect from "@/lib/dbConnect";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const employees = await Employee.find().populate("referredFrom").lean();
    return NextResponse.json({
      message: "Employees Retrived Successfully!",
      data: employees,
      status: 200,
      type: "success",
    });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}
