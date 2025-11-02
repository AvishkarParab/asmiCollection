"use client";

import { useState } from "react";
import Link from "next/link";
import z from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { Eye } from "lucide-react";

const UserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState("password");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    mode: "all",
    defaultValues: {
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
      } = await axios.post("http://localhost:3000/login/api", data);
      if (response?.data?.status === 200) {
        notify(response.data.message, response.data.type);
        router.push("/home");
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
          <CardTitle className="text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="loginUserForm" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
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
                      Logging in
                      <Spinner className="ms-2 my-1" />
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
                <FieldDescription className="text-center ">
                  Don&apos;t have an account?{" "}
                  <Link className=" text-blue-400" href="/register">
                    Register
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Developed by Avishkar Parab.
      </FieldDescription>
    </div>
  );
}
