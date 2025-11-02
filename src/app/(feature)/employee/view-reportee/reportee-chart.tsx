"use client";
import { Tree, TreeNode } from "react-organizational-chart";
import { CircleUserRound } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
          <Card className="bg-sky-600 text-white">
            <CardContent>
              <div className="flex justify-center">
                <div className="self-center">
                  <CircleUserRound size={60} strokeWidth={1} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="self-center">
              <div>{employee.name}</div>
            </CardFooter>
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
                <Card className="bg-sky-600 text-white">
                  <CardContent>
                    <div className="flex justify-center">
                      <div className="self-center">
                        <CircleUserRound size={60} strokeWidth={1} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="self-center">
                    <div>{employeeDetails.name}</div>
                  </CardFooter>
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
