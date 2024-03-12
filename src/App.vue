<template>
  <div>
    <NavBar />
  </div>
  <main>
    <div id="list-item">
      <grocery-list />
    </div>
  </main>
</template>

<script >

import GroceryList from './components/GroceryList.vue';
import NavBar from './components/NavBar.vue';
import ListEntry from './components/ListEntry.vue';

export default {


  components: {
    
    NavBar,
    ListEntry,
    GroceryList
}
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
