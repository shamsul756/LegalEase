import { Button, Form, Input, Label, Modal, TextArea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { toast } from "react-hot-toast"; // toast মেসেজের জন্য

const CATEGORIES = [
    "Criminal Law",
    "Corporate & Business Law",
    "Family Law (Divorce/Property)",
    "Civil Litigation",
    "Labor & Employment",
    "Tax & VAT",
    "Cyber Crime / IT Law",
];

const LOCATIONS = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Mymensingh",
    "Online Consultation"
];

const EditLawyerModal = ({ isModalOpen, setIsModalOpen, editingLawyer, onRefresh }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const updateData = {
            name: data.name,
            category: data.category,
            chamberLocation: data.chamberLocation,
            fee: parseFloat(data.fee),
            experience: parseInt(data.experience),
            bio: data.bio,
        };

        // যদি নতুন ইমেজ আপলোড করা হয় (ঐচ্ছিক লজিক)
        if (data?.image && data.image[0]) {
            const imageFile = data.image[0];
            // const imageUrl = await uploadImage(imageFile); // আপনার ইমেজ আপলোড ফাংশন থাকলে
            // updateData.image = imageUrl;
        }

        try {
            // আপনার এক্সপ্রেস ব্যাকএন্ড এপিআই সরাসরি কল করা বা server action ব্যবহার করা
            const response = await fetch(`http://localhost:8000/api/lawyer/${editingLawyer?._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });

            const result = await response.json();

            if (result.modifiedCount > 0) {
                toast.success("Profile Updated successfully!");
                setIsModalOpen(false); // মডাল বন্ধ করা
                if (onRefresh) onRefresh(); // ডাটা রিফ্রেশ করার জন্য
            } else {
                toast.error("No changes made or update failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-6 rounded-2xl w-full max-w-lg mx-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4 text-center">Edit Professional Profile</h2>
                            <Form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4 w-full"
                            >
                                {/* Name + Profile Image */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            defaultValue={editingLawyer?.name}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                            labelPlacement="outside"
                                            placeholder="e.g. Adv. Rahat Khan"
                                            {...register("name", { required: "Name is required" })}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="image">Profile Picture</Label>
                                        <Input
                                            {...register("image")}
                                            type="file"
                                            accept="image/*"
                                            id="image"
                                            labelPlacement="outside"
                                            startContent={<FaImage className="text-slate-400 text-sm" />}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                        />
                                    </div>
                                </div>

                                {/* Category + Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="category">Practice Area (Category)</Label>
                                        <select
                                            id="category"
                                            defaultValue={editingLawyer?.category}
                                            {...register("category", { required: "Category is required" })} 
                                            className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-pink-500"
                                        >
                                            {CATEGORIES.map(cat => <option className="bg-slate-950 text-white" key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="chamberLocation">Chamber Location</Label>
                                        <select
                                            id="chamberLocation"
                                            defaultValue={editingLawyer?.chamberLocation}
                                            {...register("chamberLocation", { required: "Location is required" })} 
                                            className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-pink-500"
                                        >
                                            {LOCATIONS.map(loc => <option className="bg-slate-950 text-white" key={loc} value={loc}>{loc}</option>)}
                                        </select>
                                        {errors.chamberLocation && <p className="text-red-500 text-xs mt-1">{errors.chamberLocation.message}</p>}
                                    </div>
                                </div>

                                {/* Consultation Fee + Experience */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div>
                                        <Label htmlFor="fee">Consultation Fee (BDT)</Label>
                                        <Input
                                            defaultValue={editingLawyer?.fee}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                            type="number"
                                            placeholder="1500"
                                            {...register("fee", {
                                                required: "Fee is required",
                                                valueAsNumber: true,
                                                min: { value: 0, message: "Fee cannot be negative" },
                                            })}
                                        />
                                        {errors.fee && <p className="text-red-500 text-xs mt-1">{errors.fee.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="experience">Years of Experience</Label>
                                        <Input
                                            defaultValue={editingLawyer?.experience}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                            type="number"
                                            placeholder="5"
                                            {...register("experience", {
                                                required: "Experience is required",
                                                valueAsNumber: true,
                                                min: { value: 0, message: "Cannot be negative" },
                                            })}
                                        />
                                        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                                    </div>
                                </div>

                                {/* Bio/Description */}
                                <div className="w-full">
                                    <Label htmlFor="bio">Professional Bio</Label>
                                    <TextArea
                                        defaultValue={editingLawyer?.bio}
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                        placeholder="Briefly describe your legal expertise, case history, and achievements..."
                                        {...register("bio", {
                                            required: "Bio description is required",
                                            minLength: { value: 10, message: "Bio must be at least 10 characters long" },
                                        })}
                                    />
                                    {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 w-full shadow-lg shadow-pink-500/10"
                                    radius="lg"
                                >
                                    Save Changes
                                </Button>
                            </Form>
                        </div>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditLawyerModal;