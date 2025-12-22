import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "react-router-dom";
import { getUserByEmail } from "~/user.server";
import { getSession, commitSession } from "~/session.server";
import bcrypt from "bcryptjs";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  const user = await getUserByEmail(email as string);
  const isCorrectPassword = user && (await bcrypt.compare(password as string, user.password));

  if (!user || !isCorrectPassword) {
    return json({ error: "Invalid email or password" }, { status: 400 });
  }

  session.set("userId", user.id);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginPage() {
  const actionData = useActionData() as { error?: string };
  const [searchParams] = useSearchParams();
  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={searchParams.get("redirectTo") ?? undefined} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Sign in
          </button>
          {actionData?.error && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.error}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
