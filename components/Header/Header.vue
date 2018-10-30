<template>
    <div :class="headerContainerStyle" class="bg-default toad-header">
        <h2 :class='titleStyle' class="display-4">{{title}}</h2>
        <p :class='subTitleStyle'>{{subtitle}}</p>
    </div>
</template>

<script src='./Header.js'/>
<style src='./Header.css'/>
