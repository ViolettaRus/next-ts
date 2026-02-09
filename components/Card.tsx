type CardProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="text-base text-gray-900 leading-relaxed">{children}</div>
    </div>
  );
}

