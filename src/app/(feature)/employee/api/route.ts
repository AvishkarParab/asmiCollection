import dbConnect from "@/lib/dbConnect";
import Employee from "@/models/employee";
import { IEmployeeInfo } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const employees = await Employee.find()
      .populate("referredFrom")
      .lean<IEmployeeInfo[]>();
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
