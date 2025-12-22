import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "react-router-dom";
import { getAllServices } from "~/service.server";
import type { Service } from "@prisma/client";
import { requireUserId } from "~/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const services = await getAllServices();
  return json({ services });
}

export default function ServicesPage() {
  const { services } = useLoaderData() as { services: Service[] };
  return (
    <div className="relative flex min-h-screen w-full flex-col pb-20 max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
      <header className="sticky top-0 z-10 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#111418] dark:text-white">Catálogo</h1>
          <Link to="new" aria-label="Añadir nuevo" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all active:scale-95">
            <span className="material-symbols-outlined text-[28px]">add</span>
          </Link>
        </div>
        <div className="px-4 pb-3">
          <div className="relative flex w-full items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input className="block w-full rounded-xl border-none bg-gray-100 dark:bg-gray-800 py-2.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all" placeholder="Buscar servicios o productos..." type="text"/>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col w-full">
        <div className="px-4 py-4">
          <div className="flex p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
            <button className="flex-1 py-1.5 text-sm font-semibold rounded-lg shadow-sm bg-white dark:bg-surface-dark text-primary dark:text-primary transition-all">
              Servicios
            </button>
            <button className="flex-1 py-1.5 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all">
              Productos
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-6">
          {services.map((service) => (
            <Link to={service.id} key={service.id} className="group relative flex items-center gap-4 p-3 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer">
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-semibold text-[#111418] dark:text-white truncate pr-2">{service.name}</h4>
                  <span className="shrink-0 text-base font-bold text-primary">{service.price} €</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-[14px] mr-0.5">schedule</span>
                    {service.duration} min
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
