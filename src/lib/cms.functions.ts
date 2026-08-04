import { createServerFn } from "@tanstack/react-start";
import { fetchSiteContent } from "./cms.server";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  return fetchSiteContent();
});
