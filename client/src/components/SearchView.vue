<template>
  <div>
    <input v-model="inputText" type="text" id="searchInput" placeholder="Find author, paper or keyword" size="40">
    <div id="search">
      <div v-for="(item, index) in word2authors" :key="item.name" :id="item.name">
        <img src="../icons/author5.png">
        <span class="searchAuthor" @mouseenter="hoverAuthorShow(index)" @mouseleave="hoverAuthorHide(index)" @click="setAuthorCore(item.name)" :id="'author' + index">{{ item.name }}</span>
      </div>
      <div v-for="(item, index) in word2titles" :key="item.name" :id="item.name">
        <img src="../icons/item5.png">
        <span class="searchItem" @mouseenter="hoverTitleShow(index)" @mouseleave="hoverTitleHide(index)" :id="'title' + index">{{ item.name.slice(0, 40) }}</span>
        <span>...</span>
      </div>
      <div v-for="(item, index) in word2tags" :key="item.name" :id="item.name">
        <img src="../icons/tag5.png">
        <span class="searchTag" @mouseenter="hoverTagShow(index)" @mouseleave="hoverTagHide(index)" :id="'tag' + index">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SearchView',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      inputText: ''
    }
  },
  computed: {
    ...mapState([
      'word2titles',
      'word2authors',
      'word2tags',
      'coreType',
      'coreText'
    ])
  },
  methods: {
    ...mapActions([
      'updateWord2Titles',
      'updateWord2Authors',
      'updateWord2Tags',
      'updateCore'
    ]),
    hoverAuthorShow (index) {
      $('#author' + index).css('border', '2px solid #3488BC')
    },
    hoverAuthorHide (index) {
      $('#author' + index).css('border', '')
    },
    hoverTitleShow (index) {
      $('#title' + index).css('border', '2px solid #62A55E')
    },
    hoverTitleHide (index) {
      $('#title' + index).css('border', '')
    },
    hoverTagShow (index) {
      $('#tag' + index).css('border', '2px solid #CD5968')
    },
    hoverTagHide (index) {
      $('#tag' + index).css('border', '')
    },
    setAuthorCore (name) {
      let tmp = {
        type: 'author',
        text: name
      }
      this.updateCore(tmp)
    }
  },
  watch: {
    inputText (val) {
      console.log('用户输入索引词：', val)
      this.updateWord2Authors(val)
      this.updateWord2Tags(val)
      this.updateWord2Titles(val)
    }
  },
  mounted () {
    // let tmp = $('#search')
    console.log()
    let winWidth = $(window).width()
    // let winHeight = $(window).height()
    let searchWidth = $('#searchInput').width()
    // let searchHeight = $('#searchInput').height()
    let searchWidthNew = (winWidth - searchWidth) / 2
    // console.log(winWidth)
    // console.log(searchWidth)
    // console.log(searchWidthNew)
    $('#searchInput').css('left', searchWidthNew)
    console.log($('#searchInput').height())
    $('#search').css('transform', 'translate(' + (searchWidthNew - 8) + 'px, ' + 0 + 'px)')
    // $('#search').css('line-height', winHeight / 700)
  }
}
</script>

<style>
  input {
    position: absolute;
    top: 25%;
    height: 10%;
    max-height: 30px;
    width: 20%;
    min-width: 100px;
    margin: 0px;
    left: 10%;
    padding: 2px;
    font-size: 20px;
    border-radius: .5em;
    -webkit-border-radius: .5em;
    -moz-border-radius: .5em;
    -ms-border-radius: .5em;
    -o-border-radius: .5em;
    border: 2px solid #FF7621;
    padding-left: 16px;
    background: #FFF2E8 url("../icons/search.png") no-repeat left center;
  }
  #search .searchAuthor {
    color: #004787;
    background: rgba(255,255,255,.5);
    border-radius: .5em;
  }
  #search .searchItem {
    color: #238647;
    background: rgba(255,255,255,.5);
    border-radius: .5em;
  }
  #search .searchTag {
    color: #B2203B;
    background: rgba(255,255,255,.5);
    border-radius: .5em;
  }
  #search {
    position: absolute;
    top: 30%;
    font-size: 20px;
    line-height: 40px;
  }
</style>
