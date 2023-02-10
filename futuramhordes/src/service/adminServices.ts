import type { Question } from "@/models/character";
import { http } from "@/utils";

export const AdminService = {
  getPannel(): Promise<Array<any>> {
    return http()
      .get(`/admin/getpannel`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  init(): Promise<string> {
    return http()
      .get(`/admin/init`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  updatePlayer(
    discordId: string,
    MHName: string,
    character: string,
    team: string
  ): Promise<Array<any>> {
    return http()
      .post(`/admin/update`, {
        discord: discordId,
        MHName: MHName,
        character: character,
        team: team,
      })
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  postQuestion(data: FormData, question: number): Promise<void> {
    return http()
      .put(`/admin/createq/${question}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  updateQuestion(data: FormData, question: number): Promise<void> {
    return http()
      .post(`/admin/updateq/${question}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  getAllQuestions(): Promise<Array<Question>> {
    return http()
      .get(`/admin/getall`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
};
