<template>
  <div class="container">
    <section class="list-entry">
      <div class="info-entry">{{ entry.productName }}</div>
      <div class="info-entry">${{ entry.cost }}</div>
      <div class="info-entry">{{ entry.quantity }}</div>
      <div class="info-entry">${{ entry.quantity*entry.cost }}</div>
      <button v-on:click="removeEntry()">Delete</button>

    </section>
  </div>
</template>
  
<script>
export default {
  props: {
    entry: Object,
  },
  methods: {
    removeEntry() {
           
      if (window.confirm(`Would you like to delete ${this.entry.productName} from your list?`)) {

            this.$store.commit('REMOVE_LIST_ENTRY', this.entry);
            //this.listEntry = {};
            console.log(this.entry)
        }

  }
  }}

</script>
  
<style>
.list-entry {
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  height: 80px;
  place-items: center;
  background-color: rgb(207, 226, 226);
}

.container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.info-entry{
  background-color: rgb(255, 250, 250);
  border: 1px solid black;
  border-radius: 10px;
  height: 20px;
  width: 100px;
  padding: 10px;
  margin: 10px;

}
</style>