import type { Config } from "drizzle-kit";
export default {
  driver: "better-sqlite",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migration",
  dbCredentials: {
    url: "./drizzle/taco.db",
  },
} satisfies Config;
