"use client";

import DashHeader from "@/components/DashHeader";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/ImageUploader";
import { Button, Card, CardHeader, Input, Textarea, Form } from "@heroui/react"; // Textarea ঠিক করা হয়েছে, Label বাদ দেওয়া হয়েছে (HeroUI বিল্ট-ইন হ্যান্ডেল করে)
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

const ManageLegalProfilePage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);
        try {
            let imageUrl = "";
            
            // ফাইল আছে কিনা তা সুরক্ষিতভাবে চেক করা
            if (data?.lawyerImage && data.lawyerImage.length > 0) {
                const imageFile = data.lawyerImage[0];
                imageUrl = await uploadImage(imageFile);
            }

            // অরিজিনাল ফাইল অবজেক্টটি ডাটা থেকে রিমুভ করা
            const { lawyerImage, ...restData } = data;
            
            const updatedProfileData = {
                ...restData,
                image: imageUrl,
                email: session?.user?.email,
            };

            console.log("Submitting Data: ", updatedProfileData);

            // আপনার ব্যাকএন্ড এপিআই এখানে কল করুন:
            // const result = await updateLawyerProfile(updatedProfileData);
            const result = { success: true }; 

            if (result.success) {
                toast.success("Legal profile updated successfully!");
                router.push("/dashboard"); // অ্যাসাইনমেন্টের ড্যাশবোর্ড পাথে রিডাইরেক্ট
            } else {
                toast.error(result.message || "Failed to update profile.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <DashHeader
                title="Manage Legal Profile"
                description="Update your legal services, specialization, and consultation fees"
            />

            <div className="mt-6 max-w-3xl mx-auto">
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl p-2">
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6 items-start">
                        <h3 className="text-xl font-bold text-white">
                            Legal Service Information
                        </h3>
                        <p className="text-slate-400 text-xs">
                            Fill out your professional details. This information will be visible to potential clients.
                        </p>
                    </CardHeader>

                    <div className="p-6">
                        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full flex flex-col">
                            
                            {/* Name + Professional Photo */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="w-full">
                                    <Input
                                        id="name"
                                        label="Full Name"
                                        labelPlacement="outside"
                                        placeholder="e.g. Adv. John Doe"
                                        variant="bordered"
                                        className="text-white"
                                        classNames={{
                                            inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12"
                                        }}
                                        isInvalid={!!errors.name}
                                        errorMessage={errors.name?.message}
                                        {...register("name", { required: "Professional name is required" })}
                                    />
                                </div>

                                <div className="w-full">
                                    {/* ফাইল ইনপুটের ক্ষেত্রে HeroUI ইনপুটকে টাইপ ফাইল দিলে ক্লাস এভাবে হ্যান্ডেল করতে হয় */}
                                    <Input
                                        id="lawyerImage"
                                        type="file"
                                        accept="image/*"
                                        label="Profile Image (imgBB)"
                                        labelPlacement="outside"
                                        variant="bordered"
                                        startContent={<FaImage className="text-slate-400 text-sm flex-shrink-0" />}
                                        className="text-white"
                                        classNames={{
                                            inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 pt-2"
                                        }}
                                        isInvalid={!!errors.lawyerImage}
                                        errorMessage={errors.lawyerImage?.message}
                                        {...register("lawyerImage", { required: "Profile photo is required" })}
                                    />
                                </div>
                            </div>

                            {/* Specialization + Consultation Fee */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="specialization" className="text-sm font-medium text-slate-300">
                                        Specialization
                                    </label>
                                    <select
                                        id="specialization"
                                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl hover:border-pink-500/50 focus:border-pink-500 h-12 px-3 outline-none text-sm backdrop-blur-xl"
                                        {...register("specialization", { required: "Specialization is required" })}
                                    >
                                        <option value="" className="bg-slate-950 text-slate-400">Select Specialization</option>
                                        {SPECIALIZATIONS.map(spec => (
                                            <option key={spec} value={spec} className="bg-slate-950 text-white">
                                                {spec}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.specialization && (
                                        <p className="text-danger text-xs mt-1">{errors.specialization.message}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Input
                                        id="fee"
                                        type="number"
                                        label="Consultation Fee ($/Hourly)"
                                        labelPlacement="outside"
                                        placeholder="0.00"
                                        variant="bordered"
                                        className="text-white"
                                        classNames={{
                                            inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12"
                                        }}
                                        isInvalid={!!errors.fee}
                                        errorMessage={errors.fee?.message}
                                        {...register("fee", {
                                            required: "Consultation fee is required",
                                            valueAsNumber: true,
                                            min: { value: 0, message: "Fee cannot be negative" },
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Bio / Professional Summary */}
                            <div className="w-full">
                                <Textarea
                                    id="bio"
                                    label="Bio / Professional Summary"
                                    labelPlacement="outside"
                                    placeholder="Briefly describe your legal experience, notable cases..."
                                    variant="bordered"
                                    className="text-white"
                                    classNames={{
                                        inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 min-h-[100px]"
                                    }}
                                    isInvalid={!!errors.bio}
                                    errorMessage={errors.bio?.message}
                                    {...register("bio", {
                                        required: "Professional summary is required",
                                        minLength: { value: 20, message: "Bio must be at least 20 characters long" },
                                    })}
                                />
                            </div>

                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 px-8 shadow-lg shadow-pink-500/20 self-start mt-2"
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