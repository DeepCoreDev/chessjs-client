
<script>
export default {
  data() {
    var vm = this;
    return {
      state: {
        showNav: false,
        showMobileNav: false,
        scrollingOverride: false,
        darkMode: false
      },
      currentRoute: vm.$route.name,
      navLinks: [
        { name: "Home", path: 'home' },
        { name: "About", path: 'about' },
        { name: "Play", path: "play" },
        { name: "Library", path: 'library' },
      ]
    }
  },
  watch: {
    $data: {
      handler: function (data, oldData) {
        if (this.blockScrolling()) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "scroll";
        }
        this.$store.commit("changeColor", data.state.darkMode ? 'dark' : 'light');
      },
      deep: true
    }
  },
  created() {
    if (localStorage.theme === 'dark') {
      this.state.darkMode = true;
      this.$store.commit("changeColor", "dark");
    }
  },
  methods: {
    setScrolling(value) {
      this.state.scrollingOverride = value;
    },
    blockScrolling() {
      return this.state.showMobileNav || this.state.scrollingOverride
    },
  },
}
</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <router-link :to="{ name: 'home' }" class="flex items-center">
          <img :src="`/${$store.state.color}/chessjs.png`" class="mr-3 h-6 sm:h-9" alt="ChessJS logo" />
        </router-link>
        <div class="md:hidden">
          <button data-collapse-toggle="navbar-search" type="button" @click="state.showMobileNav = true"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search" aria-expanded="false">
            <span class="sr-only">Open menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
          <ul
            class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li v-for="link in navLinks">
              <router-link :to="{ name: link.path }" custom v-slot="{ navigate }">
                <button
                :class="$route.name == link.path ? 'underline decoration-primary-100 underline-offset-8 decoration-4 text-slate-900 dark:text-white' : ''"
                  class="block py-2 pr-4 pl-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  @click="navigate" @keypress.enter="navigate" role="link">{{ link.name }}</button>
              </router-link>
            </li>
            <li v-if="!$store.state.userData">
              <router-link :to="{ name: 'login' }"
                class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium ring-2 ring-primary-400 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                Login</router-link>
            </li>
            <li v-if="!$store.state.userData">
              <router-link :to="{ name: 'signup' }"
                class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Signup</router-link>
            </li>
          </ul>
          <a type="button" v-if="$store.state.userData"
            :href="`//${$store.state.deepcoreServer}/user/${$store.state.userData.username}`" target="_blank"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
            <img class="object-cover w-8 h-8 rounded-full"
              :src="`//${$store.state.deepcoreServer}${$store.state.userData.picture}`" alt="user photo">
          </a>

        </div>
      </div>
      <Transition name="nav">
        <div class="absolute w-screen h-screen  left-0 bottom-0 right-0 top-0 overflow-hidden m-0 z-50"
          v-if="state.showMobileNav" @click="state.showMobileNav = false">
          <aside class="w-8/12 md:hidden absolute left-0 top-0 bottom-0 h-full" aria-label="Sidebar">
            <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
              <ul class="space-y-2">
                <li>
                  <router-link :to="{ name: 'home' }"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <img :src="`/${$store.state.color}/chessjs.png`" class="mr-3 h-6 sm:h-9" alt="ChessJS logo" />
                  </router-link>
                </li>
                <li v-for="link in navLinks">
                  <router-link :to="{ name: link.path }"
                  :class="$route.name == link.path ? 'bg-gray-100 dark:bg-gray-700' : ''"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span class="ml-3">{{ link.name }}</span>
                  </router-link>
                </li>

              </ul>
              <ul class="pt-4 mt-4 space-y-5 border-t border-gray-200 dark:border-gray-700">
                <li v-if="!$store.state.userData">
                  <router-link :to="{ name: 'login' }"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                    <span class="ml-3">Login</span>
                  </router-link>
                </li>
                <li v-if="!$store.state.userData">
                  <router-link :to="{ name: 'signup' }"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                    <span class="ml-3">Signup</span>
                  </router-link>
                </li>
                <li v-if="$store.state.userData">
                  <a type="button" v-if="$store.state.userData"
                    :href="`//${$store.state.deepcoreServer}/user/${$store.state.userData.username}`" target="_blank"
                    class="ml-2 flex items-center flex mr-3 text-sm dark:bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <img class="object-cover w-8 h-8 rounded-full"
                      :src="`//${$store.state.deepcoreServer}${$store.state.userData.picture}`" alt="user photo">
                    <span
                      class="p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Transition>
    </nav>
  </header>
  <main class="bg-white dark:bg-gray-900">
    <router-view v-slot="{ Component, route }">
      <transition name="page" appear>
        <component :is="Component" @set-scrolling="setScrolling">
        </component>
      </transition>
    </router-view>
  </main>
  <footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
    <div class="mx-auto max-w-screen-xl text-center">
      <a href="#" class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
        <img :src="`/${$store.state.color}/chessjs.png`" class="mr-2 h-10" />
      </a>
      <label for="private-account-toggle" class="mt-4 inline-flex relative items-center cursor-pointer">
        <input type="checkbox" id="private-account-toggle" class="sr-only peer" @change="toggleDarkMode"
          v-model="state.darkMode">
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600">
        </div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
      </label>
      <p class="my-6 text-gray-500 dark:text-gray-400">ChessJS is owned and operated by DeepCore. Read more about them
        <a class="hover:underline dark:text-white" href="https://deepcore.dev/" target="_blank">here</a>.
      </p>
      <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
        <li v-for="link in navLinks">
          <router-link :to="{ name: link.path }" class="mr-4 hover:underline md:mr-6">{{ link.name }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'pricing' }" class="mr-4 hover:underline md:mr-6">Pricing</router-link>
        </li>
        <li>
          <a href="https://deepcore.dev/contact" target="_blank" class="mr-4 hover:underline md:mr-6">Contact</a>
        </li>
        <li>
          <router-link :to="{ name: 'privacy' }" class="mr-4 hover:underline md:mr-6">Privacy Policy</router-link>
        </li>
      </ul>
      <span class="text-sm text-gray-500 inline-flex sm:text-center dark:text-gray-400">© 2022 DeepCore. All Rights
        Reserved. ChessJS v0.5.1
      </span>
    </div>
  </footer>
</template>