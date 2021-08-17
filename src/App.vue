<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script lang="ts">
import Layout from '@/layout/default.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Layout
  }
})
export default class App extends Vue {}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
