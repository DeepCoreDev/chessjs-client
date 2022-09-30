<script>
    import axios from 'axios';
    export default {
        props: ['variant'],
        methods: {
            deleteFeature(index){
                this.variant.features.splice(index, 1);
            },
            newFeature(e){
                this.variant.features.push({
                    name: "An Example Feature",
                    description: "A very amazing and fun element of this variant that the author definitely programmed! This is totally not the default."
                });
                document.getElementById("features").scrollIntoView();
            },
            update(e){
                axios.post(this.$store.state.apiPrefix + `/api/variant/update`, {
                    id: this.variant._id,
                    title: this.variant.title,
                    description: this.variant.description,
                    players: this.variant.players,
                    features: this.variant.features
                }).then((e) => {
                    document.body.scrollIntoView();
                })
            }
        }
    }
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mb-10">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2 rounded-lg" :src="variant.icon" alt="logo">
                {{variant.title}}
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Edit Details
                    </h1>
                    <div class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="variantName"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Variant
                                Name</label>
                            <input type="text" name="variantName" id="variantName"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required="" v-model="variant.title">
                        </div>
                        <div>
                            <label for="variantDescription"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Variant
                                Description</label>
                            <textarea id="variantDescription" rows="6" name="variantDescription"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Give your variant a nice, interesting description"
                                v-model="variant.description"></textarea>
                        </div>
                        <div>
                            <label for="variantPlayers"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Variant
                                Players ({{variant.players}})</label>
                            <input id="variantPlayers" type="range" min="2" max="8" v-model="variant.players"
                                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                        </div>
                        <div>
                            <label for="variantFeatures"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Variant
                                Features</label>
                            <ul class="w-full" id="features">
                                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                                    v-for="feature, i in variant.features">
                                    <div class="grid gap-4">
                                        <div>
                                            <label :for="`feature_name_${i}`"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-between">Feature
                                                Name
                                                <font-awesome-icon icon="fa-solid fa-trash"
                                                    class="cursor-pointer text-red-500"
                                                    @click="() => deleteFeature(i)" />
                                            </label>
                                            <input type="text" :id="`feature_name_${i}`"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required="" v-model="feature.name">

                                        </div>
                                        <div>
                                            <label :for="`feature_description_${i}`"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                placeholder="Feature name">Feature
                                                Description</label>
                                            <textarea :id="`feature_description_${i}`" rows="4"
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Feature description" required=""
                                                v-model="feature.description"></textarea>
                                        </div>

                                    </div>
                                </li>
                                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                                    <button type="button" @click="newFeature"
                                        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full">New
                                        Feature</button>
                                </li>
                            </ul>
                        </div>

                        <button type="submit" @click="update"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>