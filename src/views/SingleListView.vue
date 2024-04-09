<template>
  <main>
    <div id="list">
      <new-list-entry :current="$route.params.id" :products="products" />
      <list-entry
        v-for="entry in $store.state.listEntries"
        v-bind:entry="entry"
        v-bind:key="entry"
      />
    </div>
    <h2 class="add">
      LIST {{ this.$route.params.id }} TOTAL = ${{ totalAdd }}
    </h2>
  </main>
</template>
  
<script >
import ListEntry from "../components/ListEntry.vue";
import NewListEntry from "../components/NewListEntry.vue";
import listEntryService from "../services/ListEntryService";

export default {
  data() {
    return {
      current: this.$store.state.currentList,
      currentEntries: this.$store.state.listEntries,
      listEntries: [],
      listMain: {},
      lists: [],
      products: [],
      selectedOption: null,
      message: "",
    };
  },
  components: {
    ListEntry,
    NewListEntry,
  },
  props: {},

  computed: {
    totalAdd() {
      //adds entries for current list
      return this.$store.state.listEntries.reduce((acc, entry) => {
        let sum = entry.cost * entry.quantity;
        return (acc += sum);
      }, 0);
    },
  },
  methods: {
    async getEntries() {
      await this.$store.commit("CHANGE_MESSAGE", this.message);

      await listEntryService.get(this.$route.params.id).then((response) => {
        this.listEntries = response.data;
        this.listEntries.sort((a, b) => b.listEntryId - a.listEntryId);
      });

      this.$store.commit("UPDATE_LIST_ENTRIES", this.listEntries);
    },
  },
  created() {
    this.$watch(
      () => this.$route.params.id,
      (newId, oldId) => {
        this.getEntries();
      }
    );
  },
  beforeMount() {
    console.log("this was deleted before mount");
    this.$store.commit("CHANGE_MESSAGE", this.message);
    this.getEntries();
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

.title {
  text-align: center;
  background-color: rgb(255, 250, 250);
  border: 1px solid black;
  height: 50px;
  width: 200px;
  position: relative;
}
.add {
  font-size: small;
  padding: 10px;
  text-align: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

}
</style>
  