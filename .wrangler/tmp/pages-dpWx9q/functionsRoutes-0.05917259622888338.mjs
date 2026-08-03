import { onRequestGet as __api_paket__slug__ts_onRequestGet } from "D:\\4. Project Web\\travel-umroh-agency\\functions\\api\\paket\\[slug].ts"
import { onRequestGet as __api_jadwal_ts_onRequestGet } from "D:\\4. Project Web\\travel-umroh-agency\\functions\\api\\jadwal.ts"
import { onRequestGet as __api_paket_ts_onRequestGet } from "D:\\4. Project Web\\travel-umroh-agency\\functions\\api\\paket.ts"
import { onRequestGet as __api_promo_ts_onRequestGet } from "D:\\4. Project Web\\travel-umroh-agency\\functions\\api\\promo.ts"

export const routes = [
    {
      routePath: "/api/paket/:slug",
      mountPath: "/api/paket",
      method: "GET",
      middlewares: [],
      modules: [__api_paket__slug__ts_onRequestGet],
    },
  {
      routePath: "/api/jadwal",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_jadwal_ts_onRequestGet],
    },
  {
      routePath: "/api/paket",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_paket_ts_onRequestGet],
    },
  {
      routePath: "/api/promo",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_promo_ts_onRequestGet],
    },
  ]