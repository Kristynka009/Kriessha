import autoprefixer from "autoprefixer";

/**
 * Autoprefixer doplňuje -webkit- / -moz- prefixy pro širší podporu prohlížečů
 * (starší Safari, Firefox ESR). Vite ho načte automaticky.
 */
export default {
  plugins: [autoprefixer],
};
