import { LocalShogiProvider } from "@/features/local/contexts/LocalShogiProvider";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LocalShogiProvider>
      {children}
    </LocalShogiProvider>
  );
}
