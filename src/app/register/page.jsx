"use client";
import Link from "next/link";
import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/utils/ImageUploader";


export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        // Upload image to imgbb
        console.log(data);
        const imageFile = data.image[0];
        const imageUrl = await uploadImage(imageFile)
        console.log(imageUrl);
        const { data: signUpData, error: signUpError } = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            image: imageUrl,
            role: data.role
        })

        // console.log(signUpData, signUpError);

        if (signUpError) {
            toast.error("Registration not succeed...")
        }
        else {
            redirect("/")
        }


    }
  

    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[140px]" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" />

    <Card className="relative z-10 w-full max-w-xl border border-white/10 bg-slate-950/80 backdrop-blur-3xl rounded-3xl p-8 shadow-[0_0_60px_rgba(236,72,153,0.18)]">
      <CardHeader className="flex flex-col items-center gap-4 pb-8 text-center">
        <Logo />

        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent">
          Create an Account
        </h1>

      </CardHeader>

     <CardBody className="gap-4">
  <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
    {/* Full Name Field */}
    <div className="flex flex-col gap-2">
      <Label htmlFor="name" className="text-slate-300 font-medium">
        Full Name
      </Label>
      <Input
        {...register("name", { required: "Name is Required" })}
        id="name"
        placeholder="John Doe"
        labelPlacement="outside"
        startContent={<FaUser className="text-slate-400 text-sm" />}
        classNames={{
          inputWrapper:
            "bg-slate-900/70 border border-white/10 hover:border-pink-500/50 focus-within:border-pink-500 min-h-14 rounded-xl transition-all duration-300",
        }}
      />
      {errors.name && (
        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>

    {/* Email Field */}
    <div className="flex flex-col gap-2">
      <Label htmlFor="email" className="text-slate-300 font-medium">
        Email Address
      </Label>
      <Input
        {...register("email", { required: "Email is Required" })}
        id="email"
        placeholder="john@example.com"
        type="email"
        labelPlacement="outside"
        startContent={<FaEnvelope className="text-slate-400 text-sm" />}
        classNames={{
          inputWrapper:
            "bg-slate-900/70 border border-white/10 hover:border-pink-500/50 focus-within:border-pink-500 min-h-14 rounded-xl transition-all duration-300",
        }}
      />
      {errors.email && (
        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    {/* Profile Image Field */}
    <div className="flex flex-col gap-2">
      <Label htmlFor="image" className="text-slate-300 font-medium">
        Profile Image
      </Label>
      <Input
        {...register("image", { required: "Image is Required" })}
        type="file"
        accept="image/*"
        id="image"
        labelPlacement="outside"
        startContent={<FaImage className="text-slate-400 text-sm" />}
        classNames={{
          inputWrapper:
            "bg-slate-900/70 border border-white/10 hover:border-pink-500/50 focus-within:border-pink-500 min-h-14 rounded-xl transition-all duration-300 file:text-slate-300",
        }}
      />
      {errors.image && (
        <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
      )}
    </div>

    {/* Password Field */}
    <div className="flex flex-col gap-2">
      <Label htmlFor="password" className="text-slate-300 font-medium">
        Password
      </Label>
      <Input
        {...register("password", { required: "Password is required" })}
        id="password"
        placeholder="••••••••"
        type="password"
        labelPlacement="outside"
        startContent={<FaLock className="text-slate-400 text-sm" />}
        classNames={{
          inputWrapper:
            "bg-slate-900/70 border border-white/10 hover:border-pink-500/50 focus-within:border-pink-500 min-h-14 rounded-xl transition-all duration-300",
        }}
      />
      {errors.password && (
        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* Role Select Field */}
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="role" className="text-sm font-semibold text-slate-300">
        Select Role
      </Label>
      <select
        id="role"
        {...register("role", { required: "Role is required" })}
        className="w-full h-14 rounded-xl bg-slate-900 border border-white/10 text-slate-200 px-4 focus:border-pink-500 outline-none transition-all duration-300 [&>option]:bg-slate-950 [&>option]:text-slate-200"
      >
        <option value="guest">User</option>
        <option value="lawer">Lawyer</option>
      </select>
      {errors.role && (
        <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
      )}
    </div>

    {/* Submit Button */}
    <Button
      type="submit"
      radius="lg"
      className="w-full h-14 text-base font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 shadow-xl"
    >
      Create Account
    </Button>
  </Form>

  {/* Divider */}
  <div className="flex items-center my-6">
    <div className="flex-grow border-t border-white/10" />
    <span className="mx-4 text-xs tracking-widest text-slate-500 font-semibold uppercase">
      Or Sign Up With
    </span>
    <div className="flex-grow border-t border-white/10" />
  </div>

  {/* Google OAuth Button */}
  <Button
    variant="bordered"
    radius="lg"
    className="w-full h-14 border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-pink-500/40 text-white font-semibold transition-all duration-300"
    startContent={<FaGoogle className="text-pink-500 text-lg" />}
  >
    Google
  </Button>

  {/* Login Redirect Link */}
  <p className="text-center text-sm text-slate-400 mt-8">
    Already have an account?{" "}
    <Link
      href="/login"
      className="text-pink-500 font-semibold hover:text-pink-400 transition-colors"
    >
      Log In
    </Link>
  </p>
</CardBody>
    </Card>
  </div>
    )};