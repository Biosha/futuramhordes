<template>
  <div>
    <div>
      <button @click="init()">INIT</button>
      <button @click="tab = 1">Joueurs</button>
      <button @click="tab = 2">Ajouter questions</button>
      <button @click="tab = 3">Lister questions</button>
    </div>
    <div v-if="tab === 1">
      <table class="darkTable">
        <thead>
          <tr>
            <th>Discord ID</th>
            <th>Discord Tag</th>
            <th>MyHordes Name</th>
            <th>Character</th>
            <th>Team</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="index">
            <td>{{ player.discordId }}</td>
            <td>{{ player.discordTag }}</td>
            <td v-if="edition !== index">
              {{ player.MHName }}
            </td>
            <td v-if="edition === index">
              <input v-model="MHName" />
            </td>
            <td v-if="edition !== index">
              {{ player.character }}
            </td>
            <td v-if="edition === index">
              <select v-model="character">
                <option disabled value="">Please select one</option>
                <template
                  v-for="character in characterList"
                  :key="character.character"
                >
                  <option>
                    {{ character.character }}
                  </option>
                </template>
              </select>
            </td>
            <td v-if="edition !== index">
              {{ player.team }}
            </td>
            <td v-if="edition === index">
              <select v-model="team">
                <option disabled value="">Please select one</option>
                <template v-for="team in teamList" :key="team">
                  <option>
                    {{ team }}
                  </option>
                </template>
              </select>
            </td>
            <td><button @click="edit(index)">Edit</button></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" @click="submit()" />
    </div>
    <QuizAdmin v-if="tab === 2"></QuizAdmin>
    <AllQuestion v-if="tab === 3"></AllQuestion>
  </div>
</template>

<script lang="ts">
import { teamList } from "@/constant/teamList";
import { characterList } from "@/constant/characterList";
import { AdminService } from "@/service/adminServices";
import { defineComponent } from "vue";
import QuizAdmin from "@/components/QuizAdmin.vue";
import AllQuestion from "@/components/AllQuestion.vue";

export default defineComponent({
  name: "AdminComp",
  components: {
    QuizAdmin,
    AllQuestion,
  },
  data() {
    return {
      players: {} as Array<any>,
      edition: undefined as number | undefined,
      MHName: undefined as string | undefined,
      character: undefined as string | undefined,
      team: undefined as string | undefined,
      characterList: characterList,
      teamList: teamList,
      tab: 1 as number,
    };
  },
  methods: {
    async init(): Promise<void> {
      const test = await AdminService.init();
      console.log(test);
    },
    edit(index: number): void {
      this.edition = index;
      // console.log(this.players[this.edition])
    },
    async submit(): Promise<void> {
      let MHName: string = this.players[this.edition!].MHName;
      let character: string = this.players[this.edition!].character;
      let team: string = this.players[this.edition!].team;
      if (this.edition! >= 0) {
        if (this.MHName) {
          MHName = this.MHName;
          this.MHName = undefined;
        }
        if (this.character) {
          character = this.character;
          this.character = undefined;
        }
        if (this.team) {
          team = this.team;
          this.team = undefined;
        }
        let playersToSort = await AdminService.updatePlayer(
          this.players[this.edition!].discordId,
          MHName,
          character,
          team
        );
        this.players = playersToSort.sort((a, b) => b.discordId - a.discordId);
        this.edition = undefined;
      }
    },
  },
  async mounted(): Promise<void> {
    try {
      let playersToSort = await AdminService.getPannel();
      this.players = playersToSort.sort((a, b) => b.discordId - a.discordId);
    } catch (err) {
      console.error(err);
    }
  },
});
</script>

<style>
table.darkTable {
  border: 2px solid #000000;
  background-color: #4a4a4a;
  width: 100%;
  height: 200px;
  text-align: center;
  border-collapse: collapse;
}
table.darkTable td,
table.darkTable th {
  border: 1px solid #4a4a4a;
  padding: 3px 2px;
}
table.darkTable tbody td {
  font-size: 13px;
  color: #e6e6e6;
}
table.darkTable tr:nth-child(even) {
  background: #888888;
}
table.darkTable thead {
  background: #000000;
  border-bottom: 3px solid #000000;
}
table.darkTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #e6e6e6;
  text-align: center;
  border-left: 2px solid #4a4a4a;
}
table.darkTable thead th:first-child {
  border-left: none;
}

table.darkTable tfoot {
  font-size: 12px;
  font-weight: bold;
  color: #e6e6e6;
  background: #000000;
  background: -moz-linear-gradient(top, #404040 0%, #191919 66%, #000000 100%);
  background: -webkit-linear-gradient(
    top,
    #404040 0%,
    #191919 66%,
    #000000 100%
  );
  background: linear-gradient(to bottom, #404040 0%, #191919 66%, #000000 100%);
  border-top: 1px solid #4a4a4a;
}
table.darkTable tfoot td {
  font-size: 12px;
}
</style>
