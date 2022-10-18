<script>
import axios from 'axios';
export default {
    props: ['variant', 'editorObj'],
    data() {
        return {
            reports: [],
            loading: true
        }
    },
    async created() {
        for (let i = 0; i < this.editorObj.reports.length; i++) {
            let report = this.editorObj.reports[i];
            try {
                var author = await axios.get(this.$store.state.apiPrefix + `/api/user/fetch?id=${report.author}`);
                report.user = {
                    name: author.data.displayName,
                    picture: author.data.picture
                }
            } catch (e) {
                report.user = {
                    name: report.author,
                    picture: "/notfound.png"
                }
            }
            this.reports.push(report);

        }
        this.loading = false;
    },
    methods: {
        resolve(index) {
            console.log(index);
        }
    }
}
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Variant Reports</h2>
                <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">People provide reports for issues,
                    suggestions and more!</p>
            </div>
            <div class="grid gap-8">
                <div role="status" class="w-full" v-if="loading">
                    <svg aria-hidden="true"
                        class="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                <p v-else-if="reports.length == 0" class="font-light text-center text-gray-400 dark:text-gray-800">No
                    reports left!</p>
                <article v-else v-for="report,i in reports"
                    class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{report.title}}
                    </h2>
                    <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{report.description}}</p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-4">
                            <img class="w-7 h-7 rounded-full" :src="`https://deepcore.dev${report.user.picture}`"
                                alt="" />
                            <span class="font-medium dark:text-white">
                                {{report.user.name}}
                            </span>
                        </div>
                        <div>
                            <button type="button"
                                class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Block</button>
                            <button type="button" @click="() => resolve(i)"
                                class="text-white bg-primary-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Resolve</button>
                        </div>

                    </div>
                </article>
            </div>
        </div>
    </section>
</template>