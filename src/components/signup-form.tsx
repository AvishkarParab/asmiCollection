"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { Spinner } from "./ui/spinner";

const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState("password");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserSchema>> = async (data) => {
    try {
      const response: {
        data: {
          message: string;
          data: unknown;
          status: number;
          type: string;
        };
      } = await axios.post("http://localhost:3000/register/api", data);
      if (response?.data?.status === 200) {
        notify(response.data.message, response.data.type);
        router.push("/login");
      } else {
        notify(response?.data?.message, response?.data?.type);
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="registerUserForm" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name:</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email:</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password:</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={showPassword}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter password"
                        className="pr-10"
                      />

                      <Button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-black hover:bg-transparent"
                        variant="secondary"
                        size="icon-sm"
                        onClick={() =>
                          setShowPassword(
                            showPassword === "password" ? "text" : "password"
                          )
                        }
                      >
                        <Eye />
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button type="submit" onSubmit={handleSubmit(onSubmit)}>
                  {isSubmitting ? (
                    <div className="flex justify-items-center align-middle">
                      Registering
                      <Spinner className="ms-2 my-1" />
                    </div>
                  ) : (
                    "Register"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
          {/* <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form> */}
        </CardContent>
      </Card>
    </div>
  );
}
