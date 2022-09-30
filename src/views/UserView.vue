<script>
import axios from 'axios';
import NotFound from "./NotFound.vue";
import ListModal from '../components/ListModal.vue'
export default {
    data() {
        return {
            userData: null,
            currentUser: false,
            notFound: false,
            filters: {
                filteredGames: [],
                filteredVariants: []
            },
            generated: {
                generatedVariants: []
            },
            state: {
                showProfilePictureEdit: false,
                showProfilePictureEditModal: false,
                showUserEditDropdown: false,
                showUserEdit: false,
            },
            maxListLength: 5,
            blockScrolling: false,
            editing: {
                displayName: "",
                description: "",

                private: false
            },
            rankData: {
                0: { name: "Free", color: "hidden" },
                1: { name: "Pawn", color: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800", icon: "fas fa-chess-pawn" }, // Basic
                2: { name: "Rook", color: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900", icon: "fas fa-chess-rook" }, // Advanced
                3: { name: "Queen", color: "bg-purple-200 text-purple-900", icon: "fas fa-chess-queen" }, // Premium
                4: { name: "King", color: "bg-yellow-200 text-yellow-900 shadow-yellow-200 glow", icon: "fas fa-crown hover:animate-spin" }, // Backer / Lifetime tier
                999: { name: "Admin", color: "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900", icon: "fa-solid fa-screwdriver-wrench" } //Admin
            }
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchData()
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    methods: {
        viewAllGames(e) {

        },
        edit(e) {
            axios.post(this.$store.state.apiPrefix + `/api/user/update`, {
                display_name: this.editing.displayName,
                description: this.editing.description
            }).then((e) => {

            });
        },
        setDisplayName(e) {
            this.editing.displayName = e.target.innerText;
            this.userData.display_name = this.editing.displayName;
        },
        setDescription(e) {
            this.editing.description = e.target.innerText;
            this.userData.description = this.editing.description;
        },
        showProfilePictureEditModal(e) {
            if (!this.currentUser) {
                return;
            }
            this.state.showProfilePictureEditModal = true;
        },
        updateProfileImage(e) {
            var formData = new FormData();
            formData.append("image", e.target.files[0]);
            axios.post(this.$store.state.apiPrefix + `/api/user/pfp`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((e) => {
                this.$store.dispatch("fetchUserData");
                this.state.showProfilePictureEditModal = false;
                location.reload();
            });
        },
        saveUserSettings(e) {
            axios.post(this.$store.state.apiPrefix + `/api/user/update`, {
                private: this.editing.private
            }).then((e) => {
                this.state.showUserEdit = false;
                this.state.showUserEditDropdown = false;
            });

        },
        logout(e) {
            axios.post(this.$store.state.apiPrefix + `/api/user/logout`).then((e) => {
                this.$store.dispatch("fetchUserData");
                this.$router.push({ name: 'home' });
            });
        },
        fetchData() {
            var vm = this;
            async function generate() {
                vm.filters.filteredGames.push(...vm.userData.games.slice(0, vm.maxListLength));
                for (let i = 0; i < Math.min(vm.maxListLength, vm.userData.library.length); i++) {
                    try {
                        var e = await axios.get(vm.$store.state.apiPrefix + `/api/variant/fetch?id=${vm.userData.library[i]}`);
                        vm.generated.generatedVariants.push(e.data);
                    } catch (e) {
                        console.log(e);
                    }
                }
                vm.filters.filteredVariants = vm.generated.generatedVariants.slice(0, vm.maxListLength);
                vm.editing.displayName = vm.userData.display_name;
                vm.editing.description = vm.userData.description;
            }

            if (this.$route.params.username) {
                axios.get(this.$store.state.apiPrefix + `/api/user/fetch?id=${this.$route.params.username}`).then((e) => {
                    this.userData = e.data;
                    document.title = this.userData.display_name + " | ChessJS";
                    if (this.$store.state.userData && this.userData.username == this.$store.state.userData.username) {
                        this.currentUser = true;
                        this.editing.private = this.userData.private;
                    }
                    generate();
                }).catch((e) => {
                    console.log(e);
                    this.userData = null;
                    this.notFound = true;
                })
            } else {
                this.notFound = true;
            }
        }
    },
    components: {
        NotFound,
        ListModal
    },
    watch: {
        blockScrolling: {
            handler(blockScrolling) {
                this.$emit("setScrolling", blockScrolling);
            },
        },
        state: {
            handler(newState) {
                this.blockScrolling = newState.showLibraryModal || newState.showProfilePictureEditModal;
            },
            deep: true
        }
    }
}
</script>
<template>
    <NotFound v-if="notFound"></NotFound>
    <div class="pb-8 container w-fit grid grid-cols-1 md:grid-cols-3 gap-4 mx-2 md:mx-auto" v-if="userData">
        <div
            class="w-full md:w-96 md:h-128 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="relative top-5 right-5">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" v-if="currentUser"
                    @click="state.showUserEditDropdown = !state.showUserEditDropdown"
                    class="absolute top-0 right-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button">
                    <span class="sr-only">Open dropdown</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                        </path>
                    </svg>

                </button>
                <div id="dropdown" v-if="state.showUserEditDropdown"
                    class="absolute top-10 right-0 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                    <ul class="py-1">
                        <li>
                            <a @click="state.showUserEdit ? saveUserSettings(e) : state.showUserEdit = true; state.showUserEditDropdown = false; "
                                class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{{
                                state.showUserEdit
                                ? "Save" : "Edit"
                                }}</a>
                        </li>
                        <li>
                            <a @click="state.showUserEditDropdown = false"
                                class="block cursor-pointer py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Close</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="!state.showUserEdit">
                <img class="m-4 mx-auto object-cover rounded-full w-48 h-48 " :src="userData.pfp" alt=""
                    :class="state.showProfilePictureEdit && currentUser ? 'border-4 border-transparent brightness-50 cursor-pointer' : ''"
                    @mouseover="state.showProfilePictureEdit = true" @mouseleave="state.showProfilePictureEdit = false"
                    @click="showProfilePictureEditModal" />
                <div class="p-5 ">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" @input="setDisplayName"
                        @focusout="edit" :contenteditable="this.currentUser" spellcheck="false">
                        {{ userData.display_name }}</h1>
                    <div class="mb-2 inline-flex text-1xl font-bold tracking-tight text-gray-400 dark:text-gray-400">
                        <span class="mr-3">@{{ userData.username }}</span>
                        <span class="text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 badge"
                            :class="rankData[userData.permission].color">
                            <font-awesome-icon class="mr-1 w-3 h-3 glyphicon"
                                :class="rankData[userData.permission].icon" :icon="rankData[userData.permission].icon">
                            </font-awesome-icon> {{
                            rankData[userData.permission].name
                            }}
                        </span>
                        <span v-if="userData.backer"
                            class="text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 badge bg-yellow-200 text-yellow-900 shadow-yellow-200 glow">Backer
                        </span>
                    </div>

                    <div class="w-96"></div>
                    <p class="max-w-sm mb-3 font-normal text-gray-700 dark:text-gray-400" @input="setDescription"
                        @focusout="edit" :contenteditable="this.currentUser" spellcheck="false">{{
                        userData.description
                        }}
                    </p>
                    <button type="button" @click="logout" v-if="this.currentUser"
                        class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Logout
                        <font-awesome-icon icon="fa-solid fa-arrow-right" class="ml-3" />
                    </button>
                </div>
            </div>

            <div v-if="state.showUserEdit" class="p-5 mx-12 md:mx-20">
                <div class="m-4 mt-8 mx-auto w-48">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Account
                        Settings
                    </h5>
                </div>
                <label for="private-account-toggle" class="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" id="private-account-toggle" class="sr-only peer" v-model="editing.private">
                    <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600">
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Private Account?</span>
                </label>
            </div>
        </div>
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Games</h5>
                <button @click="viewAllGames"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    View all
                </button>
            </div>
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="py-3 sm:py-4" v-for="game in filters.filteredGames">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" :src="game.icon" alt="Neil image">
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {{ game.title }}
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {{ game.variant.title }}
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {{ game.winner }}
                            </div>
                        </div>
                    </li>
                    <li class="pt-3 pb-0 sm:pt-4" v-if="userData.games.length == 0">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    This person hasn't played any games!
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Variants
                </h5>
                <router-link :to="{ name: 'create' }" v-if="currentUser" type="button"
                    class="ml-2 py-2 px-3 text-xs font-medium text-center text-white bg-primary-700 rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Create</router-link>
                <router-link :to="`/library?author=${userData.username}&count=${userData.library.length}`"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    View all
                </router-link>
            </div>
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="py-3 sm:py-4" v-for="variant in filters.filteredVariants">
                        <a :href="`/variant/${variant._id}`" class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" :src="variant.icon" alt="Neil image">
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {{ variant.title }}
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {{ variant.id }}
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <p class="ml-1">{{ variant.likes }} <font-awesome-icon icon="fa-solid fa-heart" /></p>
                            </div>
                        </a>
                    </li>
                    <li class="pt-3 pb-0 sm:pt-4" v-if="filters.filteredVariants.length == 0">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    This person hasn't created any variants!
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
    <div class="cover-screen bg-gray-700/40 h-screen grid grid-cols-1 place-items-center"
        v-if="state.showProfilePictureEditModal">
        <div class="z-50 md:inset-0 h-modal h-fit">
            <div class="relative p-4 w-full w-fit h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="relative bg-white w-96 rounded-lg shadow dark:bg-gray-700">
                        <button type="button" @click="state.showProfilePictureEditModal = false"
                            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-toggle="authentication-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="py-6 px-6 lg:px-8">
                            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Change your profile
                                picture
                            </h3>
                            <form class="space-y-6" action="#">
                                <div class="flex justify-center items-center w-full">
                                    <label for="dropzone-file"
                                        class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                            <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                                </path>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                    class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF
                                                (MAX. 10MB)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden"
                                            @change="updateProfileImage" />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>