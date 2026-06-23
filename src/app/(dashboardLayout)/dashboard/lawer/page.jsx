"use client";


import DashHeader from "@/components/DashHeader";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/ImageUploader";

import {
    Button,
    Card,
    CardHeader,
    Input,
    TextArea,
    Form,
    Label,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

const ManageLegalProfilePage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // LegalEase Assignment-এর রিকোয়ারমেন্ট অনুযায়ী ক্যাটাগরি লিস্ট
    const SPECIALIZATIONS = [
        "Criminal Law",
        "Corporate Law",
        "Family Law",
        "Civil Litigation",
        "Intellectual Property",
        "Labor & Employment",
        "Tax Law",
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // imgBB-তে ছবি আপলোড করার লজিক (অ্যাসাইনমেন্টের রিকোয়ারমেন্ট)
            const imageFile = data.lawyerImage[0];
            let imageUrl = "";
            
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            delete data?.lawyerImage;
            
            const updatedProfileData = {
                ...data,
                image: imageUrl,
                email: session?.user?.email, // লগইন থাকা আইনজীবীর ইমেইল
            };

            // এখানে আপনার ব্যাকএন্ড এপিআই অ্যাকশন কল করবেন (যেমন: updateLawyerProfile)
            // const result = await updateLawyerProfile(updatedProfileData);
            
            // সাময়িক টেস্ট করার জন্য ডামি সাকসেস রেসপন্স:
            const result = { success: true }; 

            if (result.success) {
                toast.success("Legal profile updated successfully...");
                router.push("/events");
            } else {
                toast.error(result.message || "Failed to update profile...");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        }
    };

    return (
        <div>
            <DashHeader
                title="Manage Legal Profile"
                description="Update your legal services, specialization, and consultation fees"
           />

            <div className="mt-6 max-w-3xl">
                <Card
                    className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
                    radius="lg"
                >
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">
                            Legal Service Information
                        </h3>
                        <p className="text-slate-400 text-xs">
                            Fill out your professional details. This information will be visible to potential clients.
                        </p>
                    </CardHeader>

                    <div className="p-6">
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 w-full"
                        >
                            {/* Name + Professional Photo */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                                    <Input
                                        id="name"
                                        label="Professional Name"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                        labelPlacement="outside"
                                        placeholder="e.g. Adv. John Doe"
                                        {...register("name", {
                                            required: "Professional name is required",
                                        })}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="lawyerImage" className="text-gray-400 ">Profile Image (imgBB)</Label>
                                    <Input
                                        id="lawyerImage"
                                        type="file"
                                        accept="image/*"
                                        labelPlacement="outside"
                                        startContent={<FaImage className="text-slate-400 text-sm" />}
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white"
                                        {...register("lawyerImage", { required: "Professional photo is required" })}
                                    />
                                    {errors.lawyerImage && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.lawyerImage.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Specialization + Consultation Fee */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="specialization" className="text-gray-400" >Specialization</Label>
                                    <select
                                        id="specialization"
                                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl hover:border-pink-500/50 focus:border-pink-500 p-3 outline-none"
                                        {...register("specialization", { required: "Specialization is required" })}
                                    >
                                        <option value="" className="bg-slate-900">Select Specialization</option>
                                        {SPECIALIZATIONS.map(spec => (
                                            <option key={spec} value={spec} className="bg-slate-900">
                                                {spec}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.specialization && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.specialization.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="fee" className="text-gray-400" >Consultation Fee ($/Hourly)</Label>
                                    <Input
                                        id="fee"
                                        type="number"
                                        label="Hourly Rate ($)"
                                        labelPlacement="outside"
                                        placeholder="0.00"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3 text-white"
                                        {...register("fee", {
                                            required: "Consultation fee is required",
                                            valueAsNumber: true,
                                            min: {
                                                value: 0,
                                                message: "Fee cannot be negative",
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

                            {/* Bio / Professional Summary */}
                            <div className="w-full">
                                <Label htmlFor="bio" className="text-gray-400 py-2">Bio / Professional Summary</Label>
                                <TextArea
                                    id="bio"
                                    className="w-full text-white bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                    label="About You"
                                    labelPlacement="outside"
                                    placeholder="Briefly describe your legal experience, notable cases, and core expertise..."
                                    {...register("bio", {
                                        required: "Professional summary is required",
                                        minLength: {
                                            value: 20,
                                            message: "Bio must be at least 20 characters long",
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
                                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
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