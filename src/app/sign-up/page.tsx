"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/auth";
import { toast,Toaster } from "react-hot-toast";
import Link from "next/link";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      // Redirect to dashboard or sign-in on success
      router.push("/sign-in"); // Or /sign-in depending on flow
    } catch (err: any) {
      console.error("Registration error:", err);
      // Map Firebase error codes to user-friendly messages
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <>
     <div><Toaster/></div>
    <div className="flex flex-col md:flex-row  md:h-screen h-auto items-start md:items-center  justify-between">
      <div className="flex flex-col w-full md:w-1/3 gap-7 px-5 py-10 h-auto md:px-12 md:py-24 md:h-screen md:self-start">
        <Image src="/logo.png" alt="Logo" width={70} height={70} />
        <h1 className="text-2xl md:text-4xl font-semibold text-black">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              className="bg-[#F7F7F8]"
              disabled={isLoading}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              className="bg-[#F7F7F8]"
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
              className="bg-[#F7F7F8]"
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <p className="text-center">Already have an account? <Link href="/sign-in" className="text-purple font-semibold"> Login</Link></p>
      </div>
      <div className="md:ml-12 md:mt-0 mt-10 md:w-2/3">
        <Image src="/Illustration.png" alt="Logo" width={700} height={427} />
      </div>
    </div>
    </>
  );
}

export default SignUp;
