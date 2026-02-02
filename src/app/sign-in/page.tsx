"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/lib/auth";
import { toast,Toaster } from "react-hot-toast";
import Link from "next/link";

function Login() {

     const { register, handleSubmit, formState: { errors } } = useForm();
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();

     const onSubmit = async (data: any) => {
      setIsLoading(true);
      try {
        await loginUser(data.email, data.password);
        router.push("/dashboard");
      } catch (error: any) {
        console.error("Login error:", error);
        toast.error("Invalid email or password");
      } finally {
        setIsLoading(false);
      }
     }

  return (
     <>
     <div><Toaster/></div>
    <div className="flex flex-col md:flex-row md:h-screen h-auto items-start md:items-center justify-between bg-white dark:bg-slate-900">
      <div className="flex flex-col w-full md:w-1/3 gap-7 px-5 py-10 h-auto md:px-12 md:py-24 md:h-screen md:self-start">
        <Image src="/logo.png" alt="Logo" width={70} height={70} />
        <h1 className="text-2xl md:text-4xl font-semibold text-black dark:text-slate-100">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              className="bg-[#F7F7F8] dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-400"
              disabled={isLoading}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="***********"
              className="bg-[#F7F7F8] dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-400"
              disabled={isLoading}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-purple hover:bg-purple/80 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Logining in..." : "Login"}
          </Button>
        </form>
        <p className="text-center text-slate-700 dark:text-slate-300">Don't have an account yet?<Link href="/sign-up" className="text-purple dark:text-purple-300 font-semibold"> Create New Account</Link></p>
      </div>
      <div className="md:ml-12 md:mt-0 mt-10 md:w-2/3 dark:opacity-90">
        <Image src="/Illustration-1.png" alt="Logo" width={647} height={602} />
      </div>
    </div>
    </>
  )
}

export default Login