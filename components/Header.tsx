import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="text-lg font-semibold">My Next App</span>
        <ul className="flex gap-4 text-sm font-medium">
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
            <Link href="/blog" prefetch>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

