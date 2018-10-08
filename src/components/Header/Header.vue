<template>
    <div class="toad-header container fnt-monospace">
        <h2 class="display-4">{{title}}</h2>
        <p>{{subtitle}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            title: String,
            subtitle: String,
        }
    }
</script>
<style>
    .toad-header{
        /*CSS_HERE*/
        /*COMING SOON*/
    }
</style>
