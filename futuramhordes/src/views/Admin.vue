<template>
  <table class="darkTable" @click="click()">
    <thead>
      <tr>
        <th>Discord ID</th>
        <th>Discord Tag</th>
        <th>MyHordes Name</th>
        <th>Character</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(player, index) in players" :key="index">
        <td>{{player.discordId}}</td>
        <td>{{player.discordTag}}</td>
        <td>{{player.MHName}}</td>
        <td>{{player.character}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { AdminService } from '@/service/adminServices';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Admin',
  data() {
    return {
      players: {} as Array<any>
    }
  },
  methods: {
    async click(): Promise<void> {
      try {
        this.players = await AdminService.getPannel();
      } catch (err) {
        console.error(err)
      }
      console.log(this.players)
    }
  }
});


</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  table.darkTable {
  border: 2px solid #000000;
  background-color: #4A4A4A;
  width: 100%;
  height: 200px;
  text-align: center;
  border-collapse: collapse;
}
table.darkTable td, table.darkTable th {
  border: 1px solid #4A4A4A;
  padding: 3px 2px;
}
table.darkTable tbody td {
  font-size: 13px;
  color: #E6E6E6;
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
  color: #E6E6E6;
  text-align: center;
  border-left: 2px solid #4A4A4A;
}
table.darkTable thead th:first-child {
  border-left: none;
}

table.darkTable tfoot {
  font-size: 12px;
  font-weight: bold;
  color: #E6E6E6;
  background: #000000;
  background: -moz-linear-gradient(top, #404040 0%, #191919 66%, #000000 100%);
  background: -webkit-linear-gradient(top, #404040 0%, #191919 66%, #000000 100%);
  background: linear-gradient(to bottom, #404040 0%, #191919 66%, #000000 100%);
  border-top: 1px solid #4A4A4A;
}
table.darkTable tfoot td {
  font-size: 12px;
}
}
</style>
