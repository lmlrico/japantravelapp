<template>
  <div class="w-full lg:flex lg:flex-grow">
    <div
      v-if="place.photos.length"
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="{
        backgroundImage: `url('${place.photos[0].prefix}original${place.photos[0].suffix}')`,
      }"
    ></div>
    <div
      v-if="!place.photos.length"
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="{
        backgroundImage: `url('https://via.placeholder.com/150')`,
      }"
    ></div>
    <div
      class=" p-4 flex flex-grow flex-col justify-between leading-normal"
    >
      <div class="mb-2">
        <div class="text-gray-900 font-bold text-xl mb-2">
          <a v-bind:href="'https://foursquare.com/v/' + place.fsq_id" target="_blank">
            <h5>{{ place.name }}</h5>
          </a>
        </div>
        <p class="text-sm text-gray-600">
          {{ place.categories[0].name }}<span v-if="place.rating" class="bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3 float-right">{{ place.rating.toFixed(1) }}</span>
          
        </p>
      </div>
      {{ place.location.address }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Place",
  props: {
    place: Object,
  },
};
</script>

<style scoped>
div,p,span{
    color:white;
}
a {
  color:rgb(134, 154, 172);
}
.delim {
  color: #ccc;
  padding: 0 2px;
}
</style>
