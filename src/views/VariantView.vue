<script>
import axios from 'axios';
import NotFound from './NotFound.vue';
export default {
    props: ['preview'],
    data() {
        return {
            notFound: false,
            variant: null,
            owns: false,
            editorObj: null,
            loading: true,
            state: {
                title: null,
                description: null,
                submitted: false,
                showSideBar: false
            }
        }
    },
    created() {
        axios.get(this.$store.state.apiPrefix + `/api/variant/fetch?id=${this.$route.params.variant_id}`).then((e) => {
            this.variant = e.data;
            document.title = this.variant.title + " | ChessJS";
            if (this.preview) {
                this.loading = false;
            } else {
                if (this.variant.author == this.$store.state.userData?.username) {
                    this.owns = true;
                    axios.get(this.$store.state.apiPrefix + `/api/editor/fetch?id=${this.variant._id}`).then((d) => {
                        this.editorObj = d.data;
                        this.loading = false;
                    })
                } else {
                    this.loading = false;
                }
            }
        }).catch((e) => {
            this.notFound = true;
            this.loading = false;
        });
    },
    watch: {
        $route(to, from) {
            document.title = this.variant.title + " | ChessJS";
        }
    },
    methods: {
        report(e) {
            axios.post(this.$store.state.apiPrefix + `/api/editor/report`, {
                id: this.variant._id,
                title: this.state.title,
                description: this.state.description
            }).then((e) => {
                this.state.submitted = true;
            })
        }
    },
    components: {
        NotFound
    }
}
</script>

<template>
    <div role="status" class="spinner" v-if="loading">
        <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
    <div v-else-if="!notFound && owns">
        <div class="flex">
            <Transition name="nav">
                <aside class="w-64 float-left" :class="state.showSideBar ? 'block' : 'hidden md:block'"
                    @click="state.showSideBar = false" aria-label="Sidebar">
                    <div class="h-full overflow-y-auto py-4 px-3 rounded">
                        <button class="flex items-center pl-2.5 mb-5">
                            <img :src="variant.icon" class="mr-3 h-6 sm:h-7" alt="Flowbite Logo" />
                            <span
                                class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{{variant.title}}</span>
                        </button>
                        <ul class="space-y-2">
                            <li>
                                <router-link :to="`/variant/${variant._id}/`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <font-awesome-icon icon="fa-solid fa-house" />
                                    <span class="ml-3">Home</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/preview`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                                    <span class="ml-3">Preview</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/inbox`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <font-awesome-icon icon="fa-solid fa-inbox" />
                                    <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                                    <span
                                        class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">?</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/reports`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <font-awesome-icon icon="fa-solid fa-flag" />
                                    <span class="flex-1 ml-3 whitespace-nowrap">Reports</span>
                                    <span
                                        class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{{editorObj.reports.length}}</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/analytics`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <font-awesome-icon icon="fa-solid fa-chart-simple" />
                                    <span class="flex-1 ml-3 whitespace-nowrap">Analytics</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/settings`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <font-awesome-icon icon="fa-solid fa-gear" />
                                    <span class="flex-1 ml-3 whitespace-nowrap">Settings</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/engine`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <font-awesome-icon icon="fa-solid fa-robot" />
                                    <span class="flex-1 ml-3 whitespace-nowrap">Engine</span>
                                    <span
                                        class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                                </router-link>
                            </li>
                        </ul>
                        <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <router-link :to="`/variant/${variant._id}/code`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                    <font-awesome-icon icon="fa-solid fa-code" />
                                    <span class="ml-3">Code</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/docs`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                    <font-awesome-icon icon="fa-solid fa-book" />
                                    <span class="ml-3">Documentation</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/help`"
                                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                    <font-awesome-icon icon="fa-solid fa-life-ring" />
                                    <span class="ml-3">Help</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="`/variant/${variant._id}/danger`"
                                    class="flex items-center p-2 text-base font-normal text-red-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-600 group">
                                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
                                    <span class="ml-3">Danger Zone</span>
                                </router-link>
                            </li>
                        </ul>
                        <div id="dropdown-cta" class="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
                            <div class="flex items-center mb-3">
                                <span
                                    class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
                            </div>
                            <p class="mb-3 text-sm text-blue-900 dark:text-blue-400">
                                ChessJS as a whole, but more specifically this tool, is still in the early stages of
                                development.
                            </p>
                            <a class="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                target="_blank" href="https://tickets.chess-js.com/">Report bug</a>
                        </div>
                    </div>
                </aside>
            </Transition>
            <div class="float-right grow">
                <button data-collapse-toggle="navbar-search" type="button"
                    @click="state.showSideBar = !state.showSideBar"
                    class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-search" aria-expanded="false">
                    <span class="sr-only">Open menu</span>
                    <font-awesome-icon icon="fa-solid fa-bars" />
                </button>
                <router-view :variant="variant" :editorObj="editorObj"></router-view>
            </div>
        </div>
    </div>
    <div v-else-if="!notFound">
        <div class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert" v-if="preview">
            <span class="font-medium">Preview!</span> Showing preview of {{variant.title}}.
        </div>
        <section class="bg-white dark:bg-gray-900">
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1
                        class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        {{variant.title}}</h1>
                    <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        {{variant.description || `This would be an exciting and interesting description that the author
                        of this variant provided. You know, if they did provide one. For now, you're stuck with this.`}}
                    </p>
                    <router-link :to="`/play?variant=${variant._id}`"
                        class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Play
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </router-link>
                    <a href="#"
                        class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Look at code
                    </a>
                </div>
                <div class="hidden w-96 h-96 lg:mt-0 lg:col-span-5 lg:flex">
                    <img :src="variant.icon" class="rounded-lg" alt="variant icon">
                </div>
            </div>
        </section>
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <div
                            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full text-white bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <font-awesome-icon icon="fa-solid fa-user-group" />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">{{variant.players}} Players</h3>
                        <p class="text-gray-500 dark:text-gray-400">{{variant.title}} supports {{variant.players}}
                            playing at once! Grab {{variant.players-1}} other person(s) and start a game of
                            {{variant.title}}!</p>
                    </div>
                    <div v-if="variant.engine">
                        <div
                            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full text-white bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <font-awesome-icon icon="fa-solid fa-robot" />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Engine</h3>
                        <p class="text-gray-500 dark:text-gray-400">{{variant.title}} supports playing with an engine,
                            so now you know that all your moves are terrible, instead of just guessing.</p>
                    </div>
                    <div v-for="feature in variant.features">
                        <div
                            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full text-white bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <font-awesome-icon icon="fa-solid fa-star" />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">{{feature.name}}</h3>
                        <p class="text-gray-500 dark:text-gray-400">{{feature.description}}</p>
                    </div>
                </div>
            </div>
        </section>
        <transition name="slide-fade">
            <section class="bg-white dark:bg-gray-900" v-if="!state.submitted">
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                        Report An Issue with {{variant.title}}</h2>
                    <p class="font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Found an issue (like a
                        bug) with how the variant works? Got a suggestion for the developer? Enter your details here,
                        and
                        they will recieve a message the next time they log in.</p>
                    <p class="mb-8 lg:mb-16 font-light text-center text-red-500 dark:text-red-400">Note: This sends a
                        message to the developer. To send ChessJS a message, raise a ticket <a
                            href="https://tickets.chess-js.com/" class="underline" target="_blank">here</a></p>

                    <div class="space-y-8">
                        <div>
                            <label for="subject"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input type="text" id="subject" v-model="state.title"
                                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="What is the issue about?" required>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Message</label>
                            <textarea id="message" rows="6" v-model="state.description"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Leave a comment..."></textarea>
                        </div>
                        <button @click="report"
                            class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Report
                            Issue!</button>
                    </div>
                </div>
            </section>
        </transition>
    </div>
    <NotFound v-else></NotFound>
</template>