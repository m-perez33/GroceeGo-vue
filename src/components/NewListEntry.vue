<template>
    <div class="container">
      
        <form  v-on:submit.prevent="saveEntry()">
            <h2 class="add" >ADD TO LIST: </h2>
            <p>{{ currentList }}</p>
            <input class="product-input info-entry" name="title-input" type="text" placeholder="Product" v-model="listEntry.productName" />
            $ <input class="cost-input info-entry" name="cost-input" type="text" placeholder="Cost" v-model="listEntry.cost" />
            <select class="select-style" v-on:change.prevent="perOption()" v-model="selectedOption">
                <option :value="null">Select</option>
                <option>Per lb</option>
                <option>Per item</option>
            </select>
            <input class="quantity-input info-entry" name="quantity-input" type="text" placeholder="Quantity" v-model="listEntry.quantity" />
            <button>Save</button>
        </form>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            listEntry: {},
            currentList: this.$store.currentList,
            selectedOption: null
            
        }
    },
    props: [ 'current' ],
    methods: {
        perOption() {
            if (this.selectedOption === "Per lb") {
                this.listEntry.category = "1";
            } else {
                this.listEntry.category = "2";
            }
        },
        saveEntry() {
            this.listEntry.listId = this.$store.state.currentList
            //entry id would come from dao coding this for now
            this.listEntry.listEntryId = this.$store.state.listEntries.length + 1 + "";
            console.log(this.listEntry)

            this.$store.commit('SAVE_LIST_ENTRY', this.listEntry);
            this.listEntry = {};
           //console.log(this.listEntry)
        },
       

    }
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
    padding-bottom: 20PX;
    background-color: rgb(207, 226, 226);
}

.add{
    font-size: small;
    padding: 10px;
    place-items: center;

}

.container{
    padding-bottom: 10px;
}

.select-style{

    background-color: rgb(255, 250, 250);
    border-radius: 10px;
    border: 1px solid rgb(101, 101, 101);
    height: 40px;
    width: 80px;
    margin-right: 20px;
}

.product-input{
    width: 100px;
    height: 20px;
    padding: 10px;
    margin: 0px 10px 0px 10px;
}
.cost-input{
    width: 100px;
    height: 20px;
    padding: 10px;
    margin: 0px 0px 0px 0px;
}

.quantity-input{
    width: 100px;
    height: 20px;
    padding: 10px;
    margin-right: 10px;
}


</style>