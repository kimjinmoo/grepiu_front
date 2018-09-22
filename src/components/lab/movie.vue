<template>
  <div class="container-fluid">
    <b-alert dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">{{message}}</b-alert>
    <div>
        <h5>{{selectedStoreName}}</h5>
    </div>
    <p style="display: none;">lat : {{currentLatLng.lat}} / lng : {{currentLatLng.lng}}</p>
    <!--@center_changed="updateCenter"-->
    <GmapMap :center="center"
             :zoom="zoom"
             style="width: 100%; min-height: 20rem"
             ref="mapRef"
             @drag="onDrag"
             @dragend="onDragend"
    >
      <GmapMarker
          :key="m.id"
          v-for="(m) in markers"
          :position="m.position"
          :title="m.storeName"
          :icon="{url: m.url, scaledSize: {width: 52, height: 45, f: 'px', b: 'px'}}"
          :clickable="true"
          :draggable="false"
          :InfoWindow="m.storeName"
          @click="onMarker(m.storeName, m.position)">
      </GmapMarker>
      <gmap-info-window :position="myPosition">
        현재 나의 위치!!
      </gmap-info-window>
    </GmapMap>
    <div class="text-center mt-2 mb-2">
      <b-button-group size="sm">
        <b-button :disabled="isDataExists" variant="success" v-on:click="findPrevNearLocation">Prev</b-button>
        <b-button variant="primary" v-on:click="findMyLocation">나의위치</b-button>
        <b-button variant="primary" v-on:click="findNearLocation">영화관 찾기(100km이내)</b-button>
        <b-button :disabled="isDataExists" variant="success" v-on:click="findNextNearLocation">Next</b-button>
      </b-button-group>
    </div>
    <b-table class="text-black-50 small" show-empty striped hover :items="cineInfo" :fields="cineFields" empty-text="데이터가 존재하지 안습니다." caption-top>
    </b-table>

    <div>
      <p>관련 포스트<p>
      <router-link to="/post/18" class="sm">Selenium을 통한 롯데시네마 데이터 수집</router-link>
    </p>
    </div>
  </div>
</template>
<script>
  var MobileDetect = require('mobile-detect'),md = new MobileDetect(navigator.userAgent);
  // vue google map
  // ref : https://developers.google.com/maps/documentation/javascript/events?hl=ko
  // ref : https://github.com/heavyy/vue2-google-maps/blob/master/API.md

  export default {
    name : "Movie",
    data : function() {
      return {
        isDataExists : true,
        selectedStoreName : "-",   // 선택된 스토어 정보
        nearIndex : 0, // 가까운 순위 인덱스 최초 0순위로 찾기 시작한다.
        nearCine : [],
        markers : [],   // 마커, 영화관 위치를 표시힌다.
        cineFields : [
          {key : "movieName", label : "영화명", sortable: true},
          {key : "room", label : "상영관"},
          {key : "time", label : "상영시작시간", sortable: true}
        ],
        cineInfo : [],  // 영화 정보
        myPosition : {  // 나의 위치
          lat : 0,
          lng : 0
        },
        currentLatLng : { // 현재 좌표
          lat : 37.5665,
          lng : 126.9780
        },
        center : {     // 지도상 가운데 위치의 좌표
          lat : 37.5665,
          lng : 126.9780
        },
        zoom : 15, // 지도의 Zoom 값
        message : "",
        showDismissibleAlert : false
      }
    },
    methods : {
      setCurrentLanLng : function(lat, lng) {
        //현재 좌표를 Set 한다.
        this.currentLatLng.lat =  lat;
        this.currentLatLng.lng =  lng;
      },
      setMyLocation : function(lat, lng) {
        this.myPosition.lat = lat;
        this.myPosition.lng = lng;
      },
      onDrag : function() {
        // drag 이벤트 등록
      },
      onDragend : function() {
        // drag 종료 이벤트 등록
        this.$refs.mapRef.$mapPromise.then((map) => {
          this.setCurrentLanLng(map.getCenter().lat(), map.getCenter().lng());
        });
      },
      updateCenter : function() {
        // Map 센터값 변경시 이벤트 처리
      },
      onMarker : function(storeName, position) {
        this.selectedStoreName = storeName;
        this.$refs.mapRef.panTo(position);
        this.setCurrentLanLng(position.lat, position.lng);
        this.$http.get(process.env.ROOT_API+"/grepiu/lab/crawler/cine/screen/"+storeName).then((res)=>{
          if(res.data.length > 0) {
            this.cineInfo = res.data;
          } else {
            this.cineInfo = [];
          }
        }).catch((e)=>{
          //console.log(e);
        });
      },
      findMyLocation : function() {
        this.$refs.mapRef.panTo(this.myPosition);
        this.setCurrentLanLng(this.myPosition.lat, this.myPosition.lng);
      },
      findNearLocation : function() {
        this.isDataExists = false;
        // 인접 index 초기화
        this.nearIndex = 0;
        this.$http.get(process.env.ROOT_API+"/grepiu/lab/crawler/cine/near", {
          params: {
            lat: this.currentLatLng.lat,
            lng: this.currentLatLng.lng,
            distance: 100
          }
        }).then((res)=>{
          this.nearCine = res.data;
          let item = this.nearCine[this.nearIndex];
          let lat = item.location == null?0:item.location.y;
          let lng = item.location == null?0:item.location.x;
          let storeName = item.storeName;
          let position = {"lat" : lat , "lng" : lng};
          this.onMarker(storeName, position);
        }).catch((e)=>{
          //console.log(e);
        })
      },
      findPrevNearLocation : function() {
        let item = this.nearCine[this.nearIndex==0?0:--this.nearIndex];
        let lat = item.location == null?0:item.location.y;
        let lng = item.location == null?0:item.location.x;
        let storeName = item.storeName;
        let position = {"lat" : lat , "lng" : lng};
        this.onMarker(storeName, position);
      },
      findNextNearLocation : function() {
        let item = this.nearCine[this.nearIndex>this.nearIndex.length?this.nearIndex:++this.nearIndex];
        let lat = item.location == null?0:item.location.y;
        let lng = item.location == null?0:item.location.x;
        let storeName = item.storeName;
        let position = {"lat" : lat , "lng" : lng};
        this.onMarker(storeName, position);
      },
      initLocation : function() {
        if(navigator.geolocation){
          this.$getLocation()
          .then(coordinates => {
            // 현재 나의 위치 infoWindow
            this.setMyLocation(coordinates.lat, coordinates.lng);
            // google Map Center
            this.center.lat = coordinates.lat;
            this.center.lng = coordinates.lng;
            // Lat Lng 좌표값
            this.setCurrentLanLng(coordinates.lat, coordinates.lng);
          });
        } else {
          this.message = "Web에서 지원하지 않습니다.";
          this.center.lat = 0;
          this.center.lng = 0;
        }

      }

    },
    beforeCreate : function() {
      this.$http.get(process.env.ROOT_API+"/grepiu/lab/crawler/cine/locale")
      .then((response) => {
        let map = [];
        for(var inx in response.data) {
          let item = response.data[inx];
          let lat = item.location == null?0:item.location.y;
          let lng = item.location == null?0:item.location.x;
          // todo. 로직 수정해야됨
          if(item.type == 'lotte') {
            map.push({"position" : {"lng" : lng, "lat" : lat}, "storeName" : item.storeName, "type" : item.type, "url" : "/static/img/cinema_lotte_icon.png"})
          } else {
            map.push({"position" : {"lng" : lng, "lat" : lat}, "storeName" : item.storeName, "type" : item.type, "url" : "/static/img/cinema_cgv_icon.png"})
          }
        }
        this.markers = map;
      })
      .catch((e)=>{
        //console.log(e);
      })
    },
    created : function() {
      if(md.is("iPhone")) {
        this.showDismissibleAlert = true;
        this.message = "아이폰 설정 >> 개인 정보 보호 >> 위치 서비스 >> Safari 웹 사이트 >> 안함-> 앱을 사용하는 동안 체크";
      }
      this.initLocation();
    }
  };
</script>
