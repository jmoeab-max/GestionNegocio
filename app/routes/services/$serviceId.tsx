import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import {
  getServiceById,
  updateService,
  deleteService,
} from "~/service.server";
import type { Service } from "@prisma/client";
import { requireUserId } from "~/auth.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const service = await getServiceById({ id: params.serviceId! });
  if (!service) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ service });
}

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "update") {
    await updateService({
      id: params.serviceId!,
      name: values.name as string,
      description: values.description as string,
      price: parseFloat(values.price as string),
      duration: parseInt(values.duration as string),
    });
    return redirect(`/services/${params.serviceId}`);
  }

  if (_action === "delete") {
    await deleteService({ id: params.serviceId! });
    return redirect("/services");
  }
}

export default function ServiceDetailsPage() {
  const { service } = useLoaderData() as { service: Service };
  const params = useParams();

  return (
    <Form method="post" className="w-full max-w-md bg-background-light dark:bg-background-dark min-h-screen relative flex flex-col shadow-xl">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <Link to="/services" className="text-slate-500 dark:text-slate-400 text-base font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          Cancelar
        </Link>
        <h1 className="text-lg font-bold text-center flex-1 truncate px-2">Editar Servicio</h1>
        <button type="submit" name="_action" value="update" className="text-primary text-base font-bold hover:text-blue-600 transition-colors">
          Guardar
        </button>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Información Básica</h3>
          <div className="flex flex-col gap-5">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Nombre del Servicio</span>
              <input name="name" defaultValue={service.name} className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark h-12 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" type="text" />
            </label>
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Precio</span>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">€</span>
                  <input name="price" defaultValue={service.price} className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark h-12 pl-8 pr-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" type="number" />
                </div>
              </label>
              <label className="flex flex-col flex-1">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Duración (min)</span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">schedule</span>
                  <input name="duration" defaultValue={service.duration} className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark h-12 pl-10 pr-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" type="number" />
                </div>
              </label>
            </div>
            <label className="flex flex-col w-full">
              <span className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Descripción</span>
              <textarea name="description" defaultValue={service.description!} className="flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark min-h-[100px] p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all"></textarea>
            </label>
          </div>
        </div>
        <div className="px-4 mt-4 mb-8">
          <button type="submit" name="_action" value="delete" className="flex w-full items-center justify-center gap-2 h-12 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
            <span className="material-symbols-outlined text-[20px]">delete</span>
            Eliminar Servicio
          </button>
        </div>
      </main>
    </Form>
  );
}
