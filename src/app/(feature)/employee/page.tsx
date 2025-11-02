import Sidebar from "../sidebar";
import EmployeeComponent from "./employee";

export default function Employee() {
  return (
    <>
      <Sidebar content={<EmployeeComponent />} />
    </>
  );
}
