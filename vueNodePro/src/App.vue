<template>
  <div>

    <h1> {{ newMsg }} </h1>

    <students></students>

    <heading></heading>

    <student v-bind:students="students"> </student>
  </div>
</template>

<script>

import heading from './components/heading.vue'
import student from './components/student.vue'

export default {

  components:{
    'heading': heading,
    'student': student 
  },

  name: 'app',

  data () { 
    return {
      newMsg: 'Hellow There!', 

      students:[
                 {id:1, name: 'Mg Mg', experience: '2'},
                 {id:2, name: 'Ma Ma', experience: '3'},
                 {id:3, name: 'Mya Mya', experience: '5'},
                 {id:4, name: 'Min Min', experience: '32'},
                 {id:5, name: 'Mo Mo', experience: '12'}
       ]
    }
  }
}
</script>

<style>
h1{
  color:green;
}
</style>
