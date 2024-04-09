<template>
  <div id="list-item">
    <nav class="nav-style">
      <div class="left">
        <select
          class="info-nav"
          :disabled="lists < 1"
          v-on:change="$router.push(`/list/${selectedOption}`)"
          v-model="selectedOption"
        >
          <option :value="null">Edit list</option>
          <option v-for="list in lists" v-bind:list="list" v-bind:key="list.Id">
            {{ list.listId }}
          </option>
        </select>
        <button class="info-nav" v-on:click="createLists">Create list</button>
        <button class="info-nav" v-if="selectedOption" v-on:click="deleteList">
          Delete list {{ selectedOption }}
        </button>
      </div>        
      <h1 v-if="$store.state.message">{{ $store.state.message }} </h1>

      <h1 class="right">GROCEE-GO</h1>
    </nav>
  </div>
  <router-view />
</template>
  
<script >
import listEntryService from "./services/ListEntryService";
import listService from "./services/ListService";
import productService from "./services/ProductService";

export default {
  data() {
    return {
     
      listEntries: [],
      listNew: {},
      lists: [],
      products: [],
      selectedOption: null,
      message: "",
    };
  },
 
  methods: {

    async createLists() {
      //make created date for list object
      const date = new Date();

      let newList = "";

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day}`;
      this.listNew.date = currentDate;

      await listService
        .create(this.listNew)
        .then((response) => {
          if (response.status === 201) {
           //create the lists and retireve
            listService.list().then((response) => {
              this.lists = response.data;
              //take the newest list and use to route to that id's page
              newList = this.lists[this.lists.length - 1].listId;
              this.$router.push(`/list/${newList}`);
              //set newlist as current option in dropdown menu
              this.selectedOption = newList;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },

    getAllProducts() {
      productService.list().then((response) => {
        this.products = response.data;
        console.log(this.products);
      });
    },

     async deleteList() {
      if (
        window.confirm(
          `Would you like to delete list ${this.$route.params.id}?`
        )
      ) {
      

        try {
          // Delete list entries associated with the list
          await this.deleteListEntries();

          // Delete the list itself
          await listService.delete(this.$route.params.id);

          // Update the list of lists after deletion
          await this.getAllLists();

          // Provide feedback to the user
          this.message = `List ${this.selectedOption} was deleted`;
          this.$store.commit("CHANGE_MESSAGE", this.message);

          // Reset selected option and redirect to home
          this.selectedOption = null;
          this.$router.push(`/`);
        } catch (error) {
          console.error(error);
          // Re-enable the delete button in case of error
          deleteButton.disabled = false;
        }
      }
    },
    async deleteListEntries() {
      // Get list entries associated with the list
      const entries = this.$store.state.listEntries;

      // Loop through list entries and delete each one
      for (const entry of entries) {
        await listEntryService.delete(entry.listEntryId);
        // Update the list of list entries after deletion
        this.$store.commit("REMOVE_LIST_ENTRY", entry);
      }
    },
    async getAllLists() {
      // Retrieve the updated list of lists
      const response = await listService.list();
      this.lists = response.data;
    },
  },
  created() {
    this.getAllLists();
  },
};
</script>
  
<style >
#list-item {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  color: #2c3e50;
}

main {
  width: 100%;
}
.nav-style {
  height: 50px;
  background-color: rgb(207, 226, 226);
}

nav {
  border-bottom: 1px solid black;
  position: fixed;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left-nav . right-nav";
}

.left {
  display: flex;
  grid-area: left-nav;
  margin-left: 10px;
}

.option {
  border-radius: 8px;
}

.right {
  align-items: top;
  grid-area: right-nav;
  text-align: right;
  margin-right: 20px;
  height: 50px;
  color: rgb(255, 255, 255);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.info-nav {
  background-color: rgb(255, 250, 250);
  border: 1px solid black;
  border-radius: 10px;
  height: 30px;
  width: 100px;
  padding: 0px;
  margin: 15px;
}
.info-nav:hover {
  background-color: rgb(177, 186, 195);
  cursor: pointer;
}
</style>
  