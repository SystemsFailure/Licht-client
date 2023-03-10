<template>
    <div class="create-article">
        <div class="inline-title">
            Are you sure
        </div>
        <div class="inner">
            <div class="yes" @click="createArticle">
                confirm
            </div>
            <div class="no" @click="() => {this.$emit('closeFunction')}">
                no
            </div>
        </div>
    </div>
</template>
<script>

import {mapActions} from 'vuex'

export default {
    data() {
        return {
            
        }
    },

    props: {
        savedData_: {

        }
    },

    methods: {
        ...mapActions('articles', {
            addBlockInstance: 'addBlockInstance',
        }),

        createArticle() {
            this.addBlockInstance(this.savedData_)
        },
    },
}
</script>
<style lang="scss" scoped>
    
.create-article {
    position: absolute;
    width: 300px;
    height: 150px;
    background-color: rgba($color: #0D1117, $alpha: 1);
    border: 1px solid #222;
    z-index: 1;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 10;

    .inline-title {
        // padding: 10px;
        margin-top: 5px;
        color: white;
        display: flex;
        align-items: center;
        width: 100%;
        height: 3px;
        justify-content: center;
    }
    .inner {
        width: 100%;
        height: 50%;
        margin-top: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 13px;
        font-weight: 500;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-transform: uppercase;
        .yes {
            padding: 8px 10px 8px 10px;
            // background-color: #0f0e0e;
            border: 1px solid #222;

            border-radius: 7px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                cursor: pointer;
            }
        }

        .no {
            padding: 8px 10px 8px 10px;

            
            // background-color: #0f0e0e;
            border: 1px solid #222;
            
            border-radius: 7px;

            margin-left: 15px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                cursor: pointer;
            }
        }
    }
}

</style>