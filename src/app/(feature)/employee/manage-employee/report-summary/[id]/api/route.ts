import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Employee from "@/models/employee";
import { IEmployeeInfo, IEmployeeReportDetails } from "@/types";

const COMMISSION_RATES: Record<number, number> = {
  1: 40,
  2: 25,
  3: 20,
  4: 15,
  5: 10,
};

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();

    const employee = await Employee.findById(id)
      .populate("referredFrom")
      .lean<IEmployeeInfo>();

    if (!employee) {
      return NextResponse.json({
        message: "Employee not found",
        status: 404,
        type: "error",
      });
    }

    const levels: Record<
      string,
      { names: string[]; commissionEarned: number }
    > = {};
    await getRefereesByLevel([id], 1, levels);

    const totalCommission = Object.values(levels).reduce(
      (sum, lvl) => sum + lvl.commissionEarned,
      0
    );

    const employeeReportData: IEmployeeReportDetails = {
      ...employee,
      refereeSummary: Object.entries(levels).map(([level, data]) => ({
        level,
        names: data.names.join(", "),
        commissionEarned: data.commissionEarned,
      })),
      totalCommission,
    };

    return NextResponse.json({
      message: "Employee details fetched successfully",
      data: employeeReportData,
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

async function getRefereesByLevel(
  empIds: string[],
  level: number,
  result: Record<string, { names: string[]; commissionEarned: number }>
) {
  const referees = await Employee.find({ referredFrom: { $in: empIds } }).lean<
    IEmployeeInfo[]
  >();

  if (referees.length === 0) return;

  const refereeNames = referees.map((r) => r.name);
  const rate = COMMISSION_RATES[level] || 0;
  const commissionEarned = referees.length * rate;

  result[`level ${level} referees`] = {
    names: refereeNames,
    commissionEarned,
  };

  // recursive call for next level
  const nextLevelIds = referees.map((r) => r._id.toString());
  await getRefereesByLevel(nextLevelIds, level + 1, result);
}
