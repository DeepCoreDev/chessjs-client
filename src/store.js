import Vuex from "vuex";
import axios from "axios";

var $store = new Vuex.Store({
    state: {
        color: 'light',
        apiPrefix: '',
        userData: null,
        deepcoreServer: "localhost:5174"
    },
    getters: {},
    mutations: {
        changeColor(state, payload) {
            state.color = payload;
            localStorage.theme = payload;
            if (payload == 'light') {
                document.documentElement.classList.remove('dark');
            } else {
                document.documentElement.classList.add('dark');
            }
        },
        updateUserData(state, payload) {
            state.userData = payload;
        }
    },
    actions: {
        async fetchUserData(context) {
            var e = await axios.get(context.state.apiPrefix + "/api/fetch");
            if (e.data.user) {
                context.commit("updateUserData", e.data.user);
            } else {
                context.commit("updateUserData", null);
            }
        }
    }
})

export default $store;