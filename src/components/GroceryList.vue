<template>
    <div>
        <NavBar />
    </div>
    <main>
        <div id="list">
            <new-list-entry :current="$store.state.currentList"/>
            <list-entry v-for="entry in entries" v-bind:entry="entry" v-bind:key="entry.listEntryId" 
             />
        </div>
        <h2 class="add">LIST {{ $store.state.currentList}} TOTAL = ${{totalAdd}}</h2>
    </main>
</template>
  
<script >

import ListEntry from '../components/ListEntry.vue';
import NewListEntry from './NewListEntry.vue';
import NavBar from './NavBar.vue';

export default {
    data() {
        return {
          //  current: ,
            total: 'hi'
        }
    },
   
    computed: {

        entries() {
            return this.$store.state.listEntries.filter((entry) => {
              //  console.log(this.current)

                return entry.listId === this.$store.state.currentList
            });
        }, 
        totalAdd() {
           
            return this.entries.reduce((acc, entry) => {
                let sum =entry.cost*entry.quantity
                //console.log(sum)
                return acc += sum
            },0)

        },

    },
    components: {
    ListEntry,
    NewListEntry,
    NavBar
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
  