import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "react-router-dom";
import { createAppointment } from "~/appointment.server";
import { getAllClients } from "~/client.server";
import { getAllServices } from "~/service.server";
import { getAllUsers } from "~/user.server";
import type { Client, Service, User } from "@prisma/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const clients = await getAllClients();
  const services = await getAllServices();
  const users = await getAllUsers();
  return json({ clients, services, users });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { clientId, serviceId, employeeId, startTime, endTime } = Object.fromEntries(formData);

  const appointment = await createAppointment({
    clientId: clientId as string,
    serviceId: serviceId as string,
    employeeId: employeeId as string,
    startTime: new Date(startTime as string),
    endTime: new Date(endTime as string),
  });

  return redirect(`/appointments/${appointment.id}`);
}

export default function NewAppointmentPage() {
  const { clients, services, users } = useLoaderData() as { clients: Client[], services: Service[], users: User[] };

  return (
    <Form method="post" className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden group/design-root">
      <header className="sticky top-0 z-20 flex items-center bg-white/90 dark:bg-[#1a2632]/90 backdrop-blur-md p-4 border-b border-gray-200 dark:border-gray-800 justify-between">
        <Link to="/appointments" className="text-primary text-[17px] font-normal leading-normal hover:opacity-70 transition-opacity flex w-20 justify-start">
          Cancelar
        </Link>
        <h1 className="text-[#111418] dark:text-white text-[17px] font-bold leading-tight tracking-[-0.015em] text-center flex-1">
          Nueva Cita
        </h1>
        <button type="submit" className="text-primary text-[17px] font-bold leading-normal hover:opacity-70 transition-opacity flex w-20 justify-end">
          Guardar
        </button>
      </header>
      <main className="flex-1 flex flex-col gap-6 p-4 pb-12 max-w-lg mx-auto w-full">
        <section className="flex flex-col gap-2">
          <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-[#617589] dark:text-gray-400">
            Cliente
          </h3>
          <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-gray-800">
            <select name="clientId" className="w-full bg-transparent border-0 p-4 text-[#111418] dark:text-white placeholder:text-gray-400 focus:ring-0 resize-none text-[17px] leading-relaxed">
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-[#617589] dark:text-gray-400">
            Servicio
          </h3>
          <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-gray-800">
            <select name="serviceId" className="w-full bg-transparent border-0 p-4 text-[#111418] dark:text-white placeholder:text-gray-400 focus:ring-0 resize-none text-[17px] leading-relaxed">
              {services.map((service) => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-[#617589] dark:text-gray-400">
            Empleado
          </h3>
          <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-gray-800">
            <select name="employeeId" className="w-full bg-transparent border-0 p-4 text-[#111418] dark:text-white placeholder:text-gray-400 focus:ring-0 resize-none text-[17px] leading-relaxed">
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-[#617589] dark:text-gray-400">
            Fecha y Hora
          </h3>
          <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-700/50">
            <div className="flex items-center justify-between p-3.5">
              <span className="text-[#111418] dark:text-white text-[17px] font-normal">Inicio</span>
              <input type="datetime-local" name="startTime" />
            </div>
            <div className="flex items-center justify-between p-3.5">
              <span className="text-[#111418] dark:text-white text-[17px] font-normal">Fin</span>
              <input type="datetime-local" name="endTime" />
            </div>
          </div>
        </section>
      </main>
    </Form>
  );
}
