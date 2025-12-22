import type { Appointment } from "@prisma/client";
import { prisma } from "./db.server";

export function getAppointmentById({ id }: Pick<Appointment, "id">) {
  return prisma.appointment.findUnique({
    where: { id },
  });
}

export function getAllAppointments() {
  return prisma.appointment.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function createAppointment({
  clientId,
  employeeId,
  serviceId,
  startTime,
  endTime,
}: Pick<Appointment, "clientId" | "employeeId" | "serviceId" | "startTime" | "endTime">) {
  return prisma.appointment.create({
    data: {
      client: { connect: { id: clientId } },
      employee: { connect: { id: employeeId } },
      service: { connect: { id: serviceId } },
      startTime,
      endTime,
    },
  });
}

export function updateAppointment({
  id,
  clientId,
  employeeId,
  serviceId,
  startTime,
  endTime,
}: Pick<Appointment, "id" | "clientId" | "employeeId" | "serviceId" | "startTime" | "endTime">) {
  return prisma.appointment.update({
    where: { id },
    data: {
      client: { connect: { id: clientId } },
      employee: { connect: { id: employeeId } },
      service: { connect: { id: serviceId } },
      startTime,
      endTime,
    },
  });
}

export function deleteAppointment({ id }: Pick<Appointment, "id">) {
  return prisma.appointment.delete({
    where: { id },
  });
}
