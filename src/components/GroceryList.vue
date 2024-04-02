<template>
  <div>
    <nav class="nav-style">
      <div class="left">
        <select
          class="info-nav"
          :disabled="$store.state.lists.length < 1"
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
        <span v-if="$store.state.isDeleted">{{ selectedOption }} was deleted</span>
      </div>
      <h1 class="right">GROCEE-GO</h1>
    </nav>
  </div>
  <router-view />

  <!-- 
  <main>
    <div id="list">
      <new-list-entry :current="this.current" :products="products" />
      <list-entry
        v-for="entry in $store.state.listEntries"
        v-bind:entry="entry"
        v-bind:key="entry"
      />
    </div>
    <h2 class="add">LIST {{ this.current }} TOTAL = ${{ totalAdd }}</h2>
  </main> -->
</template>
  
<script >
import ListEntry from "../components/ListEntry.vue";
import NewListEntry from "./NewListEntry.vue";
import listEntryService from "../services/ListEntryService";
import listService from "../services/ListService";
import productService from "../services/ProductService";

export default {
  data() {
    return {
      current: this.$store.state.currentList,
      // total: "hi",
      currentEntries: this.$store.state.listEntries,
      //return entries associates with current list
      listEntries: [],
      listMain: {},
      lists: [],
      products: [],
      selectedOption: null,
      isDeleted: false,
    };
  },
  components: {
    ListEntry,
    NewListEntry,
  },
  props: {},

  computed: {
    /*entries() {

       this.$store.state.listEntries.filter((entry) => {
        //  console.log(this.current)

         entry.listId === this.current;
        this.current = entry.listId

      });
    },*/
    totalAdd() {
      //adds entries for current list
      return this.listEntries.reduce((acc, entry) => {
        let sum = entry.cost * entry.quantity;
        //console.log(sum)
        return (acc += sum);
      }, 0);
    },
  },
  methods: {
    //need create list method

    async createLists() {
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
      this.listMain.date = currentDate;

      console.log(this.listMain);
      await listService
        .create(this.listMain)
        .then((response) => {
          if (response.status === 201) {
            console.log("success");
            // this.getAllLists();
            listService.list().then((response) => {
              this.lists = response.data;
              newList = this.lists[this.lists.length - 1].listId;
              console.log(newList);
              this.$router.push(`/list/${newList}`);
              this.selectedOption = newList;              
              this.isDeleted=null

            });
          }
        })
        .catch((error) => {
          console.log(error + "fail");
        });

      //newList  = this.lists[this.lists.length - 1].listId

      console.log(this.lists);
    },

    async getAllLists() {
      await listService.list().then((response) => {
        this.lists = response.data;
        this.isDeleted = null
        console.log(this.lists[this.lists.length - 1].listId);
      });
    },
    getAllProducts() {
      productService.list().then((response) => {
        this.products = response.data;
        console.log(this.products);
      });
    },

    deleteList() {
      if (
        window.confirm(
          `Would you like to delete list ${this.$route.params.id}?`
        )
      ) {
        console.log(this.current);
        let isEmpty = false;
        console.log(this.$store.state.listEntries);
        // let currentEntries = this.$store.state.listEntries
        if (this.$store.state.listEntries.length > 0)
          this.$store.state.listEntries.forEach((entry) => {
            listEntryService
              .delete(entry.listEntryId)
              .then((response) => {
                console.log(response.status);
                if (response.status === 204) {
                  console.log("deleted le");
                  this.$store.commit("REMOVE_LIST_ENTRY", entry);
                }
                if (this.$store.state.listEntries.length === 0) {
                  listService
                    .delete(this.$route.params.id)
                    .then((response) => {
                      if (response.status === 204) {
                        ///set deleted message to home page
                        console.log("deleted");
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
        this.deleteListOnly();
        this.selectedOption = null;
        this.isDeleted = true
        this.$router.push(`/`);
      }
    },

    deleteListOnly() {
      if (this.$store.state.listEntries.length === 0) {
        listService
          .delete(this.$route.params.id)
          .then((response) => {
            if (response.status === 204) {
              ///set deleted message to home page
              console.log("deleted");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async getEntries(id) {
      await listEntryService.get(id).then((response) => {
        this.listEntries = response.data;
        this.listEntries.sort((a, b) => b.listEntryId - a.listEntryId);
        console.log(this.listEntries);
                      this.isDeleted=null

      });
      this.current = id;

      this.$store.commit("UPDATE_LIST_ENTRIES", this.listEntries);
    },
  },
  created() {
    // this.getEntries(this.$route.params.id);
    this.getAllLists();
    this.getAllProducts();
  },
  components: {
    ListEntry,
    NewListEntry,
  },
};
</script>
  
<style >
#list {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
.nav-style {
  height: 50px;
  background-color: rgb(207, 226, 226);
}

.title {
  text-align: center;
  background-color: rgb(255, 250, 250);
  border: 1px solid black;
  height: 50px;
  width: 200px;
  position: relative;
}

nav {
  border: 1px solid black;
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
  