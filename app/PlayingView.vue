<script>
import { io } from 'socket.io-client';
import SigninErrorView from '../src/views/SigninErrorView.vue';
import NotFound from '../src/views/NotFound.vue';
import Chessboard from '../src/components/Chessboard.vue';
import axios from 'axios';
export default {
    data() {
        return {
            state: {
                authError: false,
                notfoundError: false
            },
            chessboard: {
                boardConfiguration: [],
                pieceConfiguration: [],
                validMoves: []
            },
            playerId: -1,
            meta: [],
            variant: null,
            players: []
        }
    },
    async mounted() {
        //if(!this.$store.state.userData){
        //    this.state.authError = true;
        //    return;
        //}
        if (this.$store.state.userData) {

        } else {
            this.$router.push('/');
        }

        var socket = io('', {
            auth: {
                play_id: this.$route.params.play_id,

            },
            path: '/socket'
        });
        socket.on('message', (m) => {
            if (m.code == 403) {
                // We're not signed in / can't log in
                this.state.authError = true;
            }
            if (m.code == 404) {
                this.state.notfoundError = true;
            }
        });
        socket.on('update', (m) => {
            this.chessboard.boardConfiguration = m.board;
            this.chessboard.validMoves = m.validMoves;
            this.chessboard.pieceConfiguration = m.piecePositions;
            this.playerId = m.player_id;
            this.meta = m.meta;

            if(this.players.length != this.meta.players.length){
                this.fetchPlayers();
            }
            if(!this.variant){
                this.fetchVariantData();
            }
        });
        socket.emit("requestUpdate", {});
        this.socket = socket;
    },
    components: {
        SigninErrorView,
        NotFound,
        Chessboard
    },
    methods: {
        movePiece(e){
            this.socket.emit("move", {
                move: e
            });
        },
        async fetchPlayers(){
            let temp = [];
            for(let i = 0; i < this.meta.players.length; i++){
                let e = await axios.get(this.$store.state.apiPrefix + `/api/user/fetch?id=${this.meta.players[i]}`);
                temp.push({
                    name: e.data.displayName || e.data.username,
                    picture: e.data.picture
                });
            }
            this.players = temp;
        },
        fetchVariantData(){
            axios.get(this.$store.state.apiPrefix + `/api/variant/fetch?id=${this.meta.variantID}`).then((e) => {
                this.variant = e.data;
                axios.get(this.$store.state.apiPrefix + `/api/user/fetch?id=${this.variant.author}`).then((u) => {
                    this.variant.user = u.data;
                });

            })
        }
    }   
}
</script>

<template>
    <SigninErrorView v-if="state.authError"></SigninErrorView>
    <NotFound v-else-if="state.notfoundError"></NotFound>
    <div v-else class="pb-8 container w-full grid md:grid-cols-4 gap-4 mx-2 md:mx-auto">
        <div class="p-4 col-span-1 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">About Game</h2>
            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">Players logged in:</p>
            <div class="flex items-center space-x-4 mb-4" v-for="player in players">
                <img class="w-7 h-7 rounded-full" :src="`//${$store.state.deepcoreServer}${player.picture}`" alt="?" />
                    <span class="font-medium dark:text-white">
                        {{player.name}}
                    </span>
            </div>
        </div>
        <div class="p-4 col-span-2 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="mx-auto w-min">
                <Chessboard :board-configuration="chessboard.boardConfiguration"
                    :piece-configuration="chessboard.pieceConfiguration" :move-piece="movePiece"
                    :valid-moves="chessboard.validMoves" :player-id="playerId">
                </Chessboard>
            </div>
        </div>
        <div class="p-4 col-span-1 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div v-if="variant">
                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a :href="`/variant/${variant._id}`" target="_blank">{{variant.title}}</a></h2>
                <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{variant.description}}</p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <img class="w-7 h-7 rounded-full"
                            :src="`//${$store.state.deepcoreServer}${variant.user.picture}`"
                            alt="?" />
                        <span class="font-medium dark:text-white">
                            {{variant.user?.displayName || variant.author}}
                        </span>
                    </div>
                    <a :href="`/variant/${variant._id}`" target="_blank"
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
            </div>
            <div role="status" v-else class="mx-auto w-min">
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
        </div>
    </div>
</template>