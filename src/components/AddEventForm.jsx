"use client";

import { useState } from "react";
import { 
    Card, 
    CardHeader, 
    Input, 
    Textarea, 
    Form, 
    Button, 
    Select, 
    SelectItem 
} from "@heroui/react";
import toast from "react-hot-toast";

const AddEventForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ⚖️ লিগ্যাল প্রজেক্টের প্রয়োজনীয় ক্যাটাগরি লিস্ট
    const LEGAL_CATEGORIES = [
        "Criminal Law",
        "Corporate Law",
        "Family Law",
        "Civil Litigation",
        "Intellectual Property",
        "Labor & Employment",
        "Tax Law",
        "Real Estate Law"
    ];

    // 📍 বাংলাদেশের প্রধান লোকেশন এবং অনলাইন অপশন
    const LOCATIONS = [
        "Dhaka", 
        "Chittagong", 
        "Sylhet", 
        "Rajshahi", 
        "Khulna", 
        "Barisal", 
        "Rangpur", 
        "Mymensingh", 
        "Online / Remote"
    ];

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const eventData = Object.fromEntries(formData.entries());

            console.log("Created Legal Event Data: ", eventData);
            
            // এখানে ব্যাকএন্ড এপিআই অ্যাকশন কল হবে:
            // const res = await createLegalEvent(eventData);

            toast.success("Legal seminar/event hosted successfully!");
            e.currentTarget.reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to host the event!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6 max-w-3xl mx-auto w-full">
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl p-2">
                <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6 items-start">
                    <h3 className="text-xl font-bold text-white">Host a New Legal Event / Seminar</h3>
                    <p className="text-slate-400 text-xs">Fill out the detailed event information. Banners and dates are required for client visibility.</p>
                </CardHeader>
                
                <div className="p-6">
                    <Form onSubmit={handleSubmitEvent} className="space-y-5 w-full flex flex-col">
                        
                        {/* Event Title + Banner URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <Input 
                                name="title"
                                label="Event / Seminar Title" 
                                labelPlacement="outside" 
                                placeholder="e.g. Corporate Tax Law Workshop 2026" 
                                required 
                                variant="bordered"
                                classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                            />
                            <Input 
                                name="bannerUrl"
                                label="Banner Image URL" 
                                labelPlacement="outside" 
                                placeholder="https://images.unsplash.com/..." 
                                required 
                                variant="bordered"
                                type="url"
                                classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                            />
                        </div>

                        {/* Legal Category + Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <Select
                                name="category"
                                label="Legal Practice Area / Category"
                                labelPlacement="outside"
                                placeholder="Select Category"
                                required
                                variant="bordered"
                                classNames={{ trigger: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 h-12 text-white" }}
                                popoverProps={{ classNames: { content: "bg-slate-950 border border-white/10 text-white" } }}
                            >
                                {LEGAL_CATEGORIES.map((cat) => (
                                    <SelectItem key={cat} value={cat} className="hover:bg-pink-500/20 text-white">
                                        {cat}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                name="location"
                                label="Venue / Location"
                                labelPlacement="outside"
                                placeholder="Select Location"
                                required
                                variant="bordered"
                                classNames={{ trigger: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 h-12 text-white" }}
                                popoverProps={{ classNames: { content: "bg-slate-950 border border-white/10 text-white" } }}
                            >
                                {LOCATIONS.map((loc) => (
                                    <SelectItem key={loc} value={loc} className="hover:bg-pink-500/20 text-white">
                                        {loc}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Date + Price + Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <Input 
                                name="date"
                                type="date" 
                                label="Event Date" 
                                labelPlacement="outside" 
                                required 
                                variant="bordered"
                                classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                            />
                            <Input 
                                name="price"
                                type="number" 
                                min={0} 
                                step="any" 
                                label="Registration Fee ($)" 
                                labelPlacement="outside" 
                                placeholder="0.00 (Leave 0 if free)" 
                                required 
                                variant="bordered"
                                classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                            />
                            <Input 
                                name="capacity"
                                type="number" 
                                min={1} 
                                label="Max Attendees / Capacity" 
                                labelPlacement="outside" 
                                placeholder="50" 
                                required 
                                variant="bordered"
                                classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 h-12 text-white" }}
                            />
                        </div>

                        {/* Detailed Description */}
                        <div className="w-full">
                            <Textarea 
                                name="description"
                                label="Detailed Event Overview & Agenda" 
                                labelPlacement="outside" 
                                placeholder="Outline the legal discussion topics, key takeaways, and speaker details..." 
                                required 
                                variant="bordered"
                                classNames={{ inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 min-h-[120px] text-white" }}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            isLoading={isSubmitting}
                            className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 px-8 shadow-lg shadow-pink-500/20 self-start mt-2" 
                            radius="lg"
                        >
                            Publish Legal Event
                        </Button>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default AddEventForm;