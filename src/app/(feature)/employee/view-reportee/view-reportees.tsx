import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SelectEmployeeComponent from "./select-employee";
import { IEmployeeInfo } from "@/types";

interface EmployeeProps {
  employees: IEmployeeInfo[];
}

export default function ViewReporteeComponent({ employees }: EmployeeProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="w-5/6 self-center my-3 ">
          <Card className="text-neutral-800 py-4 gap-0">
            <CardHeader className="text-center">
              <h1 className="font-bold text-xl">Employee Reportees View</h1>
            </CardHeader>
            <CardContent>
              <div className="my-4">
                <SelectEmployeeComponent employees={employees} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
