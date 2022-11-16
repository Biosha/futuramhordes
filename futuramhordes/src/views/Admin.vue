<template>
    <table class="darkTable">
      <thead>
        <tr>
          <th>Discord ID</th>
          <th>Discord Tag</th>
          <th>MyHordes Name</th>
          <th>Character</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in players" :key="index">
          <td>{{player.discordId}}</td>
          <td>{{player.discordTag}}</td>
          <td v-if="edition !== index">
            {{player.MHName}}
          </td>
          <td v-if="edition === index">
            <select v-model="MHName">
              <option disabled value="">Please select one</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </td>
          <td v-if="edition !== index">
            {{player.character}}
          </td>
          <td v-if="edition === index">
            <select v-model="character">
              <option disabled value="">Please select one</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </td>
          <td><button @click="edit(index)">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <input type="submit" @click="submit()" />
</template>

<script lang="ts">
import { AdminService } from '@/service/adminServices';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Admin',
  data() {
    return {
      players: {} as Array<any>,
      edition: undefined as number | undefined,
      MHName: undefined as string | undefined,
      character: undefined as string | undefined
    }
  },
  methods: {
    edit(index: number): void {
      this.edition = index;
      // console.log(this.players[this.edition])
    },
    async submit(): Promise<void> {
      let MHName: string = this.players[this.edition!].MHName
      let character: string = this.players[this.edition!].character
      if (this.edition! >= 0) {
        if(this.MHName) {
          MHName = this.MHName
          this.MHName = undefined
        }
        if(this.character) {
          character = this.character
          this.character = undefined
        }
        let playersToSort = await AdminService.updatePlayer(this.players[this.edition!].discordId, MHName, character)
        this.players = playersToSort.sort((a, b) => b.discordId - a.discordId)
        this.edition = undefined
      }
    }
  },
  async mounted(): Promise<void> {
      try {
        let playersToSort = await AdminService.getPannel();
        this.players = playersToSort.sort((a, b) => b.discordId - a.discordId)
      } catch (err) {
        console.error(err)
      }
    }
});


</script>

<style>
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

</style>
