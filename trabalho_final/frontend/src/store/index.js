import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            userId: null, 
            role: null,
        };
    },
    mutations: {
        setUserId(state, userId, role) {
            state.userId = userId;
            state.role = role;
        },
    },
});

export default store;
