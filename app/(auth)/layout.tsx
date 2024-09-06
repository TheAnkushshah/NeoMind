import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 h-full">
      <Link href="/dashboard" className="flex items-center">
        <div className="relative w-12 h-12 mr-3">
          <Image src="/logo.png" alt="Neo logo" fill />
        </div>

        <h1 className={cn("text-2xl font-bold", montserrat.className)}>
          NeoMind
        </h1>
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;