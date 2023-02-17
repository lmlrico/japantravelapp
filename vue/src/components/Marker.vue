<template>
  <GMapMarker
    :position="{
      lat: marker.geocodes.main.latitude,
      lng: marker.geocodes.main.longitude,
    }"
    :clickable="true"
    @click="openMarker(marker.fsq_id)"
  >
    <GMapInfoWindow
      :closeclick="true"
      @closeclick="openMarker(null)"
      :opened="openedMarkerID === marker.fsq_id"
    >
      <div class="flex items-center">
        <img v-if="marker.photos.length" v-bind:src="marker.photos[0].prefix + '50x50' + marker.photos[0].suffix" />
        <img v-if="!marker.photos.length" src="https://via.placeholder.com/50" />
        <div class="ml-3">
          <a v-bind:href="'https://foursquare.com/v/' + marker.fsq_id" target="_blank"><h5>{{ marker.name }}</h5></a>
          <p>{{ marker.location.address }}</p>
        </div>
      </div>
    </GMapInfoWindow>
  </GMapMarker>
</template>

<script>
import {  watch } from "vue";
export default {
  name: "Marker",
  data() {
    return {
      marker_id: null,
      openedMarkerID: null,
    };
  },
  watch: {
    markerid(newID, oldID) {
        this.openMarker(newID)

    }
  },
  props: {
    marker: Object,
    markerid: String
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id;
    },
  },
};
</script>

<style scoped>
a{
    color:blue;
    text-decoration: underline;
}
</style>
