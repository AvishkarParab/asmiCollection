import axios from "axios";
import Sidebar from "../../sidebar";
import ViewReporteeComponent from "./view-reportees";
import { IEmployeeInfo } from "@/types";

export default async function ViewReportee() {
  let employees: IEmployeeInfo[] = [];

  try {
    const response = await axios.get("http://localhost:3000/employee/api");

    if (response?.data?.status === 200) {
      employees = response.data.data;
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
