<template>
    <div class="sett-article-window">
        <div class="inline-cl" @click="() => {this.$emit('closeWindow')}">
            <img src="@/assets/icons8-удалить.svg" alt="" srcset="">
        </div>
        <div class="inner">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
    
.sett-article-window {
    position: absolute;
    width: 150px;
    height: 200px;
    background-color: #0D1119;
    // border: 1px solid #0D2129;
    border-radius: 5px;
    padding: 10px;
    z-index: 2;
    .inline-cl {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px;
        img {
            margin-left: auto;
            width: 15px;
            height: 15px;

            &:hover {
                cursor: pointer;
                opacity: .7;
                transition: .3s;
            }
        }
    }

    .inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

</style>