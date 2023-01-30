import { http } from "@/utils";

export const AdminService = {
  getPannel(): Promise<Array<any>> {
    return http()
      .get(`/admin/getpannel`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  updatePlayer(
    discordId: string,
    MHName: string,
    character: string
  ): Promise<Array<any>> {
    return http()
      .post(`/admin/update`,{ discord: discordId, MHName: MHName, character: character })
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
};
