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

.item {
  display: block;
  color: #238647;
  background: rgba(255,255,255,.5);
  border-radius: 1.5em;
  /*border: 2px solid #62A55E;*/
  padding-left: 18px;
  padding-right: 4px;
  font-size: 12px;
  background: url("./icons/item5.png") no-repeat left center;
}

.author {
  display: block;
  color: #004787;
  background: rgba(255,255,255,.5);
  border-radius: 1.5em;
  /*border: 2px solid #62A55E;*/
  padding-left: 18px;
  padding-right: 4px;
  font-size: 12px;
  background: url("./icons/author5.png") no-repeat left center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 80px;
}

.tag {
  display: block;
  color: #B2203B;
  background: rgba(255,255,255,.5);
  border-radius: 1.5em;
  /*border: 2px solid #62A55E;*/
  padding-left: 18px;
  padding-right: 4px;
  font-size: 12px;
  background: url("./icons/tag5.png") no-repeat left center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 80px;
}
</style>
