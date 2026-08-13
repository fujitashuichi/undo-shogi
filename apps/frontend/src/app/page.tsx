"use client";

import { SocketStatusView } from "@/features/online/Components/ws/SocketStatusView";
import { ShogiErrorProvider } from "@/features/online/context/gameStatus/contexts/ErrorProvider";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ShogiErrorProvider>
          <SocketStatusView />
        </ShogiErrorProvider>
      </main>
    </div>
  );
}
