// pages/categories/[name].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

type Recipe = {
    id: number;
    title: string;
    category: string;
    description: string;
    createdAt: string;
};

export default function CategoryView() {
    const router = useRouter();
    const { name } = router.query;
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (!name) return;
        fetch(`/api/recipes?category=${encodeURIComponent(String(name))}`)
            .then((r) => r.json())
            .then(setRecipes);
    }, [name]);

    return (
        <Layout>
            <div className="kicker">Category</div>
            <h1 className="h1">#{name}</h1>

            <div className="masonry" style={{ marginTop: 16 }}>
                {recipes.map((r) => (
                    <Link key={r.id} href={`/recipes/${r.id}`} className="card recipe-card">
                        <span className="badge">{new Date(r.createdAt).toLocaleDateString()}</span>
                        <div className="recipe-title">{r.title}</div>
                        <p className="p">{r.description}</p>
                    </Link>
                ))}
                {recipes.length === 0 && <p className="p">No recipes here yet.</p>}
            </div>
        </Layout>
    );
}
