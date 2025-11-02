import { IEmployeeInfo } from "./employee";

export interface IEmployeeDetailsInfo extends IEmployeeInfo {
  reportees: IEmployeeDetailsInfo[];
}
