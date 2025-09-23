// pages/recipes/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

type Recipe = {
    id: number;
    title: string;
    category: string;
    description: string;
    ingredients: string;
    steps: string;
    createdAt: string;
};

export default function RecipeDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/recipes/${id}`)
            .then((r) => r.json())
            .then(setRecipe);
    }, [id]);

    if (!recipe) {
        return (
            <Layout>
                <p>Loading…</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="kicker">
                Recipe • {new Date(recipe.createdAt).toLocaleDateString()}
            </div>
            <h1 className="h1">{recipe.title}</h1>
            <span className="badge">#{recipe.category}</span>

            <div className="detail" style={{ marginTop: 20 }}>
                <section className="section">
                    <h3>Description</h3>
                    <p className="p">{recipe.description}</p>

                    <h3>Ingredients</h3>
                    <ul className="clean">
                        {recipe.ingredients.split('\n').map((line, i) => (
                            <li key={i}>{line}</li>
                        ))}
                    </ul>

                    <h3>Steps</h3>
                    <ol>
                        {recipe.steps.split('\n').map((line, i) => (
                            <li key={i} style={{ margin: '8px 0' }}>
                                {line}
                            </li>
                        ))}
                    </ol>
                </section>

                <aside className="section">
                    <h3>Share</h3>
                    <p className="p">Send this link to friends to view the details.</p>
                    <button
                        className="button"
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                navigator.clipboard.writeText(window.location.href);
                            }
                        }}
                    >
                        Copy URL
                    </button>
                </aside>
            </div>
        </Layout>
    );
}
