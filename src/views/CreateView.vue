<script> 
import axios from 'axios';
export default {
    methods: {
        create(e){
            axios.post(this.$store.state.apiPrefix + `/api/variant/create`, {
                title: this.models.title
            }).then((e) => {
                this.$router.push('/variant/'+e.data);
            })
        }
    },
    data(){
        return {
            models: {
                title: null
            }
        }
    },
    created(){
        if(!this.$store.state.userData){
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<template>
    <section>
        <div class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-auto h-8 mr-2" :src="`/${$store.state.color}/chessjs.png`" alt="ChessJS logo">
            </div>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create a variant
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="create">
                        <div>
                            <label for="variant_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Variant
                                Name</label>
                            <input type="text" name="variant_name" id="variant_name" v-model="models.title"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="My Fancy New Variant" required>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next
                            <i class="fa-solid fa-arrow-right"></i></button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Looking to edit yours? <a href="/user"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Find it here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>