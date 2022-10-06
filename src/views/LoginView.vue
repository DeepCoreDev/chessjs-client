<script>
import axios from 'axios';
export default {
    data() {
        return {
            state: {
                error: null
            }
        }
    },
    methods: {
        signup(e) {
            axios.post(this.$store.state.apiPrefix + "/api/oauth/authorize")
                .then((e) => {
                    location.href = e.data.redirect
                })
        },
    },
    watch: {
        state: {
            handler(newState, oldState) {
                if (newState.error) {
                    this.$emit("setScrolling", true);
                } else {
                    this.$emit("setScrolling", false);
                }
            },
            deep: true

        }
    }
}</script>

<template>
    <section>
        <div class="flex flex-col items-center px-6 py-8 mx-auto lg:py-6">
            <div href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-auto h-8 mr-2" :src="`/${$store.state.color}/chessjs.png`" alt="ChessJS logo">
            </div>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="signup">
                        <button type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"><img
                                src="https://deepcore.dev/assets/icon.png" class="w-7 h-7 mr-3 inline-flex" />Login
                            with DeepCore</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <div class="cover-screen bg-gray-600/40 grid grid-cols-1 place-items-center items-center" v-if="state.error">
        <div class="z-50 md:inset-0 h-modal h-fit">
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" @click="state.error = null"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{{ state.error.title }}
                        </h3>
                        <button data-modal-toggle="popup-modal" type="button" @click="state.error = null"
                            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>