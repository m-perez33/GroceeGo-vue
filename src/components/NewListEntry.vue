<template>
  <div class="container">
    <form v-on:submit.prevent="createEntry()">
      <h2 class="add">ADD TO LIST {{ this.$route.params.id }}</h2>
      <p>{{ currentList }}</p>
      <input
        class="product-input info-entry"
        name="title-input"
        type="text"
        placeholder="Product"
        v-model="listEntry.productName"
      />
      $
      <input
        class="cost-input info-entry"
        name="cost-input"
        type="text"
        placeholder="Cost"
        v-model="listEntry.cost"
      />
      <select
        class="select-style"
        v-on:change.prevent="perOption()"
        v-model="selectedOption"
      >
        <option :value="null">Select</option>
        <option>Per lb</option>
        <option>Per item</option>
      </select>
      <input
        class="quantity-input info-entry"
        name="quantity-input"
        type="text"
        placeholder="Quantity"
        v-model="listEntry.quantity"
      />
      <button>Save</button>
    </form>
  </div>
</template>
    
<script>
import listEntryService from "../services/ListEntryService";
import productService from "../services/ProductService";

export default {
  data() {
    return {
      listEntry: {
        listId: this.$route.params.id,
      },
      itExists: false,
      retrievedProducts: [],
      product: {},
      lastProduct: {},
      currentList: this.$store.currentList,
      selectedOption: null,
      message: ""
    };
  },
  props: ["current", "products"],

 
  methods: {
    perOption() {
      if (this.selectedOption === "Per lb") {
        this.listEntry.category = "1";
      } else {
        this.listEntry.category = "2";
      }
    },

    createEntry() {
      //get products
   
      this.listEntry.listId = this.$route.params.id;

      //go through products and check if it exists

      this.products.forEach((item) => {
        if (item.productName === this.listEntry.productName) {
          //if exists assign that product id to new list entry,
          //dont create new product
          this.listEntry.productId = item.productId;
          //then make entry
          this.makeEntry();
          this.itExists = true;
        }
      });
      if (this.itExists === false) {
        //if it does not exist create product
        console.log("made it this far");
        this.createProduct();
      }

    },
    async makeEntry() {
     //make list entry

      await listEntryService
        .create(this.listEntry)
        .then((response) => {
          if (response.status === 201) {
            console.log("created");
          } 
        })
        .catch((error) => {
          console.log(error);
        });
      this.listEntry = {};
      this.getEntries(this.$route.params.id);
    },

    async createProduct() {
      //assign current list id and entry name to product
      this.product.listId = this.current;
      this.product.productName = this.listEntry.productName;

      //create product 
      await productService
        .create(this.product)
        .then((response) => {
          if (response.status === 201) {
            console.log("created product");
            //if successful retrieve product for id make it into an entry
          } 
        })
        .catch((error) => {
          console.log(error);
        });

      //retrieve products
      await this.getAllProducts(this.product);

    },

    async getAllProducts(prod) {
      //retrieve products and check for match against passed parameter 

      await productService.list().then((response) => {
        this.retrievedProducts = response.data;
      });
      this.retrievedProducts.forEach((p) => {
        if (p.productName === prod.productName) {
          //if match use that product id in list entry
          this.listEntry.productId = p.productId;
        }
      });

      //proceed to make an entry
      this.makeEntry();

    },
    getAllLists() {
      listService.list().then((response) => {
        this.lists = response.data;
      });
    },
    async getEntries() {
      //get entries and sort so newest is on top
      await listEntryService.get(this.$route.params.id).then((response) => {
        this.listEntries = response.data;
        this.listEntries.sort((a, b) => b.listEntryId - a.listEntryId);
          console.log("success")
      });
      await this.$store.commit("UPDATE_LIST_ENTRIES", this.listEntries);
    },
    created() {
      // watch
       this.$watch(
      () => this.listEntries.length,
      (newId, oldId) => {
        this.getEntries();
      })
    },
    beforeMount(){
       console.log("this was deleted before mount")
       this.$store.commit("CHANGE_MESSAGE", this.message);
    },
    updated(){
      this.getEntries()
    }    
  },
};
</script>
    
<style>
.input-entry {
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  height: 200px;
  place-items: center;
  width: auto;
  padding-bottom: 20px;
  background-color: rgb(207, 226, 226);
}

.add {
  font-size: small;
  padding: 10px;
  place-items: center;
}

.container {
  padding-bottom: 10px;
}

.select-style {
  background-color: rgb(255, 250, 250);
  border-radius: 10px;
  border: 1px solid rgb(101, 101, 101);
  height: 40px;
  width: 80px;
  margin-right: 20px;
}

.product-input {
  width: 100px;
  height: 20px;
  padding: 10px;
  margin: 0px 10px 0px 10px;
}
.cost-input {
  width: 100px;
  height: 20px;
  padding: 10px;
  margin: 0px 0px 0px 0px;
}

.quantity-input {
  width: 100px;
  height: 20px;
  padding: 10px;
  margin-right: 10px;
}
</style>