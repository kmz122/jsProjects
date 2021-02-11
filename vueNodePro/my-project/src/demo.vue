<template>
    <div>
        <h1> Heading for the demo component </h1>
        <p v-for="student in students"> {{ student }} </p>
    </div>

</template>

<script>
export default {

  data () { 
    return {
      students:[
          "Mg Mg",
          "Ma Ma",
          "Ko Ko"
      ]
    }
  }
}
</script>

<style scoped>
h1{
    color:rebeccapurple;
}
</style>
