import uuidv4 from 'uuid/v4'

const state = {
    all: {},
    allIds: [],
    allMsgIds: []
};

const mutations = {
    SET_SHOW(state, {show}) {
        const data = show.data()
        state.all = {...state.all, [show.id]: {users: data.users, created: data.created, messages: []}};

        state.allIds.push(show.id)
    },

    ADD_MESSAGE(state, {showId, message}) {
        if (!state.allMsgIds.includes(message.id)) {
            state.all[showId].messages.push(message)
            state.allMsgIds.push(message.id)
        }
    },
};

const actions = {
    sendMessage({commit, rootState}, {text, created, sender, showId}) {
        const showRef = rootState.db.collection('shows').doc(showId);

        showRef.update({
            messages: [...state.all[showId].messages, {id: uuidv4(), created, sender, text}]
        })
            .then(res => console.log('Message sent.'))
            .catch(err => console.log('Error', err))
    },

    seed({rootState}) {
        let showRef = rootState.db.collection('shows');

        showRef.add({
            created: Date.now(),
            users: ['mr_a', 'mr_b'],
            messages: [
                {id: uuidv4(), text: 'Hi there', sender: 'mr_a', created: Date.now()},
                {id: uuidv4(), text: 'Hi to you too!', sender: 'mr_b', created: Date.now()}
            ]
        })

        showRef.add({
            created: Date.now(),
            users: ['mr_a', 'mr_c'],
            messages: []
        })
    },

    async get({commit, rootState}) {
        let showRef = rootState.db.collection('shows');
        let convos = await showRef.get();

        convos.forEach(show => commit('SET_SHOW', {show}))
    }
}

export default {namespaced: true, state, mutations, actions}
