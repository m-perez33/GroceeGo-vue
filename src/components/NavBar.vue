<template>
    <nav class="nav-style">
        <div class="left">
            <select class="info-nav" :disabled= "$store.state.lists.length < 1" v-on:change.prevent="currentOption()" v-model="selectedOption">
                <option :value="null">Edit list</option>
                <option v-for="list in $store.state.lists" 
                v-bind:list="list" 
                v-bind:key="list.Id" 
               >{{ list.listId }}</option>

            </select>
            <button class="info-nav"> Create lists</button>
        </div>
        <h1 class=" right">GROCEE-GO</h1>
    </nav>
</template>
  
<script>
export default {
    data() {
        return {
            selectedOption: null
        };
    },
    methods: {
        currentOption() {

            this.$store.commit("CHANGE_CURRENT", this.selectedOption);
            console.log(this.selectedOption)
            console.log(this.$store.state.currentList)


        }

    }
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
    grid-template-areas:
        "left-nav . right-nav"
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
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
</style>