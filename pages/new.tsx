import { useState } from "react";
import { useRouter } from "next/router";

export default function NewRecipe() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
