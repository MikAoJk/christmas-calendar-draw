import React from "react";
import WheelOfFortune from "../components/WheelOfFortune/WheelOfFortune";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12 font-mono">
            <WheelOfFortune/>
        </main>
    )
}
