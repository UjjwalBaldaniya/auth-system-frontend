export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 relative">
      <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative z-10 w-full max-w-md p-4 sm:p-0">
        <div className="flex justify-center mb-4">logo</div>
        {children}
      </div>
    </div>
  );
}
