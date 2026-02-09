import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="flex-1 space-y-6">{children}</div>
    </section>
  );
}

