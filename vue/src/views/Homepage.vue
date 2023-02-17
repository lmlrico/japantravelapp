<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-12 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0"></div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <router-link :to="{ name: 'Login' }" v-if="!user.name" class="text-white"
                >Login/Register</router-link
              >
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                      v-if="user.name" class="flex max-w-xs items-center text-white"
                    >
                      Hello, {{ user.name }}
                    </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                    >
                      <a
                      style="cursor:pointer"
                      @click="logout()"
                        class="block px-4 py-2 text-sm text-gray-700"
                        >Sign Out</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" @click="logout()">Sign Out</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <SearchBar @pan-map="panMap" id="searchbar-component" />
    <div id="bottom-btngrp" class="mb-5">
      <button
        class="bg-gray-700 hover:bg-gray-500 text-white py-3 px-3 rounded"
        @click="openNav"
      >
        View Places
      </button>
      <button
        class="ml-4 bg-gray-700 hover:bg-gray-500 text-white py-3 px-3 rounded"
        @click="searchArea"
      >
        Search This Area
      </button>
    </div>

    <main>
      <div class="mx-auto py-1 sm:px-2 lg:px-4">
        <div class="px-0 py-0 sm:px-0">
          <div class="h-100">
            <transition name="slide">
              <div id="sidenav-places" class="sidenav-places bg-gray-800 w-0">
                <a href="javascript:void(0)" class="closebtn-side" @click="closeSide"
                  >&times;</a
                >
                <Weather :weather="weather" />
                <Places :places="places" @togglePlace="highlightPlace" />
              </div>
            </transition>
            <GMapMap
              style="height: 90vh"
              :center="{ lat: 35.67965111618601, lng: 139.77028305578466 }"
              ref="myMapRef"
              :zoom="13"
              :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: true,
                fullscreenControl: false,
                styles: [
                  {
                    featureType: 'poi',
                    stylers: [{ visibility: 'off' }],
                  },
                ],
              }"
            >
              <Markers :markers="markers" :markerid="markerid" />
            </GMapMap>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";


const store = useStore();
const router = useRouter();
function logout() {
  store.dispatch("logout").then(() => {});
}
store.dispatch("getUser");

const user =  computed(() => store.state.user.data)
</script>

<script>
import SearchBar from "../components/SearchBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Markers from "../components/Markers.vue";
import Places from "../components/Places.vue";
import Weather from "../components/Weather.vue";

export default {
  Name: "Homepage",
  components: {
    SearchBar,
    Sidebar,
    Places,
    Markers,
    Weather,
  },
  data() {
    return {
      markers: [],
      weather: [],
      places: [],
      showuser: false,
      markerid: null,
    };
  },
  mounted() {
    this.$refs.myMapRef.$mapPromise.then((map) => {
      this.map = map;
      const centerTopControlDiv = document.createElement("div");
      this.addCenterControlTop(centerTopControlDiv, map);
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerTopControlDiv);
      const centerTopControlBottom = document.createElement("div");
      this.addCenterControlBottom(centerTopControlBottom, map);
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        centerTopControlBottom
      );
    });
    window.addEventListener("resize", this.windowResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.windowResize);
  },
  methods: {
    /*mapDrag() {
        let lat = this.map.getCenter().lat();
        let lng = this.map.getCenter().lng();

        let zoom = this.map.getZoom();
        console.log(lat + " , " + lng);

        // Commented this function due to excessive api calls when dragging, replaced with manual searching of the area
      },*/

    addCenterControlTop(controlDiv, map) {
      const controlUITop = document.getElementById("searchbar-component");
      controlDiv.appendChild(controlUITop);
    },
    addCenterControlBottom(controlDiv, map) {
      const controlUIBottom = document.getElementById("bottom-btngrp");
      controlDiv.appendChild(controlUIBottom);
    },
    async searchArea() {
      const center = this.map.getCenter();
      this.weather = await this.getWeather(center);
      console.log(this.weather);
      this.markers = await this.getNearbyPlaces(center);
      this.places = this.markers;
      this.map.setZoom(13);
    },
    async panMap(coords) {
      this.map.panTo(coords);
      this.getWeather(coords);
      this.markers = await this.getNearbyPlaces(coords);
      this.places = this.markers;
      this.map.setZoom(13);
    },
    async highlightPlace(fsqid) {
      this.markerid = fsqid;
    },
    async getWeather(coords) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat()}&lon=${coords.lng()}&units=metric&appid=***REMOVED***`
      );
      const data = await res.json();

      res.status === 200 ? console.log(data) : alert("Error fetching Weather Data");

      return data;
    },
    async getNearbyPlaces(coords) {
      const res = await fetch(
        `https://api.foursquare.com/v3/places/search?ll=${coords.lat()},${coords.lng()}&limit=30&radius=10000&sort=distance
          &fields=fsq_id,name,geocodes,categories,location,link,rating,hours,price,photos`,
        {
          method: "get",
          headers: new Headers({
            Accept: "application/json",
            Authorization: "***REMOVED***",
          }),
        }
      );

      const data = await res.json();

      res.status === 200
        ? console.log(data.results)
        : alert("Error fetching Nearby Places");

      return data.results;
    },
    removeWidthSidebar(el) {
      for (let i = el.classList.length - 1; i >= 0; i--) {
        const className = el.classList[i];
        if (className.startsWith("w-")) {
          el.classList.remove(className);
        }
      }
    },
    openNav() {
      var el = document.getElementById("sidenav-places");
      this.removeWidthSidebar(el);
      if (window.matchMedia("(max-width: 640px)").matches) {
        document.getElementById("sidenav-places").classList.add("w-full");
      } else {
        document.getElementById("sidenav-places").classList.add("w-1/3");
      }
    },
    closeSide() {
      var el = document.getElementById("sidenav-places");
      this.removeWidthSidebar(el);
      document.getElementById("sidenav-places").classList.add("w-0");
    },
    windowResize(e) {
      var el = document.getElementById("sidenav-places");
      this.removeWidthSidebar(el);
      if (window.matchMedia("(max-width: 640px)").matches) {
        document.getElementById("sidenav-places").classList.add("w-full");
      } else {
        document.getElementById("sidenav-places").classList.add("w-1/3");
      }
    },
  },
};
</script>

<style scoped>
.sidenav-places {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow: hidden;
  padding-top: 60px;
}
.sidenav-places .closebtn-side {
  position: absolute;
  top: 0;
  color: white;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
.slide-enter-active {
  transition: 0 0.5s;
}

.slide-leave-active {
  transition: 0 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(236, 234, 234, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(211, 210, 210, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(248, 248, 248, 0.3);
}

h1 {
  font-size: 36px;
  line-height: 40px;
}

h2 {
  font-size: 30px;
  line-height: 40px;
}

h3 {
  font-size: 24px;
  line-height: 40px;
}

h4 {
  font-size: 18px;
  line-height: 20px;
}

h5 {
  font-size: 14px;
  line-height: 20px;
}

h6 {
  font-size: 12px;
  line-height: 20px;
}
</style>
