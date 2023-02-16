import type {
  Character,
  Correction,
  Question,
  QuestionDisplayed,
  reponse,
  Team,
} from "@/models/character";
import { http } from "@/utils";

export const PlayerService = {
  login(discordId: string, discordTag: string): Promise<string> {
    return http()
      .post(`/admin/authenticate`, {
        discord: discordId,
        discordTag: discordTag,
      })
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  getCasting(): Promise<Array<Character>> {
    return http()
      .get(`/player/getcasting`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  getQuiz(): Promise<Array<QuestionDisplayed>> {
    return http()
      .get(`/player/getquiz`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  quiz(responses: Array<reponse>): Promise<Array<Correction>> {
    return http()
      .post(`/player/quiz`, { responses: responses })
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  getTeam(): Promise<Team> {
    return http()
      .get(`/player/getteam`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
};
