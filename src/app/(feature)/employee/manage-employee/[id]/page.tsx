import axios from "axios";
import { notFound } from "next/navigation";
import { IEmployeeInfo } from "@/types";
import Sidebar from "../../../sidebar";
import UpdateEmployeeComponent from "./update-employee";

interface UpdateEmployeePageProps {
  params: Promise<{ id: string }>;
}

async function getAllEmployees() {
  try {
    const response = await fetch("http://localhost:3000/employee/api");

    const { status, data } = await response.json();

    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log("Unable to fetch employees!", error);
  }
}

async function getSelectedEmployeeDetails(employeeID: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/employee/api/employee-details/${employeeID}`
    );

    if (response?.data?.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("Unable to fetch employees!", error);
  }
}

export default async function UpdateEmployee({
  params,
}: UpdateEmployeePageProps) {
  const { id } = await params;
  const employees: IEmployeeInfo[] = await getAllEmployees();
  const selectedEmployee: IEmployeeInfo = await getSelectedEmployeeDetails(id);

  if (!selectedEmployee) {
    return notFound();
  }

  return (
    <>
      <Sidebar
        content={
          <UpdateEmployeeComponent
            selectedEmployee={selectedEmployee}
            employees={employees || []}
          />
        }
      />
    </>
  );
}
