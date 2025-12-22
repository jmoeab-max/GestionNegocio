import type { Client } from "@prisma/client";
import { prisma } from "./db.server";

export function getClientById({ id }: Pick<Client, "id">) {
  return prisma.client.findUnique({
    where: { id },
  });
}

export function getAllClients() {
  return prisma.client.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function createClient({
  email,
  name,
  lastName,
  phone,
}: Pick<Client, "email" | "name" | "lastName" | "phone">) {
  return prisma.client.create({
    data: {
      email,
      name,
      lastName,
      phone,
    },
  });
}

export function updateClient({
  id,
  email,
  name,
  lastName,
  phone,
}: Pick<Client, "id" | "email" | "name" | "lastName" | "phone">) {
  return prisma.client.update({
    where: { id },
    data: {
      email,
      name,
      lastName,
      phone,
    },
  });
}

export function deleteClient({ id }: Pick<Client, "id">) {
  return prisma.client.delete({
    where: { id },
  });
}
