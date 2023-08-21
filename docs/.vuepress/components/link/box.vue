<template>
    <div class="link-box__wrapper" @click="go2Link">
        <div class="logo__wrapper">
            <img :src="$withBase(logo)" :alt="title" />
        </div>
        <div class="link-content">
            <p class="link-title">{{ title }}</p>
            <p class="link-desc">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'link-box',
    props: {
        title: String,
        description: String,
        logo: String,
        link: String,
        isExternal: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        go2Link() {
            if (this.isExternal) {
                window.open(this.link)
                return
            }
            this.$router.push(this.link)
        },
    },
}
</script>

<style scoped>
.link-box__wrapper:hover {
    transition: all 300ms ease-in;
    transform: scale(1.02);
    box-shadow: 10px 10px 20px #333;
}
.link-box__wrapper {
    display: flex;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 20px 0;
    cursor: pointer;
}
.logo__wrapper {
    width: 20%;
    box-sizing: border-box;
    padding: 20px;
}
.link-content {
    width: 80%;
    box-sizing: border-box;
    padding: 0 20px;
}
.link-content * {
    margin: 0 0 0.5em;
    padding: 0;
}
.link-title {
    color: #333;
    font-size: 28px;
}
.link-desc {
    color: #999;
    font-size: 16px;
}
</style>
