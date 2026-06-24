"use client";

import { useState } from "react";
import { 
    Card, 
    CardHeader, 
    Input, 
    Textarea, // TextArea থেকে ফিক্স করা হয়েছে
    Form, 
    Button 
} from "@heroui/react";
import toast from "react-hot-toast";

const LawyersForm = () => { // বানান ঠিক করা হয়েছে
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitChamber = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const chamberData = Object.fromEntries(formData.entries());

            console.log("Law Firm / Chamber Data: ", chamberData);
            
            // আপনার ব্যাকএন্ড বা অ্যাকশন এপিআই কল এখানে হবে:
            // const res = await updateLawyerChamber(chamberData);

            toast.success("Lawyer's professional credentials updated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update credentials!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6 space-y-6 max-w-3xl mx-auto w-full">
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl p-2" radius="lg">
                <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6 items-start">
                    <h3 className="text-xl font-bold text-white">Lawyer & Chamber Details</h3>
                    <p className="text-slate-400 text-xs">Review and edit your professional law firm or independent chamber credentials.</p>
                </CardHeader>
                
                <div className="p-6">
                    <Form onSubmit={handleSubmitChamber} className="space-y-5 w-full flex flex-col">
                        
                        {/* Law Firm / Chamber Name */}
                        <Input 
                            name="chamberName"
                            id="chamberName" 
                            label="Law Firm / Chamber Name" 
                            labelPlacement="outside" 
                            placeholder="e.g. Nexus Legal Associates" 
                            required 
                            variant="bordered"
                            classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                        />

                        {/* Chamber Logo URL */}
                        <Input 
                            name="chamberLogo"
                            id="chamberLogo" 
                            label="Chamber Logo URL" 
                            labelPlacement="outside" 
                            placeholder="https://images.unsplash.com/..." 
                            required 
                            variant="bordered"
                            type="url"
                            classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                        />

                        {/* Chamber Website */}
                        <Input 
                            name="chamberWebsite"
                            id="chamberWebsite" 
                            label="Official Website / Portfolio" 
                            labelPlacement="outside" 
                            placeholder="nexuslegal.com" 
                            required 
                            variant="bordered"
                            classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                        />

                        {/* Chamber Description */}
                        <Textarea 
                            name="chamberDescription"
                            id="chamber-desc" 
                            label="Firm Description & Practice Overview" 
                            labelPlacement="outside" 
                            placeholder="Providing premium legal consultation, corporate legal structuring, and courtroom defense services." 
                            required 
                            variant="bordered"
                            classNames={{ inputWrapper: "bg-slate-900/50 border border-white/10 rounded-xl min-h-[100px] text-white" }}
                        />

                        <div className="flex gap-4">
                            <Button 
                                type="submit" 
                                isLoading={isSubmitting}
                                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/20" 
                                radius="lg"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default LawyersForm;