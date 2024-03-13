<template>
  <div class="container">
    <section class="list-entry">
      <div class="info-entry">{{ entry.productName }}</div>
      <div class="info-entry" v-show="!edit">${{ entry.cost }} {{ entry.category === "1" ? "per lb" : "per item" }}</div>
      <input class="info-entry" v-show="edit" :placeholder="entry.cost" v-model="cost" />
      <div class="info-entry" v-show="!edit">{{ entry.quantity }} {{ quantityDescription() }}</div>
      <input class="info-entry" v-show="edit" :placeholder="entry.quantity"  v-model="cost" />
      <div class="info-entry">${{ entry.quantity * entry.cost }}</div>
      <button v-on:click="removeEntry()">Delete</button>
      <button v-on:click="editToggle()" v-show="!edit">Edit</button>
      <button v-on:click="editToggle()" v-show="edit">Save</button>



    </section>
  </div>
</template>
  
<script>
export default {

  data() {
    return {
      edit: false,
      

    }
  },
  props: {
    entry: Object,
  },
  computed: {
    cost: {
      get() {
       
        return this.entry.cost
      },
      set(value, entry) {
        this.$store.commit('EDIT_ENTRY', value, entry)
      }
    }


  },
  methods: {

    quantityDescription(){
      if(this.entry.category == 1 && this.entry.quantity == 1){
        return "lb"
      }else if(this.entry.category == 1 ){
        return "lbs"
      }

      if(this.entry.category == 2 && this.entry.quantity == 1){
        return "item"
      }else{
        return  "items"
      }

      
    },
    removeEntry() {

      if (window.confirm(`Would you like to delete ${this.entry.productName} from your list?`)) {
        this.$store.commit('REMOVE_LIST_ENTRY', this.entry);
        //this.listEntry = {};
        // console.log(this.entry)
      }

    },
    editToggle() {
      this.edit = !this.edit
      this.updateEntry()
      //this.saveEdit()

    },
    updateCost() {
      //this.edit = !this.edit

      this.$store.commit('EDIT_ENTRY', this.entry);


    },
    updateEntry(){
      this.$store.commit("CHANGE_CURRENT_ENTRY", this.entry.listEntryId)

    }


  }
}

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

.info-entry {
  background-color: rgb(255, 250, 250);
  border: 1px solid black;
  border-radius: 10px;
  height: 20px;
  width: 100px;
  padding: 10px;
  margin: 10px;

}
</style>