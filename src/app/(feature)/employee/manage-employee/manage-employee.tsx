"use client";
import { DataTable } from "@/components/ui/data-table";
import { IEmployeeInfo } from "@/types";
import { EmployeeTableColumns } from "./columns";

interface EmployeeProps {
  employees: IEmployeeInfo[];
}

export default function ManageEmployeeComponent({ employees }: EmployeeProps) {
  const columns = EmployeeTableColumns();
  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={employees} />
      </div>
    </>
  );
}
