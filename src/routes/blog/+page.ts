import type { PageLoad } from "./$types";
import blogPages from "./blogPages";

export const load: PageLoad = async () => {
  const pages = await blogPages;
  return {
    pagesByDateRev: pages.dateSorted.map(p => pages.pageMap[p]).reverse(),
  }
};