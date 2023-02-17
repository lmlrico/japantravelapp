<template>
  <div class="overflow-y-scroll">
    <div
      v-if="places"
      class="border-r border-b border-l border-gray-400"
      v-for="(place, index) in places"
      :key="index"
      @click="$emit('togglePlace', place.fsq_id)"
    >
      <Place :place="place" />
    </div>
    <div v-if="!places" class="mt-2 text-center">
      <h3>No places found</h3>
    </div>
  </div>
</template>

<script>
import Place from "./Place.vue";

export default {
  name: "Places",
  props: {
    places: Array,
  },
  components: {
    Place,
  },
};
</script>
<style scoped>
div {
  color: white;
}
</style>
