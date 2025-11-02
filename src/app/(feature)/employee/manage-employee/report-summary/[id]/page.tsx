import { notFound, redirect } from "next/navigation";
import { IEmployeeReportDetails } from "@/types";
import Sidebar from "../../../../sidebar";
import ClientWrapper from "./client-wrapper";

interface UpdateEmployeePageProps {
  params: Promise<{ id: string }>;
}

async function getSelectedEmployeeDetails(employeeID: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/employee/manage-employee/report-summary/${employeeID}/api`
    );

    const { status, data } = await response.json();

    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log("Unable to fetch employee details!", error);
  }
}

export default async function UpdateEmployee({
  params,
}: UpdateEmployeePageProps) {
  const { id } = await params;

  if (!id) {
    redirect("/employee/manage-employee");
  }

  const selectedEmployee: IEmployeeReportDetails | null =
    await getSelectedEmployeeDetails(id);

  if (!selectedEmployee) {
    return notFound();
  }

  return (
    <>
      <Sidebar content={<ClientWrapper employee={selectedEmployee} />} />
    </>
  );
}
