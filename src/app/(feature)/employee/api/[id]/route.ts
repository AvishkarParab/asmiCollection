import dbConnect from "@/lib/dbConnect";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { name, age, email, referredFrom, referralCode, isCommissionPaid } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Invalid employee ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          age,
          email,
          referredFrom,
          referralCode,
          isCommissionPaid,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return NextResponse.json({
        message: "Employee not found",
        status: 404,
        type: "not_found",
      });
    }

    return NextResponse.json({
      message: "Employee Updated Successfully!",
      data: updatedEmployee,
      status: 200,
      type: "success",
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { message: "Server Error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Invalid employee ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return NextResponse.json(
        { message: "Employee not found", status: 404, type: "not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Employee Deleted Successfully!",
      data: deletedEmployee,
      status: 200,
      type: "success",
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { message: "Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
