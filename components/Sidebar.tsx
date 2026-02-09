import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-gray-100 border-r border-gray-200 px-4 py-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Dashboard</h2>
      <ul className="space-y-2 text-sm text-gray-700">
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

