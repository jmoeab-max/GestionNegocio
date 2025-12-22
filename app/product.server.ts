import type { Product } from "@prisma/client";
import { prisma } from "./db.server";

export function getProductById({ id }: Pick<Product, "id">) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function createProduct({
  name,
  description,
  price,
  sku,
  stock,
}: Pick<Product, "name" | "description" | "price" | "sku" | "stock">) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      sku,
      stock,
    },
  });
}

export function updateProduct({
  id,
  name,
  description,
  price,
  sku,
  stock,
}: Pick<Product, "id" | "name" | "description" | "price" | "sku" | "stock">) {
  return prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      sku,
      stock,
    },
  });
}

export function deleteProduct({ id }: Pick<Product, "id">) {
  return prisma.product.delete({
    where: { id },
  });
}
