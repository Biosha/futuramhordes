<template>
  <div class="about">
    <Tippy v-for="player in players" :key="player.MHName">
      <div class="charac">
        <img
          :src="getImgURL('portraits', player.character.toLocaleLowerCase())"
        />
        <p>{{ player.MHName }}</p>
      </div>
      <template #content>
        <h1>{{ player.fullName }}</h1>
        {{ player.description }}
      </template>
    </Tippy>
  </div>
</template>

<script lang="ts">
import { characterList } from "@/constant/characterList";
import { defineComponent } from "vue";
import { PlayerService } from "@/service/playerServices";
import type { Character } from "@/models/character";

export default defineComponent({
  name: "CastingComp",
  data() {
    return {
      players: [] as Array<Character>,
    };
  },
  async mounted(): Promise<void> {
    try {
      let test = await PlayerService.getCasting();
      this.players = test.map((player) => {
        let selectedPlayer = characterList.find(
          (item) => item.character === player.character
        );
        return {
          MHName: player.MHName,
          character: player.character,
          fullName: selectedPlayer?.fullName,
          characterImage: undefined,
          description: selectedPlayer?.description!,
        };
      });
      this.players = this.players.filter(player => player.MHName)
    } catch (err) {
      console.error(err);
    }
  },
});
</script>

<style scoped>
.about {
  /* max-height: 90vh; */
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0 4px;
}
.charac {
  text-align: center;
}
img {
  width: 100px;
}
p {
  top: -10px;
}
</style>
