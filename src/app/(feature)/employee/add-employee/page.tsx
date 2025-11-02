import Sidebar from "../../sidebar";
import AddEmployeeComponent from "./add-employee";
import { IEmployeeInfo } from "@/types";

export default async function AddEmployee() {
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
      <Sidebar content={<AddEmployeeComponent employees={employees} />} />
    </>
  );
}
