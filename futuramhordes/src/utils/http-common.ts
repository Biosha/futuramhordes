import axios from "axios";
import type { AxiosInstance } from "axios";
import urlJoin from "url-join";
import { localStore } from "@/stores/local";

// const API_SERVER = new URL('https://futuraback-production.up.railway.app/')
const API_SERVER =  urlJoin(
    `${encodeURI(window.location.protocol)}//${encodeURI(
      window.location.hostname
    )}:8081`
  );
const API_BASE = urlJoin(API_SERVER.toString(), "api/v1");

export const http = function (): AxiosInstance {
  const jwt: string | undefined = localStore().getJwt;

  const authHeaders =
    jwt === undefined
      ? {}
      : ({ Authorization: `Bearer ${jwt}` } as Record<string, string>);
  return axios.create({
    baseURL: API_BASE,
    headers: {
      "Content-type": "application/json",
      ...authHeaders,
    },
  });
};
