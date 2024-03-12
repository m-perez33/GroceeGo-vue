<template>
    <div>
        <NavBar />
    </div>
    <main>
        <div id="list">
            <new-list-entry />
            <list-entry v-for="entry in entries" v-bind:entry="entry" v-bind:key="entry.listEntryId" 
             />
        </div>
        <span>List total ${{totalAdd}}</span>
    </main>
</template>
  
<script >

import ListEntry from '../components/ListEntry.vue';
import NewListEntry from './NewListEntry.vue';

export default {
    data() {
        return {
            total: 'hi'
        }
    },
   
    computed: {

        entries() {
            return this.$store.state.listEntries.filter((entry) => {
                return entry.listId === this.$store.state.currentList
            });
        }, 
        totalAdd() {
           
            return this.entries.reduce((acc, entry) => {
                let sum =entry.cost*entry.quantity
                console.log(sum)
                return acc += sum
            },0)

            return this.$store.state.listEntries[0].cost;
        },

    },
    components: {
    ListEntry,
    NewListEntry
}
}

</script>
  
<style >
#list {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 100px;
    color: #272d34;
    background-color: blanchedalmond;

}

main {
    width: 100%;
}
</style>
  