"use client";
import { Tree, TreeNode } from "react-organizational-chart";
import { CircleUserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import styles from "./reportee-chart.module.css";
import { IEmployeeDetailsInfo } from "@/types";

interface EmployeeProps {
  employee: IEmployeeDetailsInfo;
}

interface EmployeeDetailsProps {
  employeeDetails: IEmployeeDetailsInfo;
}

const RenderTreeNode = ({ employee }: EmployeeProps) => {
  return (
    <TreeNode
      label={
        <div className={styles.tree_class}>
          <Card className="bg-sky-600 text-white py-2">
            <CardContent className="px-0">
              <div className="flex justify-center">
                <div className="self-center">
                  <CircleUserRound size={40} strokeWidth={1} />
                </div>
              </div>
              <div>{employee.name}</div>
            </CardContent>
          </Card>
        </div>
      }
    >
      {employee.reportees &&
        employee.reportees.map((rep, index) => (
          <RenderTreeNode key={index} employee={rep} />
        ))}
    </TreeNode>
  );
};

export default function ReporteeChartComponent({
  employeeDetails,
}: EmployeeDetailsProps) {
  return (
    <>
      <div className="max-h-85 overflow-scroll">
        {employeeDetails ? (
          <Tree
            label={
              <div className={styles.tree_class}>
                <Card className="bg-sky-600 text-white py-2">
                  <CardContent className="px-0">
                    <div className="flex justify-center">
                      <div className="self-center">
                        <CircleUserRound size={40} strokeWidth={1} />
                      </div>
                    </div>
                    <div>{employeeDetails.name}</div>
                  </CardContent>
                </Card>
              </div>
            }
          >
            {employeeDetails.reportees?.map((reportee, index) => (
              <RenderTreeNode key={index} employee={reportee} />
            ))}
          </Tree>
        ) : null}
      </div>
    </>
  );
}
