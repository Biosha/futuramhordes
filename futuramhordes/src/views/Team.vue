<template>
  <table class="darkTable">
    <thead>
      <tr>
        <th></th>
        <th>Team 1</th>
        <th>Team 2</th>
        <th>Team 3</th>
        <th>Team 4</th>
      </tr>
    </thead>
    <tbody v-if="teams">
      <tr>
        <td>Joueurs</td>
        <td>
          <Tippy v-for="player in teams.teamA.player" :key="player.MHName">
            {{ player.MHName }}
            <template #content>
              {{ player.character }}
            </template>
          </Tippy>
        </td>
        <td>
          <Tippy v-for="player in teams.teamB.player" :key="player.MHName">
            {{ player.MHName }}
            <template #content>
              {{ player.character }}
            </template>
          </Tippy>
        </td>
        <td>
          <Tippy v-for="player in teams.teamC.player" :key="player.MHName">
            {{ player.MHName }}
            <template #content>
              {{ player.character }}
            </template>
          </Tippy>
        </td>
        <td>
          <Tippy v-for="player in teams.teamD.player" :key="player.MHName">
            {{ player.MHName }}
            <template #content>
              {{ player.character }}
            </template>
          </Tippy>
        </td>
      </tr>
      <tr>
        <td>Points</td>
        <td>{{ teams.teamA.point }}</td>
        <td>{{ teams.teamB.point }}</td>
        <td>{{ teams.teamC.point }}</td>
        <td>{{ teams.teamD.point }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import type { Team } from "@/models/character";
import { PlayerService } from "@/service/playerServices";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TeamQuiz",
  data() {
    return {
      teams: undefined as Team | undefined,
    };
  },
  methods: {},
  async mounted(): Promise<void> {
    try {
      this.teams = await PlayerService.getTeam();
    } catch (err) {
      console.error(err);
    }
  },
});
</script>

<style>
table.darkTable {
  margin-top: 25px;
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
