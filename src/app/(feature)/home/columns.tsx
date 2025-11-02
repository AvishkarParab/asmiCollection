"use client";

import { IEmployeeInfo } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export function HomeEmployeTableColumns(): ColumnDef<IEmployeeInfo>[] {
  const columns: ColumnDef<IEmployeeInfo>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "referredFrom",
      header: "Referred From",
      cell: ({ row }) => {
        const employee: IEmployeeInfo = row.getValue("referredFrom");

        return (
          <span
            className={`
          ${
            employee?.name
              ? ""
              : "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800"
          }
        `}
          >
            {employee?.name ? employee.name : "N/A"}
          </span>
        );
      },
    },
    {
      accessorKey: "referralCode",
      header: "Referral Code",
      cell: ({ row }) => {
        const referralCode: string = row.getValue("referralCode");

        return (
          <span
            className={`
          ${
            referralCode
              ? ""
              : "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800"
          }
        `}
          >
            {referralCode ? referralCode : " N/A"}
          </span>
        );
      },
    },
    {
      accessorKey: "isCommissionPaid",
      header: "Commission Paid",
      cell: ({ row }) => {
        const value = row.getValue("isCommissionPaid");
        const isPaid = value === "yes";

        return (
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full 
          ${isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        `}
          >
            {isPaid ? "Paid" : "Not Paid"}
          </span>
        );
      },
    },
  ];

  return columns;
}
