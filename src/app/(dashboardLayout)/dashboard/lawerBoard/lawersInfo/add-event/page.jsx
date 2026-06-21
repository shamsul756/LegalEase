"use client";

import DashHeader from "@/components/DashHeader";
import { addLawyer } from "@/lib/api/lawyers/actions";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";

import {
  Button,
  Card,
  CardHeader,
  Input,
  Textarea,
  Form,
  Label,
} from "@heroui/react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ManageLegalProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const SPECIALIZATIONS = [
    "Criminal Law",
    "Corporate Law",
    "Family Law",
    "Property Law",
    "Immigration Law",
    "Civil Law",
    "Tax Law",
    "Business Law",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];

      const imageUrl = await uploadImage(imageFile);

      const lawyerData = {
        name: data.name,
        image: imageUrl,
        category: data.category,
        bio: data.bio,
        fee: Number(data.fee),
        status: data.status,
        email: session?.user?.email,
        createdAt: new Date(),
      };

      const result = await addLawyer(lawyerData);

      if (result?.insertedId) {
        toast.success("Lawyer profile created successfully");
        router.push("/dashboard");
      } else {
        toast.error("Failed to create profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <DashHeader
        title="Manage Legal Profile"
        description="Create and manage your legal service profile"
      />

      <div className="mt-6 max-w-4xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">
              Lawyer Profile Information
            </h3>

            <p className="text-slate-400 text-xs">
              Fill in your legal expertise information to publish your profile.
            </p>
          </CardHeader>

          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              {/* Name + Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <Label>Lawyer Name</Label>

                  <Input
                    label="Full Name"
                    labelPlacement="outside"
                    placeholder="John Smith"
                    {...register("name", {
                      required: "Lawyer name is required",
                    })}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Profile Image</Label>

                  <Input
                    type="file"
                    accept="image/*"
                    startContent={
                      <FaImage className="text-slate-400 text-sm" />
                    }
                    {...register("image", {
                      required: "Profile image is required",
                    })}
                  />

                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Specialization + Fee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <Label>Specialization</Label>

                  <select
                    {...register("category", {
                      required: "Specialization is required",
                    })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3"
                  >
                    <option value="">
                      Select Specialization
                    </option>

                    {SPECIALIZATIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Consultation Fee</Label>

                  <Input
                    type="number"
                    label="Fee ($)"
                    labelPlacement="outside"
                    placeholder="100"
                    {...register("fee", {
                      required: "Consultation fee is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Fee must be greater than 0",
                      },
                    })}
                  />

                  {errors.fee && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fee.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="w-full">
                <Label>Availability Status</Label>

                <select
                  {...register("status")}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3"
                >
                  <option value="available">
                    Available
                  </option>

                  <option value="busy">
                    Busy
                  </option>
                </select>
              </div>

              {/* Bio */}
              <div className="w-full">
                <Label>Professional Biography</Label>

                <Textarea
                  label="Biography"
                  labelPlacement="outside"
                  placeholder="Describe your legal expertise, experience and achievements..."
                  minRows={5}
                  {...register("bio", {
                    required: "Biography is required",
                    minLength: {
                      value: 20,
                      message:
                        "Biography must be at least 20 characters",
                    },
                  })}
                />

                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg"
                radius="lg"
              >
                Save Legal Profile
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManageLegalProfilePage;