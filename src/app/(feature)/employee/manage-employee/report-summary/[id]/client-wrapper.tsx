"use client";

import dynamic from "next/dynamic";
import { IEmployeeInfo } from "@/types";

// Dynamically import PDF component on client only
const EmployeeReportSummaryComponent = dynamic(
  () => import("./report-summary"),
  { ssr: false, loading: () => <p>Loading report...</p> }
);

export default function ClientWrapper({
  employee,
}: {
  employee: IEmployeeInfo;
}) {
  return <EmployeeReportSummaryComponent employee={employee} />;
}
