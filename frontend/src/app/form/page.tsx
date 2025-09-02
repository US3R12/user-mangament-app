import { UserForm } from "@/components/UserForm";

export default function FormPage() {
  return (
    <section className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add User</h1>
      <UserForm />
    </section>
  );
}
