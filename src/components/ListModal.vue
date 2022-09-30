<script>
export default {
    props: ["data"],
    data() {
        return {
            list: [],
            search: null
        }
    },
    created() {
        if (this.$props.data.search) {
            this.search = {
                model: ""
            }
        }
        this.list = this.$props.data.list;
    },
    watch: {
        search: {
            handler(search) {
                this.list = this.$props.data.search(search.model);
            },
            deep: true
        }
    }
}
</script>
<template>
    <div class="cover-screen bg-gray-600/40 h-screen grid grid-cols-1 place-items-center">
        <div class="z-50 md:inset-0 h-modal h-fit">
            <div class="relative p-4 w-full w-fit h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            {{ data.title }}
                        </h3>
                        <button type="button" @click="data.closeModal"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-6 text-center max-h-90vh overflow-y-scroll">
                        <div class="relative mb-2" v-if="search">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" id="search" v-model="search.model"
                                class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search" required>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 justify-items-stretch" :class="data.cols ? `md:grid-cols-${data.cols}` : ''">
                            <a :href="data.entryFramework.link(entry)" v-for="entry in list"
                                class="flex flex-col items-center bg-white m-2 rounded-lg border w-auto h-fit shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                    :src="entry[data.entryFramework.image]" alt="">
                                <div class="flex flex-col justify-between p-4 leading-normal text-left w-full">
                                    <div v-for="badge in data.entryFramework.badges">
                                        <span v-if="badge.show(entry)"
                                            class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{{badge.template.replace("%s", entry[badge.value])}}</span>
                                    </div>
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {{ entry[data.entryFramework.title] }}</h5>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {{ entry[data.entryFramework.description] }}
                                    </p>
                                </div>
                            </a>
                            <a v-if="list.length == 0"
                                class="md:col-span-2 flex flex-col items-center bg-white rounded-lg border w-auto h-fit shadow-md md:flex-row dark:border-gray-700 dark:bg-gray-800">
                                <div class="flex flex-col justify-between p-4 leading-normal text-center w-full">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        No results found.</h5>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Try a different search term
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>