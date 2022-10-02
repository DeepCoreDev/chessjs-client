<script>
import SigninErrorViewVue from '../src/views/SigninErrorView.vue';
import axios from 'axios';
export default {
    components: {
        SigninErrorViewVue
    },
    methods: {
        // For now the only gamemode
        playOnline(e){
            axios.post(this.$store.state.apiPrefix + `/api/chess/new?variant_id=63396697f0a4c253b8b9096a`).then((e) => {
                this.$router.push(`/play/${e.data.play_id}`);
            })
        }
    }
}
</script>

<template>
    <SigninErrorViewVue v-if="!$store.state.userData"></SigninErrorViewVue>
    <div v-if="$store.state.userData" class="pb-8 container w-fit grid grid-cols-1 md:grid-cols-3 gap-4 mx-2 md:mx-auto">
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="mx-auto max-w-screen-sm text-center mb-4">
                <h2 class="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Play Chess</h2>
            </div>
            <aside class="w-64" aria-label="Sidebar">
                <div class="overflow-y-auto py-4 px-3">
                    <ul class="space-y-2">
                        <li>
                            <button @click="playOnline"
                                class="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <font-awesome-icon icon="fa-solid fa-chess" />
                                <span class="ml-3">Play Online</span>
                            </button>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <font-awesome-icon icon="fa-solid fa-user-group" />
                                <span class="flex-1 ml-3 whitespace-nowrap">Play Friends</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <font-awesome-icon icon="fa-solid fa-inbox" />
                                <span class="flex-1 ml-3 whitespace-nowrap">Play Requests</span>
                                <span
                                    class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            
        </div>
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <section>
                <div class="py-2 px-2 mx-auto max-w-screen-xl lg:py-4 lg:px-6">
                    <div class="mx-auto max-w-screen-sm text-center mb-4">
                        <h2 class="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Top Variants</h2>
                    </div>
                    <div class="grid gap-4 overflow-y-scroll h-96 p-4">
                        <article v-for="i in 8"
                            class="p-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <h2 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"><a
                                    href="#">Example Variant</a></h2>
                            <p class="mb-5 font-light text-sm text-gray-500 dark:text-gray-400">An awesome variant
                                description
                                provided by the developer that accurately explains how the variants work.
                            </p>
                            <div class="flex justify-between items-center">
                                <a href="#"
                                    class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Check it out
                                    <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>