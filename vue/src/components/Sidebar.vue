<template>
    <div class="w-screen h-screen flex items-center justify-center">
      <div id="slideover-container" class="w-full h-full fixed inset-0 invisible">
        <div
          onclick="toggleSlideover()"
          id="slideover-bg"
          class="w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 opacity-0"
        ></div>
        <div
          onclick="toggleSlideover()"
          id="slideover"
          class="w-96 bg-white h-full absolute right-0 duration-300 ease-out transition-all translate-x-full"
        >
          <div
            class="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
  };
  </script>
  