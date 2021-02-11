<template>
    <div>
        <p v-for="student in students" :key="student.id"> {{ student.name }} --> {{ student.experience }}</p>
    </div>
</template>

<script>
export default {

    props:['students'],

    data () { 
            return{
                
            } 
    }
  
}
</script>

<style>
</style>
