import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9fafc] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-6">The page you are looking for doesn’t exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">
          Go to Home
        </Link>
      </div>
    </div>
  );
}


