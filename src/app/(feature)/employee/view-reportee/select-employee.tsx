"use client";
import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import ReporteeChartComponent from "./reportee-chart";
import { IEmployeeDetailsInfo, IEmployeeInfo } from "@/types";

const EmployeeSchema = z.object({
  employeeID: z.string().min(1, "Please select an employee"),
});

interface EmployeeProps {
  employees: IEmployeeInfo[];
}

export default function SelectEmployeeComponent({ employees }: EmployeeProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    mode: "all",
    defaultValues: {
      employeeID: "",
    },
  });
  const [employeeDetails, setEmployeeDetails] =
    useState<IEmployeeDetailsInfo | null>(null);

  const onSubmit: SubmitHandler<z.infer<typeof EmployeeSchema>> = async (
    data
  ) => {
    const { employeeID } = data;
    try {
      const response: {
        data: {
          message: string;
          data: IEmployeeDetailsInfo;
          status: number;
          type: string;
        };
      } = await axios.get(
        `http://localhost:3000/employee/api/employee-details/${employeeID}`
      );
      if (response.data.status !== 200) {
        console.log("No Data");
        setEmployeeDetails(null);
      } else {
        setEmployeeDetails(response.data.data);
        reset();
      }
    } catch (error) {
      console.log(error);
      setEmployeeDetails(null);
    }
  };
  return (
    <>
      <div className="my-3">
        <form id="selectEmployeeForm" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex justify-center">
              <div className="w-1/2">
                <Controller
                  name="employeeID"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="employeeID"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select an employee" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {employees.map((employee) => {
                            return (
                              <SelectItem
                                key={employee._id}
                                value={employee._id}
                              >
                                <span>{employee.name}</span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </div>

              <div className="ps-2 py-3">
                <Field className="w-50">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    form="selectEmployeeForm"
                  >
                    {isSubmitting ? (
                      <div className="flex ">
                        <div className="self-center">Seraching</div>
                        <div>
                          <Spinner className="ms-2 my-1" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <div className="self-center">Search</div>
                        <div>
                          <Search className="ms-2 my-1" />
                        </div>
                      </div>
                    )}
                  </Button>
                </Field>
              </div>
            </div>
          </FieldGroup>
        </form>
      </div>

      {employeeDetails ? (
        <div className="mt-5">
          <ReporteeChartComponent employeeDetails={employeeDetails} />
        </div>
      ) : null}
    </>
  );
}
