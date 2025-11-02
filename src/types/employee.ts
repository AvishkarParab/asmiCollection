export interface IEmployeeInfo {
  _id: string;
  name: string;
  email: string;
  age: string;
  referredFrom: IEmployeeInfo;
  referralCode: string;
  isCommissionPaid: string;
}
