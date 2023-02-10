<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/images/logo.png"
      width="125"
      height="125"
      @click="test()"
    />

    <div class="wrapper">
      <nav>
        <a
          v-if="!localStore.discord"
          id="login"
          :href="`https://discord.com/api/oauth2/authorize?client_id=1037714596343058492&redirect_uri=http%3A%2F%2F${URI}%2Fdiscord&response_type=token&scope=identify`"
          >Login</a
        >
        <RouterLink to="/casting">Casting</RouterLink>
        <RouterLink v-if="localStore.jwt" to="/quiz">Quiz</RouterLink>
        <RouterLink v-if="localStore.jwt" to="/team">Team</RouterLink>
        <a v-if="localStore.discord" @click="logout()">Logout</a>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineComponent } from "vue";
import { localStore } from "@/stores/local";
import { PlayerService } from "./service/playerServices";

export default defineComponent({
  name: "App",
  data() {
    return {
      localStore: localStore(),
    };
  },
  methods: {
    async test(): Promise<void> {
      await PlayerService.login(
        this.localStore.getDiscord!.id,
        `${this.localStore.getDiscord!.username}#${
          this.localStore.getDiscord!.discriminator
        }`
      );
    },
    logout(): void {
      this.localStore.setAdmin(false);
      this.localStore.setDiscord(undefined);
      this.localStore.setJwt(undefined);
    },
  },
  computed: {
    URI(): string {
      return encodeURIComponent(window.location.host);
    },
  },
});
</script>

<style scoped lang="scss">
.button {
  min-width: 140px;
  padding: 1.25rem 2rem;
  font-family: -system-ui, sans-serif;
  font-size: 1.125rem;
  line-height: 1.2;
  color: #313030;
  background-color: $btn-bg;
  border: 0;
  border-radius: 1px;
  white-space: nowrap;
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.1s;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: $btn-hover;
  }
  &[disabled] {
    color: #313030;
    background-color: #a9aaac;
    pointer-events: none;
  }
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  cursor: pointer;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    /* margin-left: -1rem; */
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  a:first-of-type {
    margin-left: -1rem;
  }
}
</style>
