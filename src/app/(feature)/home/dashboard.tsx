"use client";

import { DataTable } from "@/components/ui/data-table";
import { HomeEmployeTableColumns } from "./columns";
import { IEmployeeInfo } from "@/types";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

interface EmployeeProps {
  employees: IEmployeeInfo[];
}

export default function DashboardPage({ employees }: EmployeeProps) {
  const columns = HomeEmployeTableColumns();
  return (
    <>
      <h2 className="text-center font-semibold my-2">Top Insights</h2>
      <div className="px-2 py-4 grid grid-cols-3">
        <Card className="text-center bg-primary text-secondary">
          <CardContent>
            <div className="flex justify-center my-2">
              <Users size={50} />
            </div>
            <div className="font-bold mb-2">{employees.length}</div>
            <CardDescription className="text-secondary">
              No. of Employees
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="py-4">
        <h3 className="text-center font-semibold py-4">Employee Details</h3>
        <DataTable columns={columns} data={employees} />
      </div>
    </>
  );
}
