<template>
  <div class="px-3 py-2 mb-2 flex flex-row flex-wrap justify-between" v-if="weather.name">
    <div>
      <h3>{{ weather.name }}</h3>
      <h5 class="mt-1">
        Wind: {{ weather.wind.speed }} /ms {{ degToCompass(weather.wind.deg) }}
      </h5>
      <h5 class="mt-1">Humidity: {{ weather.main.humidity }}%</h5>
      <h5 class="mt-1">Visibility: {{ weather.visibility / 1000 }} KM</h5>
    </div>
    <div>
      <div class="flex flex-row">
        <img
          v-bind:src="
            'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png'
          "
          v-bind:style="{ float: left }"
        />
        <h3>{{ weather.main.temp }}°C</h3>
      </div>
      <h5 class="mt-1">{{ capitalizeWords(weather.weather[0].description) }}</h5>
      <h5 class="mt-1">Pressure: {{ weather.main.pressure }} KM</h5>
    </div>
  </div>
  <div class="text-center" v-if="!weather.name">
    <h3 class="mb-2">No Weather Data</h3>
  </div>
  <hr />
</template>

<script>
export default {
  name: "Weather",
  props: {
    weather: Array,
  },
  methods: {
    degToCompass(num) {
      var val = Math.floor(num / 22.5 + 0.5);
      var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[val % 16];
    },
    capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    },
  },
  
};
</script>

<style scoped>
div {
  color: white;
}
</style>
