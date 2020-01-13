import uuidv4 from 'uuid/v4'

const state = {
    all: [],
    allIds: [],
    allMsgIds: []
};
const getters = {
    availableShows(state) {
        return state.all;
    },
};
const mutations = {
    SET_CONVERSATION(state, {conversation}) {
        const data = conversation.data();

        // state.all = {...state.all, [conversation.id]: data.info};
        state.all.push(data.info);

        state.allIds.push(conversation.id)
    },

    ADD_MESSAGE(state, {conversationId, message}) {
        if (!state.allMsgIds.includes(message.id)) {
            state.all[conversationId].messages.push(message);
            state.allMsgIds.push(message.id)
        }
    },
}

const actions = {
    sendMessage({commit, rootState}, {text, created, sender, conversationId}) {
        const convoRef = rootState.db.collection('conversations').doc(conversationId)

        convoRef.update({
            messages: [...state.all[conversationId].messages, {id: uuidv4(), created, sender, text}]
        })
            .then(res => console.log('Message sent.'))
            .catch(err => console.log('Error', err))
    },

    async seed({rootState, commit}, {blub, name}) {
        let convoRef = rootState.db.collection('shows');
        await convoRef.add({
            info: {
                id: uuidv4(),
                blub: blub,
                name: name
            }
        })
    },
    async get({commit, rootState}) {
        let convoRef = rootState.db.collection('shows');
        let convos = await convoRef.get();
        convos.forEach(conversation => commit('SET_CONVERSATION', {conversation}))
    }
};

export default {namespaced: true, state, mutations, actions, getters}
