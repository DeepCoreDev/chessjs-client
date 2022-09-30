<script>
import axios from 'axios';
export default {
    data() {
        return {
            variants: [],
            showLoadMore: true,
            count: 10,
            index: 0
        }
    },
    created() {
        if(this.$route.query.count){
            this.fetchVariants(0, this.$route.query.count, this.$route.query.author);
            this.showLoadMore = false;
        }else{
            this.fetchVariants(0, this.count, this.$route.query.author);
        }
        
    },
    methods: {
        toggleSave(variantID){
            this.variants.forEach((e) => {
                if(e._id == variantID){
                    e.saved = !e.saved;
                    axios.post(this.$store.state.apiPrefix + `/api/variant/action?action=save&id=${e._id}`).then((e) => {
                        this.$store.dispatch("fetchUserData")
                    });
                    
                }
            })
        },
        toggleLike(variantID){
            this.variants.forEach((e) => {
                if(e._id == variantID){
                    e.liked = !e.liked;
                    if(e.liked){
                        e.likes++;
                    }else{
                        e.likes--;
                    }
                    axios.post(this.$store.state.apiPrefix + `/api/variant/action?action=like&id=${e._id}`).then((e) => {
                        this.$store.dispatch("fetchUserData")
                    });
                    
                }
            })
        },
        loadMore(e){
            this.fetchVariants(this.index, this.count);
        },
        fetchVariants(start, count, author){
            var url = author ? this.$store.state.apiPrefix + `/api/variant/fetch?start=${start}&count=${count}&author=${author}` 
                : this.$store.state.apiPrefix + `/api/variant/fetch?start=${start}&count=${count}`;
            console.log(url);
            axios.get(url).then((e) => {
                var start = this.variants.length;
                this.variants.push(...e.data);
                if(e.data.length < count){
                    this.showLoadMore = false;
                }
                this.index += e.data.length;
                for(let i = start; i < this.variants.length; i++){
                    axios.get(this.$store.state.apiPrefix + `/api/user/fetch?id=${this.variants[i].author}`).then((m) => {
                        this.variants[i].user = {
                            name: m.data.display_name,
                            picture: m.data.pfp
                        }
                    }).catch((m) => {
                        this.variants[i].user = {
                            name: this.variants[i].author,
                            picture: null
                        }
                    });
                    
                    if(this.$store.state.userData && this.$store.state.userData.liked.includes(this.variants[i]._id)){
                        this.variants[i].liked = true;
                    }else{
                        this.variants[i].liked = false;
                    }
                    if(this.$store.state.userData && this.$store.state.userData.saved.includes(this.variants[i]._id)){
                        this.variants[i].saved = true;
                    }else{
                        this.variants[i].saved = false;
                    }
                }
            })
        }
    }
}
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="grid gap-8 lg:grid-cols-2">
                <article v-for="variant in variants"
                    class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-row items-center">
                    <img :src="variant.icon" class="rounded-md object-cover hidden md:block w-32 h-32" />
                    <div class="md:ml-4 w-full">
                        <div class="flex justify-between items-center text-gray-500">
                            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><router-link
                                    :to="`/variant/${variant._id}`">{{variant.title}}</router-link></h2>
                            <p class="space-x-4">
                                {{variant.likes}}
                                <font-awesome-icon icon="fa-solid fa-heart"
                                    :class="$store.state.userData ? 'cursor-pointer ' + (variant.liked ? 'text-rose-500' : '') : ''"
                                    @click="() => $store.state.userData ? toggleLike(variant._id) : ''" />
                                <font-awesome-icon icon="fa-solid fa-thumbtack" class="cursor-pointer"
                                    :class="variant.saved ? 'text-primary-500' : ''" v-if="$store.state.userData"
                                    @click="() => toggleSave(variant._id)" />
                            </p>
                        </div>

                        <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{variant.description ||
                        `The variant author has not provided a description. Please check back later.`}}</p>
                        <div class="flex justify-between items-center">
                            <router-link class="flex items-center space-x-4" :to="`/user/${variant.author}`">
                                <img class="w-7 h-7 rounded-full" :src="variant.user?.picture || '/notfound.png'"
                                    alt="?" />
                                <span class="font-medium dark:text-white">
                                    {{variant.user?.name || variant.author}}
                                </span>
                            </router-link>
                            <router-link :to="`/variant/${variant._id}`"
                                class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                Check it out
                                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </router-link>
                        </div>
                    </div>

                </article>
            </div>
            <button type="button" v-if="showLoadMore" @click="loadMore"
                class="w-full my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load
                More</button>
            <p class="w-full my-4 text-center font-normal text-gray-700 dark:text-gray-400" v-else>
                No more variants to load
            </p>
        </div>
    </section>
</template>