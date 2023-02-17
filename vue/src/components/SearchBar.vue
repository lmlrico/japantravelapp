<template>
  <div class="flex border-3 border-blue-900 rounded">
    <GMapAutocomplete
      class="mt-1 px-4 py-2 w-80"
      placeholder="Search"
      @place_changed="setPlace"
      :options="{ componentRestrictions: { country: 'jp' } }"
    >
    </GMapAutocomplete>
    <button
      class="mt-1 flex items-center justify-center px-4 border-l bg-gray-700 hover:bg-gray-500 " 
      @click="usePlace"
    >
      <svg
        class="w-6 h-6 text-white"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      markers: [],
      place: "",
    };
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
  methods: {
    setPlace(place) {
      this.place = place;
    },
    usePlace(place) {
      if (this.place) {
        var latLng = new google.maps.LatLng(
          this.place.geometry.location.lat(),
          this.place.geometry.location.lng()
        );
        this.$emit("pan-map", latLng);
      }
    },
  },
};
</script>
