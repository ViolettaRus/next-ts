import Link from "next/link";
import UserPanel from "@/components/UserPanel";

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold text-slate-900">My Next App</span>
        <div className="flex items-center gap-6">
          <ul className="flex gap-4 text-sm font-medium text-slate-700">
            <li>
              <Link href="/" prefetch>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" prefetch>
                About
              </Link>
            </li>
            <li>
              <Link href="/dashboard" prefetch>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/users" prefetch>
                Users
              </Link>
            </li>
            <li>
              <Link href="/profile" prefetch>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/blog" prefetch>
                Blog
              </Link>
            </li>
          </ul>
          <UserPanel />
        </div>
      </nav>
    </header>
  );
}


