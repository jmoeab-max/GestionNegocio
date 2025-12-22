import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "react-router-dom";
import { createClient } from "~/client.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { name, lastName, email, phone } = Object.fromEntries(formData);

  const client = await createClient({
    name: name as string,
    lastName: lastName as string,
    email: email as string,
    phone: phone as string,
  });

  return redirect(`/clients/${client.id}`);
}

export default function NewClientPage() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post" className="relative flex h-full w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark h-screen shadow-2xl overflow-hidden">
      <div className="flex items-center bg-white dark:bg-[#1a2632] p-4 pb-2 border-b border-slate-200 dark:border-slate-800 justify-between shrink-0 z-10">
        <div className="flex w-16 items-center justify-start">
          <Link to="/clients" className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal tracking-[0.015em] shrink-0 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            Cancelar
          </Link>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center flex-1 truncate">Nuevo Cliente</h2>
        <div className="flex w-16 items-center justify-end">
          <button type="submit" className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0 hover:text-blue-600 transition-colors">
            Guardar
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-10">
        <div className="flex p-6 @container justify-center bg-white dark:bg-[#1a2632] mb-4">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="flex gap-3 flex-col items-center">
              <div className="relative group cursor-pointer">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 border-4 border-slate-100 dark:border-slate-700 shadow-sm">
                </div>
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-white dark:border-[#1a2632] flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[18px]">photo_camera</span>
                </div>
              </div>
              <p className="text-primary text-sm font-semibold leading-tight tracking-[-0.015em] text-center cursor-pointer">Cambiar foto</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight px-4 text-left pb-2 pt-2">Datos Personales</h3>
          <div className="bg-white dark:bg-[#1a2632] border-y border-slate-200 dark:border-slate-800 sm:rounded-lg sm:border-x sm:mx-4 sm:border-slate-200 dark:sm:border-slate-800">
            <div className="flex flex-col px-4 py-2">
              <label className="flex flex-col w-full border-b border-slate-100 dark:border-slate-700 pb-3 last:border-0 pt-2">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide pb-1.5">Nombre</p>
                <input name="name" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-10 placeholder:text-slate-400 p-3 text-base font-normal leading-normal transition-all" />
              </label>
              <label className="flex flex-col w-full border-b border-slate-100 dark:border-slate-700 pb-3 last:border-0 pt-2">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide pb-1.5">Apellidos</p>
                <input name="lastName" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-10 placeholder:text-slate-400 p-3 text-base font-normal leading-normal transition-all" />
              </label>
              <label className="flex flex-col w-full pb-3 pt-2">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide pb-1.5">Fecha de Nacimiento</p>
                <div className="relative">
                  <input name="birthDate" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-10 placeholder:text-slate-400 px-3 text-base font-normal leading-normal transition-all" type="date" />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight px-4 text-left pb-2">Contacto</h3>
          <div className="bg-white dark:bg-[#1a2632] border-y border-slate-200 dark:border-slate-800 sm:rounded-lg sm:border-x sm:mx-4 sm:border-slate-200 dark:sm:border-slate-800">
            <div className="flex flex-col px-4 py-2">
              <div className="flex gap-3 items-end w-full border-b border-slate-100 dark:border-slate-700 pb-3 pt-2">
                <label className="flex flex-col flex-1 min-w-0">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide pb-1.5">Teléfono</p>
                  <input name="phone" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-10 placeholder:text-slate-400 p-3 text-base font-normal leading-normal transition-all" type="tel" />
                </label>
                <button className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
              </div>
              <div className="flex gap-3 items-end w-full border-b border-slate-100 dark:border-slate-700 pb-3 pt-2">
                <label className="flex flex-col flex-1 min-w-0">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide pb-1.5">Correo electrónico</p>
                  <input name="email" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-10 placeholder:text-slate-400 p-3 text-base font-normal leading-normal transition-all" type="email" />
                </label>
                <button className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </button>
              </div>
              <label className="flex flex-col w-full pb-3 pt-2">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide pb-1.5">Dirección</p>
                <textarea name="address" className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary min-h-[80px] placeholder:text-slate-400 p-3 text-base font-normal leading-normal transition-all"></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
