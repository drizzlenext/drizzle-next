export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose m-auto !max-w-3xl p-4 dark:prose-invert prose-pre:bg-[#0d1117]">
      {children}
    </div>
  );
}
