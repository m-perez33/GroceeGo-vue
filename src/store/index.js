import { createStore as _createStore } from 'vuex';

export function createStore() {
    return _createStore({
        state: {
            message: "",
            currentList: "1",
            currentListEntryId:"",
            listEntries: []
        },
        mutations: {
        
            CHANGE_MESSAGE(state, current) {
                state.message = current;
            },
            UPDATE_LIST_ENTRIES(state, current){
                state.listEntries = current
            },
            REMOVE_LIST_ENTRY(state, listEntry) {
                let arr = state.listEntries;
                let arrRemain = arr.filter((entry) => {
                    return entry.listEntryId !== listEntry.listEntryId
                })
                state.listEntries = arrRemain;
            },
        },
        actions: {},
        modules: {},
        // Strict should not be used in production code. It is used here as a
        // learning aid to warn you if state is modified without using a mutation.
        strict: true
    });
}
