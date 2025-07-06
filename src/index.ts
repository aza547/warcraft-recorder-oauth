import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import { issuer } from "@openauthjs/openauth"
import subjects from "./subjects"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"
import { Theme } from "@openauthjs/openauth/ui/theme"

interface Env {
  OpenAuthKV: KVNamespace
}

const getUser = async (email: string) => {
  // Get user from database
  // Return user ID
  return "123"
}

const fetch = async (request: Request, env: Env, ctx: ExecutionContext) => {
  const theme: Theme = {
    title: "Warcraft Recorder",
    favicon: "https://assets.warcraftrecorder.com/icon.png",
    logo: {
      dark: "https://assets.warcraftrecorder.com/icon.png",
      light: "https://assets.warcraftrecorder.com/icon.png",
    },
    background: "#1C1C1C",
    primary: "#BB4420",
    font: {
      family: "Rubik, sans-serif",
    },
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@100;200;300;400;500;600;700;800;900&display=swap');
    `,
  }

  const storage = CloudflareStorage({ namespace: env.OpenAuthKV });

  const providers = {
    password: PasswordProvider(
      PasswordUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
      }),
    ),
  };
  
  const iss = issuer({
    storage,
    subjects,
    providers,
    theme,
    success: async (ctx, value) => {
      if (value.provider !== "password") {
        throw new Error("Invalid provider");
      }

      return ctx.subject("user", {
        userName: await getUser(value.email),
      })
    },
  });

  return iss.fetch(request, env, ctx)
}

export default { fetch };