import { createContext } from "@lit/context";
import type { ModifiedSearchResponse } from "./types.ts";

export const resultsContext = createContext<ModifiedSearchResponse | undefined>("results");
