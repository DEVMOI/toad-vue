<template>
    <div class="container text-center">
        <h1>Toad Vue Testing</h1>
        <Header title="Hello" subtitle="world"/>
    </div>
</template>

<script>
import Header from '@/components/Header'
    export default {
        name: "App",
        components:{
            Header
        }
    }
</script>

<style scoped>

</style>
