<template>
<div id="testDisplay_">
  <div id="coreDiv">
    <div>
      <span id="coreSpan">{{coreText}}</span>
    </div>
  </div>
  <div id="itemDiv">
    <!--<div v-for="(item, index) in core2items" :key="item.name">-->
      <!--<span>{{index}}</span>-->
      <!--<span>{{item.name}}</span>-->
    <!--</div>-->
  </div>
  <svg>
    <rect @click="backSearchView" width="50px" height="50px" style="fill:rgb(0,0,255);stroke-width:1; stroke:rgb(0,0,0)"/>
  </svg>
</div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapActions } from 'vuex'
const d3 = require('d3')

export default {
  name: 'TestDisplay',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'core2items',
      'coreType',
      'coreText',
      'authorIdDic',
      'itemIdDic',
      'tagIdDic'
    ])
  },
  mounted () {
    console.log('启动TestView成功！！！')
  },
  watch: {
    coreText () {
      let winHeight = $(window).height()
      $('#coreDiv').css('transform', 'translate(' + 50 + 'px, ' + winHeight / 2 + 'px)')
      $('#coreSpan').removeClass()
      $('#coreSpan').addClass(this.coreType)
    },
    core2items (items) {
      let itemDiv = d3.select('#itemDiv')
      itemDiv.selectAll('div').remove()
      let itemDivs = itemDiv.append('div').selectAll('div').data(items).enter()
      // itemDivs
      //   .append('svg')
      //   .attr('width', 10)
      //   .attr('height', 10)
      //   .style('transform', (d, i) => {
      //     let winWidth = $(window).width()
      //     let winHeight = $(window).height()
      //     let x = winWidth * 0.1 + winWidth / 20 * i
      //     let y = winHeight * 0.6
      //     return 'translate(' + x + 'px, ' + y + 'px)'
      //   })
      //   .append('rect')
      //   .attr('width', 8 + 'px')
      //   .attr('height', 8 + 'px')
      //   .style('fill', 'red')
      itemDivs
        .append('div')
        .attr('id', (d, i) => {
          return i
        })
        .style('position', 'absolute')
        .style('top', $(window).height() * 0.5 + 'px')
        .style('left', (d, i) => {
          let winWidth = $(window).width()
          let x = winWidth * 0.1 + winWidth / 20 * i
          return x + 'px'
        })
        .style('transform', 'rotate(' + -60 + 'deg)')
        .style('text-align', 'center')
        .append('span')
        .classed('item', true)
        .style('text-overflow', 'ellipsis')
        .style('overflow', 'hidden')
        .style('white-space', 'nowrap')
        .style('width', 320 + 'px')
        .text((d) => {
          return d.name
        })
        // .style('transform', 'rotate(' + -60 + 'deg)')
    }
  },
  methods: {
    ...mapActions([
      'updateWord2Titles',
      'updateWord2Authors',
      'updateWord2Tags',
      'updateCore'
    ]),
    backSearchView () {
      $('#searchView').css('display', 'inherit')
      $('#testDisplay').css('display', 'none')
    }
  }
}
</script>

<style scoped>
  .author {
    color: #004787;
    background: rgba(255,255,255,.5);
    border-radius: 1.5em;
    border: 2px solid #3488BC;
    padding-left: 18px;
    padding-right: 4px;
    background: url("../icons/author5.png") no-repeat left center;
  }
  #testDispaly_ {
    font-size: 20px;
  }
</style>
