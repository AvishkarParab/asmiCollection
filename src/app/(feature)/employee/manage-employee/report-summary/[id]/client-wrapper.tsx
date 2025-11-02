"use client";

import dynamic from "next/dynamic";
import { IEmployeeReportDetails } from "@/types";

const EmployeeReportSummaryComponent = dynamic(
  () => import("./report-summary"),
  { ssr: false, loading: () => <p>Loading report...</p> }
);

export default function ClientWrapper({
  employee,
}: {
  employee: IEmployeeReportDetails;
}) {
  return <EmployeeReportSummaryComponent employee={employee} />;
}
