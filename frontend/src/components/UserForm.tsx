"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  address: z.string().min(1, "Address is required"),
  accountNumber: z.string().min(1, "Bank Account Number is required"),
  ifsc: z.string().min(1, "IFSC Code is required"),
  branch: z.string().min(1, "Branch is required"),
  joiningDate: z.string().min(1, "Joining Date is required"),
});

type FormData = z.infer<typeof formSchema>;

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // TODO: connect to Strapi API later
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 shadow rounded-lg"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <Input {...register("name")} placeholder="Enter full name" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <Input type="date" {...register("dob")} />
        {errors.dob && (
          <p className="text-red-500 text-sm">{errors.dob.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <Textarea {...register("address")} placeholder="Enter address" />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Bank Account Number</label>
        <Input {...register("accountNumber")} placeholder="Account Number" />
        {errors.accountNumber && (
          <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">IFSC Code</label>
        <Input {...register("ifsc")} placeholder="IFSC Code" />
        {errors.ifsc && (
          <p className="text-red-500 text-sm">{errors.ifsc.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Branch</label>
        <Input {...register("branch")} placeholder="Branch Name" />
        {errors.branch && (
          <p className="text-red-500 text-sm">{errors.branch.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Joining Date</label>
        <Input type="date" {...register("joiningDate")} />
        {errors.joiningDate && (
          <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
