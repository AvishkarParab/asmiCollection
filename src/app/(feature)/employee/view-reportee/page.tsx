export const dynamic = "force-dynamic";

import Sidebar from "../../sidebar";
import ViewReporteeComponent from "./view-reportees";
import { IEmployeeInfo } from "@/types";

export default async function ViewReportee() {
  let employees: IEmployeeInfo[] = [];

  try {
    const response = await fetch("http://localhost:3000/employee/api");

    const { status, data } = await response.json();

    if (status === 200) {
      employees = data;
    }
  } catch (error) {
    console.log("Unable to fetch employees!", error);
  }
  return (
    <>
      <Sidebar content={<ViewReporteeComponent employees={employees} />} />
    </>
  );
}
