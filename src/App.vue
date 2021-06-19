<template>
  <div id="app">
    <EventReception />
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import EventReception from "./components/EventReception.vue";

export default {
  name: "App",
  components: {
    EventReception,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
