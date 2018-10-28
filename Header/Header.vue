<template>
    <div :class="headerContainerStyle" class="bg-default toad-header">
        <h2 :class='titleStyle' class="display-4">{{title}}</h2>
        <p :class='subTitleStyle'>{{subtitle}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            title: String,
            subtitle: String,
            headerContainerStyle: String,
            titleStyle: String,
            subTitleStyle: String

        }
    }
</script>
<style>
    .toad-header{
        width:100%
    }
</style>
