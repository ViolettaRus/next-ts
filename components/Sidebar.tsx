import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Dashboard</h2>
      <ul className="space-y-2 text-sm text-slate-800">
        <li>
          <Link href="/dashboard">Overview</Link>
        </li>
        <li>
          <Link href="/dashboard/posts">Posts (example)</Link>
        </li>
      </ul>
    </aside>
  );
}

