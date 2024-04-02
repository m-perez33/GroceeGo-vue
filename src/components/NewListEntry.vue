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
    };
  },
  props: ["current", "products"],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.products);
  },
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
      // console.log(this.$route.params.id)
      // await this.getAllProducts()
      this.listEntry.listId = this.$route.params.id;
      //this.listService.productName =

      console.log(this.products);
      console.log(this.listEntry);
      //go through products and check if it exists

      this.products.forEach((item) => {
        console.log(item.productId);
        if (item.productName === this.listEntry.productName) {
          //if exists assign that product id to new list entry,
          //dont create new product
          this.listEntry.productId = item.productId;
          console.log(this.item);
          //then make entry
          this.makeEntry();
          this.itExists = true;
        }
      });
      if (this.itExists === false) {
        console.log("made it this far");
        this.createProduct();
      }

      //await this.checkforProduct();

      // console.log(this.current)
      //this.listEntry.productId = "5"
    },
    async makeEntry() {
      console.log(this.lastProduct);

      //this.listEntry.productId = this.lastProduct.productId;
      console.log(this.listEntry);

      await listEntryService
        .create(this.listEntry)
        .then((response) => {
          if (response.status === 201) {
            console.log("created");
          } //console.log(this.lists);
        })
        .catch((error) => {
          console.log(error + " fail");
        });
      this.listEntry = {};
      this.getEntries(this.$route.params.id);
    },

    async createProduct() {
      //assign current list entry name to product
      this.product.listId = this.current;
      this.product.productName = this.listEntry.productName;

      // await this.getAllProducts(this.product);

      console.log(this.product);

      await productService
        .create(this.product)
        .then((response) => {
          if (response.status === 201) {
            console.log("created product");
            //if successful retrieve product for idmake it into an entry
            //change to get by id
          } //console.log(this.lists);
        })
        .catch((error) => {
          console.log(error + " fail");
        });

      // this.getAllProducts(this.product);
      await this.getAllProducts(this.product);

      console.log(this.retrievedProducts);

      // this.listEntry.productId = this.lastProduct.productId;
      console.log(this.listEntry.productId);
      // this.getAllProducts();
    },
    /* checkforProduct() {
      this.products.forEach((product) => {
        if (product.name === this.listEntryName) {
          this.listEntry.productId = product.productId;
        } else {
          this.createProduct();
        }
      });
    },*/
    async getAllProducts(prod) {
      console.log(this.listEntry.productName);

      await productService.list().then((response) => {
        this.retrievedProducts = response.data;
      });
      this.retrievedProducts.forEach((p) => {
        if (p.productName === prod.productName) {
          this.listEntry.productId = p.productId;
        }
      });
      console.log(this.listEntry);
      this.makeEntry();

      console.log(this.retrievedProducts);
    },
    getAllLists() {
      listService.list().then((response) => {
        this.lists = response.data;
        console.log(this.lists);
      });
    },
    async getEntries() {
      await listEntryService.get(this.$route.params.id).then((response) => {
        this.listEntries = response.data;
        this.listEntries.sort((a, b) => b.listEntryId - a.listEntryId);
   
       console.log(this.listEntries);
       console.log("success")
      });
      await this.$store.commit("UPDATE_LIST_ENTRIES", this.listEntries);
    },
    created() {
       this.$watch(
      () => this.listEntries.length,
      (newId, oldId) => {
        this.getEntries();
      })
      //this.getAllLists();
      //this.getAllProducts();
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