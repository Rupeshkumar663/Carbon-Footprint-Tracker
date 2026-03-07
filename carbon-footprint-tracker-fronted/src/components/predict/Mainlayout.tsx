import Sidebar from "../predict/Sidebar";
import Topbar from "../predict/Topbar";

export default function MainLayout({ children }: any) {

 return (

  <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

   {/* Sidebar */}
   <Sidebar />

   {/* Main Area */}
   <div className="flex-1 flex flex-col relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

    {/* Topbar */}
    <Topbar />

    {/* Page Content */}
    <main className="flex-1 p-10 overflow-y-auto">

     <div className="max-w-7xl mx-auto">

      {/* Glass Container */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

       {children}

      </div>

     </div>

    </main>

   </div>

  </div>

 );
}