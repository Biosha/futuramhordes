<template>
  <div class="about">
    <template v-for="i in 40">
      <div class="charac">
        <img src="@/assets/portraits/bender.webp" />
        <p>Bender</p>
      </div>
    </template>
  </div>
</template>

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
