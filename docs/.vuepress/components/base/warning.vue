<template>
    <b class="base-warning">
        <slot></slot>
    </b>
</template>

<script>
export default {
    name: 'base-warning',
}
</script>

<style scoped>
.base-warning {
    color: #c00;
    font-size: 1.2em;
}
</style>
