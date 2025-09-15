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
    if (!validateForm()) return; // Stop if invalid

    setIsSubmitting(true);

    const API_URL = (process.env.NEXT_PUBLIC_API_URL ||
      "https://strapi-backend-4xxv.onrender.com"
    ).replace(/\/$/, "");

    try {
      const response = await fetch(`${API_URL}/api/user-details`, {
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
  };// validation + API call (same as your version)
  

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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8 transition-colors duration-300">
      <Card className="w-full max-w-2xl rounded-2xl shadow-lg border border-border 
        bg-card text-foreground transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New User</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the user details below to add them to the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="mt-2 bg-muted text-foreground border-border placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <Label htmlFor="date_of_birth">Date of Birth <span className="text-red-500">*</span></Label>
                <Input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                  className="mt-2 bg-muted text-foreground border-border placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                className="min-h-[72px] mt-2 bg-muted text-foreground border-border placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="bank_account_number">Bank Account Number <span className="text-red-500">*</span></Label>
                <Input
                  id="bank_account_number"
                  name="bank_account_number"
                  value={formData.bank_account_number}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  required
                  className="mt-2 bg-muted text-foreground border-border placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <Label htmlFor="ifsc_code">IFSC Code <span className="text-red-500">*</span></Label>
                <Input
                  id="ifsc_code"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  placeholder="E.G., SBIN0000123"
                  className="uppercase mt-2 bg-muted text-foreground border-border placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="branch">Branch <span className="text-red-500">*</span></Label>
                <Input
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Enter branch name"
                  required
                  className="mt-2 bg-muted text-foreground border-border placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <Label htmlFor="joining_date">Joining Date <span className="text-red-500">*</span></Label>
                <Input
                  type="date"
                  id="joining_date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  required
                  className="mt-2 bg-muted text-foreground border-border placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-1">
  <Button
    type="submit"
    disabled={isSubmitting}
    className="
      font-semibold px-6 py-2 rounded-md
      bg-white text-black
      dark:bg-gray-100 dark:text-gray-900
      border border-gray-300
      shadow-sm
      transition-colors
      hover:bg-gray-200 dark:hover:bg-gray-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    {isSubmitting ? "Adding..." : "Add User"}
  </Button>

  <Button
    type="button"
    onClick={handleCancel}
    className="
      font-semibold px-6 py-2 rounded-md
      bg-gray-100 text-gray-700
      dark:bg-black dark:text-gray-200
      border border-gray-300
      shadow-sm
      transition-colors
      hover:bg-gray-200 dark:hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
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
