import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "react-router-dom";
import { getAllClients } from "~/client.server";
import type { Client } from "@prisma/client";
import { requireUserId } from "~/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const clients = await getAllClients();
  return json({ clients });
}

export default function ClientsPage() {
  const { clients } = useLoaderData() as { clients: Client[] };
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display h-screen flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#16202a] border-b border-slate-100 dark:border-slate-800 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-[#111418] dark:text-white flex items-center justify-center active:scale-95 transition-transform">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold leading-tight tracking-tight">Gestión de Clientes</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[#111418] dark:text-white flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar relative scroll-smooth">
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#16202a]/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="px-4 py-3">
            <label className="flex flex-col h-11 w-full group">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-[#f0f2f4] dark:bg-[#1e2936] transition-colors overflow-hidden group-focus-within:ring-2 group-focus-within:ring-primary/20">
                <div className="text-[#617589] dark:text-gray-400 flex items-center justify-center pl-3 pr-2">
                  <span className="material-symbols-outlined text-[22px]">search</span>
                </div>
                <input className="flex w-full min-w-0 flex-1 resize-none bg-transparent text-[#111418] dark:text-white focus:outline-none placeholder:text-[#617589] dark:placeholder:text-gray-500 px-2 text-[15px] font-normal leading-normal border-none focus:ring-0" placeholder="Buscar por nombre, teléfono..."/>
                <div className="text-[#617589] dark:text-gray-400 flex items-center justify-center pr-3 pl-2 cursor-pointer hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
              </div>
            </label>
          </div>
          <div className="flex gap-2 px-4 pb-2 overflow-x-auto no-scrollbar">
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-4 shadow-sm shadow-blue-500/20 active:scale-95 transition-all">
              <span className="text-sm font-medium">Todos</span>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1e2936] border border-gray-200 dark:border-slate-700 px-4 active:scale-95 transition-all hover:border-primary/50">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-medium">Activos</span>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1e2936] border border-gray-200 dark:border-slate-700 px-4 active:scale-95 transition-all hover:border-primary/50">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-medium">Pendientes</span>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1e2936] border border-gray-200 dark:border-slate-700 px-4 active:scale-95 transition-all hover:border-primary/50">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-medium">Recientes</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col pb-24">
          <div className="px-5 pt-5 pb-2">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Esta semana</p>
          </div>
          {clients.map((client: Client) => (
            <Link to={client.id} key={client.id} className="group relative flex items-center gap-4 bg-white dark:bg-[#16202a] px-4 py-3.5 border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50 dark:hover:bg-[#1c2835] transition-colors cursor-pointer">
              <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 shrink-0 relative ring-2 ring-white dark:ring-[#16202a]">
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#16202a]"></div>
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-[#111418] dark:text-white text-[15px] font-bold leading-normal truncate">{client.name} {client.lastName}</p>
                  <span className="text-xs text-gray-400 font-medium">Hace 2h</span>
                </div>
                <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal truncate">Última visita: 12 Oct • <span className="text-emerald-600 dark:text-emerald-400 font-medium">Activo</span></p>
              </div>
              <button className="shrink-0 h-9 w-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </button>
            </Link>
          ))}
        </div>
      </main>
      <div className="absolute bottom-20 right-4 z-20">
        <Link to="new" className="h-14 w-14 bg-primary rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center text-white hover:bg-blue-600 active:scale-90 transition-all group">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
        </Link>
      </div>
    </div>
  );
}
