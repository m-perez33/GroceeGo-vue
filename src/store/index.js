import { createStore as _createStore } from 'vuex';

export function createStore() {
    return _createStore({
        state: {
            isDeleted:true,
            currentList: "1",
            currentListEntryId:"",
            lists: [
                {
                    listId: "1",
                    date: "2023-12-22"
                },
                {
                    listId: "2",
                    date: "2023-01-12"
                }
            ],
            products: [
                {
                    productName: "Banana",
                    productId: "1"
                },
                {
                    productName: "Pork",
                    productId: "2"
                },
                {
                    productName: "Corn Flakes",
                    productId: "3"
                },
                {
                    productName: "Ellios",
                    productId: "4"
                }
            ],
            listEntries: [
               
            ]
        },
        mutations: {
            CHANGE_CURRENT(state, current) {
                state.currentList = current;
            },
            CHANGE_ISDELETED(state, current) {
                state.isDeleted = current;
            },
            UPDATE_LIST_ENTRIES(state, current){
                state.listEntries = current
            },
            FLIP_DONE(state, buttonFlip) {
                buttonFlip.read = !buttonFlip.read;
            },
            SAVE_LIST_ENTRY(state, listEntry) {
                state.listEntries.push(listEntry);
            },
            REMOVE_LIST_ENTRY(state, listEntry) {
                let arr = state.listEntries;
                let arrRemain = arr.filter((entry) => {
                    return entry.listEntryId !== listEntry.listEntryId
                })
                state.listEntries = arrRemain;

                // console.log("this remains" + state.listEntries)

            },
            ADD_LIST(state, list){
                state.lists.push(list);
            },
            CHANGE_CURRENT_ENTRY(state, current) {
                state.currentListEntryId = current;
            },
           
            EDIT_COST(state, value) {
                let arr = state.listEntries;

                arr.forEach((entry) => {
                    if (entry.listEntryId === state.currentListEntryId) {
                        entry.cost = value
                    }

                    //console.log(entry.cost)

                })

            },
            EDIT_QUANTITY(state, value) {
                let arr = state.listEntries;

                arr.forEach((entry) => {
                    if (entry.listEntryId === state.currentListEntryId) {
                        entry.quantity = value
                    }

                    //console.log(entry.cost)

                })

            }
        },
        actions: {},
        modules: {},
        // Strict should not be used in production code. It is used here as a
        // learning aid to warn you if state is modified without using a mutation.
        strict: true
    });
}
