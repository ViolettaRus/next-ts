import { revalidatePath } from "next/cache";

export const revalidate = 60;

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json() as Promise<Array<{ id: number; name: string }>>;
}

async function revalidateUsers() {
  "use server";
  revalidatePath("/analytics/@users");
}

export default async function UsersSlot() {
  const users = await getUsers();
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold">Users (ISR)</h2>
        <span className="text-xs text-slate-500">Rendered at {timestamp}</span>
      </div>

      <p className="text-xs text-slate-500">
        Данные кэшируются через <code>force-cache</code> и переобновляются не чаще,
        чем раз в 60 секунд.
      </p>

      <ul className="space-y-1 text-sm">
        {users.slice(0, 5).map((user) => (
          <li key={user.id} className="truncate">
            {user.name}
          </li>
        ))}
      </ul>

      <form action={revalidateUsers}>
        <button
          type="submit"
          className="mt-2 rounded-md bg-sky-600 px-3 py-1 text-xs font-medium text-white shadow hover:bg-sky-700"
        >
          Revalidate Users
        </button>
      </form>
    </div>
  );
}

