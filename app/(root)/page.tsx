import Image from "next/image";

import { Button } from "@/components/ui/button";
import TestFetch from "@/components/TestFetch";

export default function Home() {
  return (
    <main className="p-40 text-2xl text-blue-600 bg-red-200 h-80">
      <p>testing123npm</p>
      <Button size="lg">testing</Button>
      <TestFetch />
    </main>
  );
}
