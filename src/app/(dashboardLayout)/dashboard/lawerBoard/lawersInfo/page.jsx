"use client";

import DashHeader from "@/components/DashHeader";
import { addLawers, updateLawers } from "@/lib/api/events/action";
import { myLawers } from "@/lib/api/events/data";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/ImageUploader";
import {
  Button,
  Card,
  CardHeader,
  Form,
  Input,
  TextArea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

const LawersInfo = () => {
  const { data: session } = useSession();

  const [myLaw, setMyLaw] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!session?.user?.email) return;

    const getLawyer = async () => {
      const lawyer = await myLawers(session.user.email);
      setMyLaw(lawyer);
    };

    getLawyer();
  }, [session]);

  const onLawerSubmit = async (data) => {
    try {
      let imageUrl = myLaw?.logo || "";

      if (data.logo?.[0]) {
        imageUrl = await uploadImage(data.logo[0]);
      }

      const lawyerData = {
        lawerName: data.lawerName,
        logo: imageUrl,
        website: data.website,
        description: data.description,
        lawerEmail: session.user.email,
      };

      if (!myLaw) {
        const resData = await addLawers(lawyerData);

        if (resData?.insertedId) {
          toast.success("Lawyer profile added");
        }
      } else {
        const updatedRes = await updateLawers(
          lawyerData,
          myLaw._id
        );

        if (updatedRes?.modifiedCount > 0) {
          toast.success("Lawyer profile updated");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <DashHeader
        title="My Lawyer Profile"
        description="Update your lawyer information"
      />

      <div className="mt-6 space-y-6 max-w-3xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">
              Lawyer Details
            </h3>

            <p className="text-slate-400 text-xs">
              Review and update your legal profile.
            </p>
          </CardHeader>

          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onLawerSubmit)}
              className="space-y-4 w-full"
            >
              <Input
                defaultValue={myLaw?.lawerName}
                {...register("lawerName", {
                  required: "Lawyer name is required",
                })}
                label="Lawyer Name"
                labelPlacement="outside"
                placeholder="John Smith"
              />

              {errors.lawerName && (
                <p className="text-red-500">
                  {errors.lawerName.message}
                </p>
              )}

              <Input
                {...register("logo")}
                type="file"
                accept="image/*"
                label="Profile Image"
                labelPlacement="outside"
                startContent={
                  <FaImage className="text-slate-400 text-sm" />
                }
              />

              <Input
                defaultValue={myLaw?.website}
                {...register("website", {
                  required: "Website is required",
                })}
                label="Website"
                labelPlacement="outside"
                placeholder="https://yourwebsite.com"
              />

              {errors.website && (
                <p className="text-red-500">
                  {errors.website.message}
                </p>
              )}

              <TextArea
                defaultValue={myLaw?.description}
                {...register("description", {
                  required: "Description is required",
                })}
                label="Professional Bio"
                labelPlacement="outside"
                placeholder="Describe your legal experience..."
              />

              {errors.description && (
                <p className="text-red-500">
                  {errors.description.message}
                </p>
              )}

              <Button
                type="submit"
                className="bg-indigo-600 text-white font-bold h-11 px-6"
                radius="lg"
              >
                {myLaw ? "Update Profile" : "Create Profile"}
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LawersInfo;