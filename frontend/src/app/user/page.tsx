"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    address: "",
    bank_account_number: "",
    ifsc_code: "",
    branch: "",
    joining_date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit form: ${errorText}`);
      }

      await response.json();
      alert("User saved successfully!");

      setFormData({
        name: "",
        date_of_birth: "",
        address: "",
        bank_account_number: "",
        ifsc_code: "",
        branch: "",
        joining_date: "",
      });
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      date_of_birth: "",
      address: "",
      bank_account_number: "",
      ifsc_code: "",
      branch: "",
      joining_date: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 dark:bg-black px-2 transition-colors duration-300">
      <Card className="w-full max-w-2xl rounded-2xl shadow border border-neutral-800 bg-neutral-900 dark:bg-gray-900 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Add New User</CardTitle>
          <CardDescription className="text-neutral-300">
            Enter the user details below to add them to the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="mt-2 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400"
                />
              </div>
              <div>
                <Label htmlFor="date_of_birth" className="text-white">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  placeholder="dd-mm-yyyy"
                  required
                  className="mt-2 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="text-white">
                Address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                className="min-h-[72px] mt-2 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="bank_account_number" className="text-white">
                  Bank Account Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bank_account_number"
                  name="bank_account_number"
                  value={formData.bank_account_number}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  required
                  className="mt-2 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400"
                />
              </div>
              <div>
                <Label htmlFor="ifsc_code" className="text-white">
                  IFSC Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ifsc_code"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  placeholder="E.G., SBIN0000123"
                  className="uppercase mt-2 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="branch" className="text-white">
                  Branch <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Enter branch name"
                  required
                  className="mt-2 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400"
                />
              </div>
              <div>
                <Label htmlFor="joining_date" className="text-white">
                  Joining Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  id="joining_date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  placeholder="dd-mm-yyyy"
                  required
                  className="mt-2 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-neutral-900 font-semibold px-6 py-2 rounded-md hover:bg-neutral-200 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSubmitting ? "Adding..." : "Add User"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                className="bg-neutral-800 text-white font-semibold px-6 py-2 rounded-md border border-neutral-700 hover:bg-neutral-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
