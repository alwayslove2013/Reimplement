<template>
  <search-view></search-view>
</template>

<script>
import SearchView from './components/SearchView'
export default {
  name: 'App',
  data () {
    return {
      author: 'Min Tian'
    }
  },
  components: {
    SearchView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
