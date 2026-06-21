"use client"
import { Button, Card, CardHeader, Form, Input, Label, TextArea } from "@heroui/react";
import {
  FaDollarSign,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

const LawyerOverviewPage = () => {
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const specialization = form.specialization.value;
    const fee = form.fee.value;
    const bio = form.bio.value;
    const image = form.image.files[0];

    console.log({
      name,
      specialization,
      fee,
      bio,
      image,
    });

    // Later:
    // 1. Upload image to imgBB
    // 2. Save lawyer profile to DB
  };

  const stats = {
    totalRequests: 100,
    pendingRequests: 580,
    acceptedCases: 300,
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Requests */}
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Requests
              </p>

              <h2 className="text-3xl font-extrabold text-cyan-700">
                {stats.totalRequests}
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <FaBriefcase size={24} />
            </div>
          </div>
        </Card>

        {/* Pending */}
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Pending Requests
              </p>

              <h2 className="text-3xl font-extrabold  text-cyan-700">
                {stats.pendingRequests}
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-400">
              <FaUserTie size={24} />
            </div>
          </div>
        </Card>

        {/* Accepted */}
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Accepted Cases
              </p>

              <h2 className="text-3xl font-extrabold  text-cyan-700">
                {stats.acceptedCases}
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-green-500/10 text-green-400">
              <FaDollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Information */}
      <Card className="glass border-white/5 max-w-4xl" radius="lg">
        <CardHeader className="flex flex-col items-start gap-1 pb-4 border-b border-white/5">
          <h3 className="text-2xl text-center mx-auto font-extrabold text-gray-600 mb-3">
            Lawyer Profile Information
          </h3>

          <p className="text-slate-400 text-sm text-center mx-auto">
            Update your legal service information.
          </p>
        </CardHeader>

        <div className="p-6">
         <Form onSubmit={handleProfileUpdate} className="space-y-6 w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
  {/* Name Field */}
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider px-1">Name:</Label>
    <Input
      name="name"
      label="Full Name"
      labelPlacement="outside"
      placeholder="Enter your full name"
      className="w-full"
    />
  </div>

  {/* Law Type Field */}
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider px-1">Law type:</Label>
    <Input
      name="specialization"
      label="Specialization"
      labelPlacement="outside"
      placeholder="Criminal Law / Family Law / Corporate Law"
      className="w-full"
    />
  </div>

  {/* Law Fees Field */}
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider px-1">Law fees:</Label>
    <Input
      name="fee"
      type="number"
      label="Consultation Fee ($)"
      labelPlacement="outside"
      placeholder="100"
      className="w-full"
    />
  </div>

  {/* Image Upload Field */}
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider px-1">Upload image:</Label>
    <Input
      name="image"
      type="file"
      accept="image/*"
      label="Profile Image"
      labelPlacement="outside"
      className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
    />
  </div>

  {/* Bio Field */}
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider px-1">Lawyer bio:</Label>
    <TextArea
      name="bio"
      label="Professional Bio"
      labelPlacement="outside"
      placeholder="Write a short professional biography..."
      className="w-full"
    />
  </div>

  {/* Submit Button */}
  <Button
    type="submit"
    radius="lg"
    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors duration-200 shadow-md shadow-indigo-100"
  >
    Save Profile
  </Button>
</Form>
        </div>
      </Card>
    </div>
  );
};

export default LawyerOverviewPage;