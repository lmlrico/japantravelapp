<template>
  <div v-for="(marker, index) in markers" :key="index">
    <Marker :marker="marker" :markerid="markerid"/>
  </div>
</template>



<script>
import Marker from "./Marker.vue";


export default {
  name: "Markers",
  props: {
    markers: Array,
    markerid: String,
  },
  components: {
        Marker
  },
};
</script>
