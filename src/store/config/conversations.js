import uuidv4 from 'uuid/v4'

const state = {
    all: [],
    allIds: [],
    allMsgIds: []
};
const getters = {
    availableShows(state) {
        // return Object.entries(state.all).map((i) => {
        //     return i.map((j) => {
        //         return j
        //     })
        // })
        return state.all

    },
};
const mutations = {
    SET_CONVERSATION(state, {conversation}) {
        const data = conversation.data();
        state.all = [...state.all, {[conversation.id]: data}];

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
    delete({rootState}) {
        return rootState.db.collection('shows').delete();

    },
    // async seed({rootState, commit}, {blub, name}) {
    //     let convoRef = rootState.db.collection('shows');
    //     await convoRef.add({
    //         '.key': uuidv4(),
    //         'blub': blub,
    //         'name': name
    //     })
    // },
    async seed({commit, rootState}, {blub, name}) {
        rootState.db.collection('shows').add({
            id: uuidv4(),
            blub: blub,
            name: name
        })
            .then(docRef => {
                console.log('Document written with ID: ', docRef.id);
                // this.$router.push(`/${slug}/success`)
            })
            .catch(function (error) {
                console.error('Error adding document: ', error)
            })
    },

    //
    get({commit, rootState}) {
        let convoRef = rootState.db.collection('shows');
        return convoRef.get().then((convo) => {
            return convo.forEach((conversation) => commit('SET_CONVERSATION', {conversation}));
        });
    }
};

export default {namespaced: true, state, mutations, actions, getters}
