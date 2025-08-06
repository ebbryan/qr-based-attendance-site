import { authentication, createDirectus, rest } from "@directus/sdk";

const directusUrl = process.env.NEXT_PUBLIC_DIR_URL;
if (!directusUrl) {
  throw new Error("NEXT_PUBLIC_DIRECTUS_URL is not defined");
}

const directus = createDirectus(directusUrl)
  .with(rest())
  .with(authentication());

export default directus;
