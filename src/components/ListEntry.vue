<template>
  <div class="container">
    <section class="list-entry">
      <div v-bind:class="{ disabledMode: edit, 'info-entry': !edit }">
        {{ entry.productName }}
      </div>
      <div class="info-entry" v-show="!edit">
        ${{ entry.cost }} {{ entry.category == 1 ? "per lb" : "per item" }}
      </div>
      x
      <input
        class="info-entry"
        v-show="edit"
        :placeholder="entry.cost"
        v-model="entry.cost"
      />
      <div class="info-entry" v-show="!edit">
        {{ entry.quantity }} {{ quantityDescription() }}
      </div>
      <input
        class="info-entry"
        v-show="edit"
        :placeholder="entry.quantity"
        v-model="entry.quantity"
      />=
      <div class="info-entry">${{ (entry.quantity * entry.cost).toFixed(2) }}</div>
      <button v-on:click="removeEntry()">Delete</button>
      <button v-on:click="editToggle()" v-show="!edit">Edit</button>
      <button v-on:click="editToggle()" v-show="edit">Save</button>
    </section>
  </div>
</template>
  
<script>
import listEntryService from "../services/ListEntryService";
export default {
  data() {
    return {
      edit: false,
      cost: this.entry.cost
    };
  },
  props: {
    entry: Object,
  },
  computed: {
   
   
  },
  methods: {
    
    quantityDescription() {
      if (this.entry.category == 1 && this.entry.quantity == 1) {
        return "lb";
      } else if (this.entry.category == 1) {
        return "lbs";
      }

      if (this.entry.category == 2 && this.entry.quantity == 1) {
        return "item";
      } else {
        return "items";
      }
    },

    removeEntry() {
      if (
        window.confirm(
          `Would you like to delete ${this.entry.productName} from your list?`
        )
      ) {
        this.$store.commit("REMOVE_LIST_ENTRY", this.entry);
        //this.listEntry = {};

        listEntryService
          .delete(this.entry.listEntryId)
          .then((response) => {
            if (response.status === 204) {
              console.log("deleted list entry");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    editToggle() {
      //toggle between edit and save buttons
      this.edit = !this.edit;
      this.updateEntry();

    },


    updateEntry() {
       //save updated ent
      listEntryService
        .updateEntry(this.entry.listEntryId, this.entry)
        .then((response) => {
          if (response === 200) {
            console.log("success");
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },
  },
};
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

.disabledMode {
  background-color: rgb(207, 226, 226);
  border: 1px solid rgb(207, 226, 226);
  border-radius: 10px;
  height: 20px;
  width: 100px;
  padding: 10px;
  margin: 10px;
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
  width: 130px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  
}
</style>