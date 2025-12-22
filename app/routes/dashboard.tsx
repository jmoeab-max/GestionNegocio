import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "react-router-dom";
import { getSession } from "~/session.server";
import { getUserById } from "~/user.server";
import type { User } from "@prisma/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) {
    return json({ user: null });
  }
  const user = await getUserById(userId);
  return json({ user });
}

export default function DashboardPage() {
  const { user } = useLoaderData() as { user: User | null };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-24">
        <header className="sticky top-0 z-20 bg-card-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-text-main-light dark:text-white text-lg font-bold leading-tight">Hola, {user?.name || 'Usuario'}</h2>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">Dueño de Negocio</p>
            </div>
          </div>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </header>
        <main className="flex flex-col gap-6 p-4">
          <section className="flex flex-col gap-3">
            <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 no-scrollbar -mx-4 px-4 snap-x">
              <div className="snap-start flex min-w-[160px] flex-1 flex-col gap-2 rounded-xl p-4 bg-card-light dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Ventas (Mes)</span>
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>payments</span>
                </div>
                <p className="text-text-main-light dark:text-white text-2xl font-bold tracking-tight">5.250 €</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                  <p className="text-green-600 text-xs font-bold">+5% vs mes ant.</p>
                </div>
              </div>
              <div className="snap-start flex min-w-[160px] flex-1 flex-col gap-2 rounded-xl p-4 bg-card-light dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Citas Hoy</span>
                  <span className="material-symbols-outlined text-purple-500" style={{ fontSize: '20px' }}>event</span>
                </div>
                <p className="text-text-main-light dark:text-white text-2xl font-bold tracking-tight">5</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">2 pendientes</p>
              </div>
              <div className="snap-start flex min-w-[160px] flex-1 flex-col gap-2 rounded-xl p-4 bg-card-light dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Ganancias</span>
                  <span className="material-symbols-outlined text-green-600" style={{ fontSize: '20px' }}>savings</span>
                </div>
                <p className="text-text-main-light dark:text-white text-2xl font-bold tracking-tight">2.100 €</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                  <p className="text-green-600 text-xs font-bold">+12% margen</p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-text-main-light dark:text-white text-lg font-bold leading-tight">Accesos Rápidos</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <Link to="/clients" className="flex flex-col items-center gap-2 group">
                <div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center transition-transform group-active:scale-95">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>groups</span>
                </div>
                <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Clientes</span>
              </Link>
              <Link to="/services" className="flex flex-col items-center gap-2 group">
                <div className="size-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center transition-transform group-active:scale-95">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400" style={{ fontSize: '28px' }}>inventory_2</span>
                </div>
                <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Servicios</span>
              </Link>
              <Link to="/appointments" className="flex flex-col items-center gap-2 group">
                <div className="size-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center transition-transform group-active:scale-95">
                  <span className="material-symbols-outlined text-orange-600 dark:text-orange-400" style={{ fontSize: '28px' }}>receipt_long</span>
                </div>
                <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Citas</span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
