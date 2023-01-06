import { defineStore } from "pinia";

export interface StoreStateLocal {
  discord?: {
    avatar: string;
    discriminator: string;
    id: string;
    username: string;
  };
  jwt?: string;
  admin: boolean;
}

export const localStore = defineStore("localStore", {
  state: (): StoreStateLocal => ({
    discord: undefined,
    jwt: undefined,
    admin: false,
  }),
  getters: {
    getDiscord: (state: StoreStateLocal) => state.discord,
    getJwt: (state: StoreStateLocal) => state.jwt,
    getAdmin: (state: StoreStateLocal) => state.admin,
  },
  actions: {
    setDiscord(
      discord:
        | {
            avatar: string;
            discriminator: string;
            id: string;
            username: string;
          }
        | undefined
    ): void {
      this.discord = discord;
    },
    setJwt(jwt: string): void {
      this.jwt = jwt;
    },
    setAdmin(admin: boolean): void {
      this.admin = admin;
    },
  },
  persist: {
    storage: window.localStorage,
  },
});
