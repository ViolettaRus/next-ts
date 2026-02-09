export default async function AnalyticsLayout({
  children,
  users,
  posts,
  comments,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  posts: React.ReactNode;
  comments: React.ReactNode;
}) {
  return (
    <div>
      <h1>Live Dashboard</h1>
      <div>{children}</div>
      <div>
        {users}
        {posts}
        {comments}
      </div>
    </div>
  );
}
