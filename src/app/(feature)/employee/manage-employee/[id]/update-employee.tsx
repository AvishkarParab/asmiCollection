"use client";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { IEmployeeInfo } from "@/types";
import { YES_NO_OPTIONS_STRING } from "@/types/yes-no-options";

const EmployeeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required."),
  age: z.string(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  referredFrom: z.string().optional(),
  referralCode: z.string().optional(),
  isCommissionPaid: z.string(),
});

interface AddEmployeeProps {
  selectedEmployee: IEmployeeInfo;
  employees: IEmployeeInfo[];
}

export default function UpdateEmployeeComponent({
  selectedEmployee,
  employees,
}: AddEmployeeProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    mode: "all",
    defaultValues: {
      id: selectedEmployee._id,
      name: selectedEmployee.name,
      age: selectedEmployee.age,
      phone: selectedEmployee.phone,
      referredFrom: selectedEmployee?.referredFrom?._id ?? "",
      referralCode: selectedEmployee?.referralCode ?? "",
      isCommissionPaid: selectedEmployee.isCommissionPaid,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof EmployeeSchema>> = async (
    data
  ) => {
    try {
      const response: {
        data: {
          message: string;
          data: unknown;
          status: number;
          type: string;
        };
      } = await axios.patch(`/employee/api/${data.id}`, data);
      if (response.data.status !== 200) {
        notify("Something went wrong", "error");
      } else {
        notify(response.data.message, response.data.type);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function notify(
    message: string = "Oops.. Something went wrong",
    type: string = "error"
  ) {
    if (type === "success") {
      toast.success(message, {
        style: {
          background: "oklch(96.2% 0.044 156.743)",
        },
        position: "top-center",
      });
    } else {
      toast.error(message, {
        style: {
          background: "oklch(88.5% 0.062 18.334)",
        },
        position: "top-center",
      });
    }
  }

  return (
    <>
      <div className="text-center my-3 p-3">
        <Card className="text-neutral-800">
          <CardContent>
            <form id="addEmployeeForm" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="name">Employee name:</FieldLabel>
                          <Input
                            {...field}
                            id="name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter employee name"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="phone">
                            Employee phone:
                          </FieldLabel>
                          <Input
                            {...field}
                            id="phone"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter employee phone"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Controller
                      name="age"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="age">Employee Age:</FieldLabel>
                          <Input
                            {...field}
                            id="age"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter employee age"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="referredFrom"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldContent>
                            <FieldLabel htmlFor="referredFrom">
                              Referred From:
                            </FieldLabel>

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
                              id="referredFrom"
                              aria-invalid={fieldState.invalid}
                            >
                              <SelectValue placeholder="Select whom the employee reports to" />
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Controller
                      name="referralCode"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="referralCode">
                            Referral Code:
                          </FieldLabel>
                          <Input
                            {...field}
                            id="referralCode"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter referral code"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="isCommissionPaid"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldContent>
                            <FieldLabel htmlFor="isCommissionPaid">
                              Commission Paid:
                            </FieldLabel>

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
                              id="isCommissionPaid"
                              aria-invalid={fieldState.invalid}
                            >
                              <SelectValue placeholder="Select yes or no" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {YES_NO_OPTIONS_STRING.map((option, index) => {
                                return (
                                  <SelectItem key={index} value={option.value}>
                                    <span>{option.text}</span>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                  </div>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset
              </Button>
              <Button
                disabled={isSubmitting}
                type="submit"
                form="addEmployeeForm"
              >
                {isSubmitting ? (
                  <div className="flex justify-items-center align-middle">
                    Updating
                    <Spinner className="ms-2 my-1" />
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
