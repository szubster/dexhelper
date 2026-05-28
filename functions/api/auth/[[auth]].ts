import { Auth } from "@auth/core";
import GoogleProvider from "@auth/core/providers/google";

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  return Auth(request, {
    basePath: "/api/auth",
    providers: [
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: env.AUTH_SECRET,
    trustHost: true,
  });
};
