export const dynamic = "force-dynamic";

import { IEmployeeInfo } from "@/types";
import Sidebar from "../sidebar";
import DashboardPage from "./dashboard";

export default async function Home() {
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
      <Sidebar content={<DashboardPage employees={employees} />} />
    </>
  );
}
