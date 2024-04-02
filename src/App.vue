<template>
  <div>
  </div>
  <main>
    <div id="list-item">
      <grocery-list />
    </div>
  </main>
</template>

<script>

import GroceryList from './components/GroceryList.vue';
import listEntryService from "./services/ListEntryService";

export default {
//add entry list here so it adjusts on change

data() {
    return {
      //  current: ,
      //return entries associates with current list
      listEntries: [],
    };
  },
  components: {
    
   
    GroceryList
},
 methods: {
    getEntries(id) {
      return listEntryService.get(id).then((response) => {
       return this.listEntries = response.data;
        console.log(this.lists);
      });
    },
  },
  created(){
      this.getEntries(this.$store.state.currentList)
  },
}

</script>

<style >
#list-item{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  color: #2c3e50;

}

main{
  width: 100%;
}
</style>
