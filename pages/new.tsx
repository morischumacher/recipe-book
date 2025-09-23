// pages/new.tsx
import { useState } from 'react';
import Layout from '@/components/Layout';

export default function NewRecipe() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    ingredients: '',
    steps: '',
  });
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to save');
      }
      const data = await res.json();
      setSavedId(data.id);
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  function Field({
    label,
    as = 'input',
    rows,
    name,
    placeholder,
    required = true,
  }: {
    label: string;
    as?: 'input' | 'textarea';
    rows?: number;
    name: keyof typeof form;
    placeholder?: string;
    required?: boolean;
  }) {
    const commonProps = {
      className: 'search',
      placeholder: placeholder || label,
      value: form[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [name]: e.target.value }),
      required,
    };

    return (
      <label style={{ display: 'grid', gap: 8 }}>
        <span className="small">{label}</span>
        {as === 'textarea' ? (
          <textarea {...(commonProps as any)} rows={rows ?? 4} />
        ) : (
          <input {...(commonProps as any)} />
        )}
      </label>
    );
  }

  return (
    <Layout>
      <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="kicker">Upload</div>
        <h1 className="h1">Add a new recipe</h1>
        <p className="p">
          Fill the form below. Put each ingredient and each step on its own line.
        </p>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          <Field label="Title" name="title" />
          <Field label="Category" name="category" placeholder="e.g. Pasta, Dessert, Breakfast" />
          <Field label="Short description" name="description" as="textarea" rows={3} />
          <Field label="Ingredients (one per line)" name="ingredients" as="textarea" rows={6} />
          <Field label="Steps (one per line)" name="steps" as="textarea" rows={6} />

          {error && (
            <div className="badge" role="alert">
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="button" type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save recipe'}
            </button>
            {savedId && (
              <>
                <a className="btn" href={`/recipes/${savedId}`}>
                  Open recipe →
                </a>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/recipes/${savedId}`
                    )
                  }
                >
                  Copy link
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}
