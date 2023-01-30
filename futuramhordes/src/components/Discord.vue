<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { localStore } from "@/stores/local";
import { PlayerService } from "@/service/playerServices";

export default defineComponent({
  name: "DiscordComp",
  data() {
    return {
      localStore: localStore(),
    };
  },
  async mounted(): Promise<void> {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];

    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((result) => result.json())
      .then(async (response) => {
        this.localStore.setDiscord(response);
        let JWT = await PlayerService.login(
          this.localStore.getDiscord!.id,
          `${this.localStore.getDiscord!.username}#${
            this.localStore.getDiscord!.discriminator
          }`
        );
        this.localStore.setJwt(JWT);
        this.$router.push({ name: "Casting" });
      })
      .catch(console.error);
  },
});
</script>

<style type="scss" scoped>
.dinoz_display {
  position: relative;
  left: 40px;
  height: 130px;
}
</style>
