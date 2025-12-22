import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "react-router-dom";
import { createService } from "~/service.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { name, description, price, duration } = Object.fromEntries(formData);

  const service = await createService({
    name: name as string,
    description: description as string,
    price: parseFloat(price as string),
    duration: parseInt(duration as string),
  });

  return redirect(`/services/${service.id}`);
}

export default function NewServicePage() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post" className="w-full max-w-md bg-background-light dark:bg-background-dark min-h-screen relative flex flex-col shadow-xl">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <Link to="/services" className="text-slate-500 dark:text-slate-400 text-base font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          Cancelar
        </Link>
        <h1 className="text-lg font-bold text-center flex-1 truncate px-2">Nuevo Servicio</h1>
        <button type="submit" className="text-primary text-base font-bold hover:text-blue-600 transition-colors">
          Guardar
        </button>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Información Básica</h3>
          <div className="flex flex-col gap-5">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Nombre del Servicio</span>
              <input name="name" className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark h-12 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" type="text" />
            </label>
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Precio</span>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">€</span>
                  <input name="price" className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark h-12 pl-8 pr-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" type="number" />
                </div>
              </label>
              <label className="flex flex-col flex-1">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Duración (min)</span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">schedule</span>
                  <input name="duration" className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark h-12 pl-10 pr-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" type="number" />
                </div>
              </label>
            </div>
            <label className="flex flex-col w-full">
              <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Descripción</span>
              <textarea name="description" className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark min-h-[100px] p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all"></textarea>
            </label>
          </div>
        </div>
      </main>
    </Form>
  );
}
