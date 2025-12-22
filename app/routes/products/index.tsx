import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "react-router-dom";
import { getAllProducts } from "~/product.server";
import type { Product } from "@prisma/client";
import { requireUserId } from "~/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const products = await getAllProducts();
  return json({ products });
}

export default function ProductsPage() {
  const { products } = useLoaderData() as { products: Product[] };
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen relative pb-24 text-[#111418] dark:text-white">
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] flex-1">Inventario</h2>
        <div className="flex items-center justify-end gap-3">
          <Link to="new" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-md hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined text-2xl">add</span>
          </Link>
        </div>
      </header>
      <main className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <Link to={product.id} key={product.id} className="group flex flex-col bg-white dark:bg-[#1a2634] rounded-xl p-3 shadow-sm border border-transparent hover:border-primary/20 transition-all">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0 flex flex-col h-20 justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-tight truncate">{product.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{product.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-sm font-bold">{product.price} €</p>
                    <p className="text-sm font-bold">{product.stock} en stock</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
