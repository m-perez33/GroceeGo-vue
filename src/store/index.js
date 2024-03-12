import { createStore as _createStore } from 'vuex';

export function createStore() {
    return _createStore({
        state: {
            currentList: "1",
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
                {
                    listId: "1",
                    listEntryId: "1",
                    productId: "1",
                    productName: "Banana",
                    cost: "2",
                    quantity: "10",
                    category: "1"

                },
                {
                    listId: "1",
                    listEntryId: "2",
                    productId: "4",
                    productName: "Ellios",
                    cost: "3",
                    quantity: "3",
                    category: "2"

                },
                {
                    listId: "2",
                    listEntryId: "3",
                    productId: "1",
                    productName: "Banana",
                    cost: "5",
                    quantity: "10",
                    category: "1"

                },
                {
                    listId: "2",
                    listEntryId: "4",
                    productId: "3",
                    productName: "Corn Flakes",
                    cost: "4",
                    quantity: "8",
                    category: "1"

                },
                {
                    listId: "1",
                    listEntryId: "5",
                    productId: "2",
                    productName: "Pork",
                    cost: "3",
                    quantity: "5",
                    category: "1"

                }

            ]
        },
        mutations: {
            CHANGE_CURRENT(state, current){
              state.currentList = current;
            },
            FLIP_DONE(state, buttonFlip) {
                buttonFlip.read = !buttonFlip.read;
            },
            SAVE_LIST_ENTRY(state, listEntry) {
                state.listEntries.push(listEntry);
            },
            REMOVE_LIST_ENTRY(state, listEntry) {
                let arr = state.listEntries;
                let arrRemain = arr.filter((entry)=>{
                    return entry.listEntryId !== listEntry.listEntryId
                })
                state.listEntries = arrRemain;

                console.log("this remains" + state.listEntries)

                
            },
        },
        actions: {},
        modules: {},
        // Strict should not be used in production code. It is used here as a
        // learning aid to warn you if state is modified without using a mutation.
        strict: true
    });
}
