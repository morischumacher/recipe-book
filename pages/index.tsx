import { useState, useEffect } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`/api/recipes?search=${search}`)
      .then((res) => res.json())
      .then(setRecipes);
  }, [search]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🍲 My Recipe Book</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <ul>
        {recipes.map((r: any) => (
          <li key={r.id} className="p-4 mb-2 border rounded">
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <p className="text-sm text-gray-600">Category: {r.category}</p>
            <p>{r.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
