import type { PageLoad } from "./$types";
import blogPages from "./blogPages";

export const load: PageLoad = async () => {
  const pages = await blogPages;
  return {
    pages: pages.sortedByDate,
  }
};