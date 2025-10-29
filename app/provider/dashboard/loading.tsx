export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9fafc] flex">
      <div className="w-64 hidden md:block" />
      <div className="flex-1">
        <div className="h-16 border-b bg-white shadow-sm" />
        <div className="p-6 space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-white border rounded shadow-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


