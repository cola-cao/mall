<template>
    <div class="check-button" :class="{check: value}">
        <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
	export default {
    name: "CheckButton",
    data(){
        return {
        }
    },
    props: {
        value: {
        type: Boolean,
        default: false
    }
    }
}
</script>

<style scoped>
    .check-button {
        border-radius: 50%;
        border: 1px solid #ff5f3e;
    }
    .check {
        border-radius: 50%;
        background-color: #ff5f3e;
    }
</style>