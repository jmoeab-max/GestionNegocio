import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import {
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "~/appointment.server";
import { getAllClients } from "~/client.server";
import { getAllServices } from "~/service.server";
import { getAllUsers } from "~/user.server";
import type { Appointment, Client, Service, User } from "@prisma/client";
import { requireUserId } from "~/auth.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const appointment = await getAppointmentById({ id: params.appointmentId! });
  if (!appointment) {
    throw new Response("Not Found", { status: 404 });
  }
  const clients = await getAllClients();
  const services = await getAllServices();
  const users = await getAllUsers();
  return json({ appointment, clients, services, users });
}

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "update") {
    await updateAppointment({
      id: params.appointmentId!,
      clientId: values.clientId as string,
      serviceId: values.serviceId as string,
      employeeId: values.employeeId as string,
      startTime: new Date(values.startTime as string),
      endTime: new Date(values.endTime as string),
    });
    return redirect(`/appointments/${params.appointmentId}`);
  }

  if (_action === "delete") {
    await deleteAppointment({ id: params.appointmentId! });
    return redirect("/appointments");
  }
}

export default function AppointmentDetailsPage() {
  const { appointment, clients, services, users } = useLoaderData() as { appointment: Appointment, clients: Client[], services: Service[], users: User[] };
  const params = useParams();

  return (
    <Form method="post" className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden group/design-root">
      <header className="sticky top-0 z-20 flex items-center bg-white/90 dark:bg-[#1a2632]/90 backdrop-blur-md p-4 border-b border-gray-200 dark:border-gray-800 justify-between">
        <Link to="/appointments" className="text-primary text-[17px] font-normal leading-normal hover:opacity-70 transition-opacity flex w-20 justify-start">
          Cancelar
        </Link>
        <h1 className="text-[#111418] dark:text-white text-[17px] font-bold leading-tight tracking-[-0.015em] text-center flex-1">
          Editar Cita
        </h1>
        <button type="submit" name="_action" value="update" className="text-primary text-[17px] font-bold leading-normal hover:opacity-70 transition-opacity flex w-20 justify-end">
          Guardar
        </button>
      </header>
      <main className="flex-1 flex flex-col gap-6 p-4 pb-12 max-w-lg mx-auto w-full">
        <section className="flex flex-col gap-2">
          <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-[#617589] dark:text-gray-400">
            Cliente
          </h3>
          <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-gray-800">
            <select name="clientId" defaultValue={appointment.clientId} className="w-full bg-transparent border-0 p-4 text-[#111418] dark:text-white placeholder:text-gray-400 focus:ring-0 resize-none text-[17px] leading-relaxed">
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
            <select name="serviceId" defaultValue={appointment.serviceId} className="w-full bg-transparent border-0 p-4 text-[#111418] dark:text-white placeholder:text-gray-400 focus:ring-0 resize-none text-[17px] leading-relaxed">
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
            <select name="employeeId" defaultValue={appointment.employeeId} className="w-full bg-transparent border-0 p-4 text-[#111418] dark:text-white placeholder:text-gray-400 focus:ring-0 resize-none text-[17px] leading-relaxed">
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
              <input type="datetime-local" name="startTime" defaultValue={new Date(appointment.startTime).toISOString().slice(0, 16)} />
            </div>
            <div className="flex items-center justify-between p-3.5">
              <span className="text-[#111418] dark:text-white text-[17px] font-normal">Fin</span>
              <input type="datetime-local" name="endTime" defaultValue={new Date(appointment.endTime).toISOString().slice(0, 16)} />
            </div>
          </div>
        </section>
        <div className="mt-4">
          <button type="submit" name="_action" value="delete" className="w-full bg-white dark:bg-[#1a2632] text-red-600 text-[17px] font-semibold py-3.5 rounded-xl shadow-sm border border-transparent dark:border-gray-800 active:bg-gray-50 dark:active:bg-white/5 active:scale-[0.99] transition-all">
            Eliminar Cita
          </button>
        </div>
      </main>
    </Form>
  );
}
