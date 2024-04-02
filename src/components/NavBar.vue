<template>
  <nav class="nav-style">
    <div class="left">
      <select
        class="info-nav"
        :disabled="$store.state.lists.length < 1"
        v-on:change.prevent="currentOption"
        v-model="selectedOption"
      >
        <option :value="null">Edit list</option>
        <option v-for="list in lists" v-bind:list="list" v-bind:key="list.Id">
          {{ list.listId }}
        </option>
      </select>
      <button class="info-nav" v-on:click="createLists">Create lists</button>
    </div>
    <h1 class="right">GROCEE-GO</h1>
  </nav>
</template>

  
<script >
import listService from "../services/ListService";
import listEntryService from "../services/ListEntryService";

export default {
  data() {
    return {
      editvalue: this.$store.state.lists[0].listId,
      selectedOption: null,
      list: {},
      lists: [],
      listEntries: [],
    };
  },
  props: ["current"],
  methods: {
    created() {
      this.getAllLists();
    },
    getEntries(id) {
      return listEntryService.get(id).then((response) => {
        return (this.listEntries = response.data);
        console.log(this.lists);
      });
    },

    currentOption() {
      this.$store.commit("CHANGE_CURRENT", this.selectedOption);
      console.log(this.selectedOption);
      console.log(this.$store.state.currentList);
      // this.getEntries(this.selectedOption)
      console.log(this.listEntries);
      // this.$store.commit("CHANGE_CURRENT_LIST", this.listEntries)
    },

    /*createList() {
      this.list.listId = this.$store.state.lists.length + 1 + "";
      console.log(this.$store.state.lists.length);
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day}`;
      this.list.date = currentDate;
      console.log(currentDate); // "17-6-2022"            this.list.date = date
      this.$store.commit("ADD_LIST", this.list);
      console.log(this.$store.state.lists.length);
    },*/

    createLists() {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (month < 10) {
        month = "0" + month;
      }

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day}`;
      this.list.date = currentDate;

      console.log(this.list);
      listService
        .create(this.list)
        .then((response) => {
          if (response.status === 201) {
            console.log("success");
          }
        })
        .catch((error) => {
          console.log(error + "fail");
        });
      //this.getAllLists()
    },
    getAllLists() {
      listService.list().then((response) => {
        this.lists = response.data;
        console.log(this.lists);
      });
    },
    getEntries(id) {
      return listEntryService.get(id).then((response) => {
        return (this.listEntries = response.data);
        console.log(this.lists);
      });
    },
  
  },
  created() {
    this.getAllLists();
  },
};
</script>
  
<style>
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