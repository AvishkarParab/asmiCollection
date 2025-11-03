export interface IEmployeeInfo {
  _id: string;
  name: string;
  phone: string;
  age: string;
  referredFrom: IEmployeeInfo;
  referralCode: string;
  isCommissionPaid: string;
}
