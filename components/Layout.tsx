// components/Layout.tsx
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="nav container">
                <Link href="/" className="brand">
                    my<span className="pill">Recipes</span>
                </Link>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Link href="/new" className="btn">
                        ➕ New Recipe
                    </Link>
                </div>
            </nav>
            <main className="container">{children}</main>
        </div>
    );
}
