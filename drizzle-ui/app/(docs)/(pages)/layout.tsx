import "@/styles/typography.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="typography m-auto !max-w-3xl p-3">{children}</div>;
}
