import Navbar from "./Navbar";
import {Props} from "../../types/carbonTypes"
export default function MainLayout({children}:Props){
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="fixed bottom-0 right-0 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/60">
          <Navbar />
        </header>
        <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}