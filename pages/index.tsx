// pages/index.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

type Recipe = { id: number; title: string; category: string; description: string; createdAt: string };
type Category = { name: string; count: number };

export default function Home() {
  const [latest, setLatest] = useState<Recipe | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/recipes?search=')
      .then((r) => r.json())
      .then((list: Recipe[]) => setLatest(list[0] || null));

    fetch('/api/categories')
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  return (
    <Layout>
      <div className="grid" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="kicker">Welcome</div>
          <h2 className="h1">Your personal recipe hub</h2>
          <p className="p">Browse by category, open a recipe for a clean detail view, or add a new one.</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
            <Link className="button" href="/new">Add a recipe</Link>
            {latest && (
              <Link className="btn" href={`/recipes/${latest.id}`}>
                Latest: {latest.title} →
              </Link>
            )}
          </div>
        </div>

        {latest && (
          <Link href={`/recipes/${latest.id}`} className="card">
            <div className="kicker">Latest upload</div>
            <div className="badge">#{latest.category}</div>
            <h3 className="h1" style={{ fontSize: 22, marginTop: 8 }}>{latest.title}</h3>
            <p className="p">{latest.description}</p>
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 className="h1" style={{ fontSize: 22 }}>Categories</h3>
        <span className="small">
          {categories.reduce((a, c) => a + c.count, 0)} total recipes
        </span>
      </div>

      <div className="grid">
        {categories.map((c) => (
          <Link
            key={c.name}
            href={`/categories/${encodeURIComponent(c.name)}`}
            className="card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>#{c.name}</div>
              <span className="badge">{c.count} recipes</span>
            </div>
            <p className="p" style={{ marginTop: 8 }}>Browse all {c.name} recipes.</p>
          </Link>
        ))}
        {categories.length === 0 && <p className="p">No categories yet. Add your first recipe!</p>}
      </div>
    </Layout>
  );
}
