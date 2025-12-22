import type { Service } from "@prisma/client";
import { prisma } from "./db.server";

export function getServiceById({ id }: Pick<Service, "id">) {
  return prisma.service.findUnique({
    where: { id },
  });
}

export function getAllServices() {
  return prisma.service.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function createService({
  name,
  description,
  price,
  duration,
}: Pick<Service, "name" | "description" | "price" | "duration">) {
  return prisma.service.create({
    data: {
      name,
      description,
      price,
      duration,
    },
  });
}

export function updateService({
  id,
  name,
  description,
  price,
  duration,
}: Pick<Service, "id" | "name" | "description" | "price" | "duration">) {
  return prisma.service.update({
    where: { id },
    data: {
      name,
      description,
      price,
      duration,
    },
  });
}

export function deleteService({ id }: Pick<Service, "id">) {
  return prisma.service.delete({
    where: { id },
  });
}
