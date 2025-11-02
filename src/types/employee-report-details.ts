import { IEmployeeInfo } from "./employee";
import { IRefereeSummaryInfo } from "./report-summary";

export interface IEmployeeReportDetails extends IEmployeeInfo {
  refereeSummary: IRefereeSummaryInfo[];
  totalCommission: number;
}
