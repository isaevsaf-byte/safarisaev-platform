import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
            <div className="mb-6 font-mono text-9xl text-accent">404</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
                Page Not Found
            </h1>
            <p className="text-lg text-secondary mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-8 py-4 border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-background transition-colors font-mono text-sm"
            >
                RETURN TO TERMINAL
            </Link>
        </div>
    );
}
