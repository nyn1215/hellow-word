<template>
  <div :style='mapStyle'>
    <input v-model.number="markPosition.lng">
    <input v-model.number="markPosition.lat">
    <input v-model.number="zoom">
    <baidu-map 
        class="bm-view"
        :scroll-wheel-zoom="true"
        :zoom="zoom"
        :center='center'
        ak='UCwgxoas99duitboakzsNxGdaLbNzdri'
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @click='clickFun'
        @zoomend="syncCenterAndZoom">
         <bm-marker :position='markPosition'></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import {BmMarker,BaiduMap} from 'vue-baidu-map'
//  import BMap from 'BMap'
// import {MP} from './mk.js' 
export default {
  components: {
    BaiduMap,
    BmMarker
  },
  props:{
    mapStyle:String 
  },
  data () {
    return {
      center: {
        lng: 116.404,
        lat: 39.915
      },
      markPosition:{
        lng: 116.404,
        lat: 39.915
      },
      zoom: 15
    }
  },
  // mounted(){  
  //           this.$nextTick(function(){  
  //             var _this = this;  
  //             MP(_this.ak).then(BMap => {})  
  //                         //在此调用api  

  //        })
  // },
  methods: {
     syncCenterAndZoom (e) {
      const {lng, lat} = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      // this.markPosition.lng = lng
      // this.markPosition.lat = lat
      this.zoom = e.target.getZoom()
    },
    clickFun(type, target, point, pixel, overlay){
       const {lng, lat} =type.Ag
      this.markPosition.lng = lng
      this.markPosition.lat = lat
    }
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>