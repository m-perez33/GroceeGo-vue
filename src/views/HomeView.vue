<template>
  <main id="home">
    
    <h2>{{this.$route.params.id}}</h2>
    <h1>Welcome to GROCEE-GO</h1>
    <p>Select a list to edit from the dropdown menu or create a new list!</p>
    <h2>{{this.$route.params.id}}</h2>

  </main>
</template>

<script>
export default {

}
</script>

<style>
#home{
    margin-top:100px;
}
</style>