import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "react-router-dom";
import { getAllAppointments } from "~/appointment.server";
import type { Appointment } from "@prisma/client";
import { requireUserId } from "~/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const appointments = await getAllAppointments();
  return json({ appointments });
}

export default function AppointmentsPage() {
  const { appointments } = useLoaderData() as { appointments: Appointment[] };
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white h-screen flex flex-col overflow-hidden">
      <header className="flex items-center bg-surface-light dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shrink-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-[#111418] dark:text-white">
          <Link to="/dashboard" className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </Link>
        </div>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Octubre 2023
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button aria-label="Ir a hoy" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">calendar_today</span>
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 py-2">
          <h3 className="text-[#111418] dark:text-white text-base font-bold leading-tight mb-4">Jueves, 5 de Octubre</h3>
          <div className="flex flex-col gap-4 relative">
            <div className="absolute left-[52px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700 z-0"></div>
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex gap-4 relative z-10">
                <div className="w-[45px] shrink-0 text-right">
                  <p className="text-[#617589] dark:text-gray-500 text-xs font-medium translate-y-3">{new Date(appointment.startTime).toLocaleTimeString()}</p>
                  <p className="text-[#9aaab9] dark:text-gray-600 text-[10px] mt-0.5">45m</p>
                </div>
                <div className="flex-1 bg-white dark:bg-surface-dark rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none dark:border dark:border-gray-700 border-l-4 border-l-primary overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-[#111418] dark:text-white text-sm font-bold leading-normal truncate">{appointment.serviceId}</p>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded ml-2 shrink-0">Confirmado</span>
                      </div>
                      <p className="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal truncate">{appointment.clientId}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link to="new" className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center text-white z-40 active:scale-95 transition-transform">
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>
    </div>
  );
}
