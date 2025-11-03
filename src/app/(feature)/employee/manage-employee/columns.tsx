"use client";

import { useRouter } from "next/navigation";
import { FileText, Pen, Trash2 } from "lucide-react";
import { IEmployeeInfo } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export function EmployeeTableColumns(): ColumnDef<IEmployeeInfo>[] {
  const router = useRouter();

  const deleteSelectedEmployee = async (id: string) => {
    try {
      const response = await axios.delete(`/employee/api/${id}`);
      const { status, message, type } = response.data;

      if (status === 200) {
        notify("Employee Deleted Successfully", "success");
        router.refresh();
      } else {
        notify(message, type);
      }
    } catch (error) {
      notify();
      console.error("Error deleting employee:", error);
    }
  };

  function notify(
    message: string = "Oops.. Something went wrong",
    type: string = "error"
  ) {
    if (type === "success") {
      toast.success(message, {
        style: { background: "oklch(96.2% 0.044 156.743)" },
        position: "top-center",
      });
    } else {
      toast.error(message, {
        style: { background: "oklch(88.5% 0.062 18.334)" },
        position: "top-center",
      });
    }
  }

  const columns: ColumnDef<IEmployeeInfo>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "referredFrom",
      header: "Referred From",
      cell: ({ row }) => {
        const referredFrom: IEmployeeInfo = row.getValue("referredFrom");

        return (
          <span
            className={`
          ${
            referredFrom?.name
              ? ""
              : "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800"
          }
        `}
          >
            {referredFrom?.name ? referredFrom.name : "N/A"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <div className="flex items-start gap-2">
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() =>
                router.push(`/employee/manage-employee/${employee._id}`)
              }
            >
              <Pen />
            </Button>

            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => deleteSelectedEmployee(employee._id)}
            >
              <Trash2 />
            </Button>

            <Button
              size="icon-sm"
              variant="outline"
              onClick={() =>
                router.push(
                  `/employee/manage-employee/report-summary/${employee._id}`
                )
              }
            >
              <FileText />
            </Button>
          </div>
        );
      },
    },
  ];

  return columns;
}
