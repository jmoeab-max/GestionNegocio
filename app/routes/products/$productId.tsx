import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "~/product.server";
import type { Product } from "@prisma/client";
import { requireUserId } from "~/auth.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const product = await getProductById({ id: params.productId! });
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ product });
}

export async function action({ params, request }: ActionFunctionArgs) {
  await requireUserId(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "update") {
    await updateProduct({
      id: params.productId!,
      name: values.name as string,
      description: values.description as string,
      price: parseFloat(values.price as string),
      sku: values.sku as string,
      stock: parseInt(values.stock as string),
    });
    return redirect(`/products/${params.productId}`);
  }

  if (_action === "delete") {
    await deleteProduct({ id: params.productId! });
    return redirect("/products");
  }
}

export default function ProductDetailsPage() {
  const { product } = useLoaderData() as { product: Product };
  const params = useParams();

  return (
    <Form method="post" className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white dark:bg-background-dark shadow-xl">
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <div className="flex w-16 items-center justify-start">
          <Link to="/products" className="text-primary text-base font-normal leading-normal tracking-[0.015em] shrink-0">Cancelar</Link>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center flex-1">Editar Producto</h2>
        <div className="flex w-16 items-center justify-end">
          <button type="submit" name="_action" value="update" className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0">Guardar</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-4 space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Nombre del Producto</label>
              <input name="name" defaultValue={product.name} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] focus:border-primary h-12 placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all" type="text" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Descripción</label>
              <textarea name="description" defaultValue={product.description!} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] focus:border-primary min-h-[120px] placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Precio</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500">€</span>
                  <input name="price" defaultValue={product.price} className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] focus:border-primary h-12 pl-8 pr-4 text-base font-normal leading-normal transition-all" type="number" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Stock Actual</label>
                <input name="stock" defaultValue={product.stock} className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] focus:border-primary h-12 px-4 text-base font-normal leading-normal" type="number" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">SKU</label>
                <input name="sku" defaultValue={product.sku} className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] focus:border-primary h-12 px-4 text-base font-normal leading-normal" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 pb-8 flex flex-col gap-4">
          <button type="submit" name="_action" value="delete" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 text-base font-medium leading-normal tracking-[0.015em] transition-colors">
            <span className="truncate">Eliminar Producto</span>
          </button>
        </div>
      </div>
    </Form>
  );
}
