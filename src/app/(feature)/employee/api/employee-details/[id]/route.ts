import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Employee from "@/models/employee";

interface EmployeeInfo {
  _id: string;
  name: string;
  age: string;
  email: string;
  reportsTo: string;
}

interface EmployeeHierarchy extends EmployeeInfo {
  reportees: EmployeeHierarchy[];
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();

    async function getEmployeeHierarchy(
      empId: string
    ): Promise<EmployeeHierarchy | null> {
      const employee = await Employee.findById(empId).lean<EmployeeInfo>();
      if (!employee) return null;

      const reportees = await Employee.find({
        referredFrom: empId,
      }).lean<EmployeeInfo[]>();

      return {
        ...employee,
        reportees: (await Promise.all(
          reportees.map((r) => getEmployeeHierarchy(r._id.toString()))
        )) as EmployeeHierarchy[],
      };
    }

    const hierarchy = await getEmployeeHierarchy(id);

    if (!hierarchy) {
      return NextResponse.json({
        message: "Employee not found",
        status: 404,
        type: "error",
      });
    }

    return NextResponse.json({
      message: "Employee hierarchy fetched successfully",
      data: hierarchy,
      status: 200,
      type: "success",
    });
  } catch (error) {
    console.error("Error fetching reportees:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
      type: "error",
    });
  }
}
