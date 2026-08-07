import { createServerFn } from "@tanstack/react-start";
import { translateTexts } from "./translate.server";

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator((data: { texts: string[]; languageName: string }) => ({
    texts: (data.texts ?? []).slice(0, 120).map((t) => String(t).slice(0, 1200)),
    languageName: String(data.languageName ?? "English"),
  }))
  .handler(async ({ data }) => ({ texts: await translateTexts(data.texts, data.languageName) }));
