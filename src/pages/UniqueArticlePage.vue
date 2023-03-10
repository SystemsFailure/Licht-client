<template>
    <div class="unique-page">
        <div class="inner">
            <div class="content-center">
                <div class="block-content-bout-article">
                    <div class="inline-title">
                        <span>title article</span>
                    </div>
                    <div class="inline-desc">
                        <span>description article</span>
                    </div>
                </div>
                <div class="central-block"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            
        }
    },

    mounted() {
        let articleId = this.$route.params.id
        if(articleId) {
            this.getArticleByIdContent(articleId)
        }
    },

    methods: {
        ...mapActions('articles', {
            getArticleByIdContent: 'getArticleByIdContent',
        }),
    },
}
</script>
<style lang="scss" scoped>
    
.unique-page {
    width: 100%;
    height: auto;
    background-color: #0D1117;
    color: #fff;

    .inner{ 
        padding: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        .content-center {
            width: 60%;
            height: 100%;
            display: flex;
            overflow: auto;
            // justify-content: center;
            align-items: center;
            flex-direction: column;

            .central-block {
                width:  100%;
                height: 1000px;
                margin-top: 20px;
                background-color: #161B22;
            }

            .block-content-bout-article {
                width: 100%;
                height: 200px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                // justify-content: center;
                background-color: #161B22;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

                .inline-title {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 20px;
                    // justify-content: center;
                }

                .inline-desc {
                    margin-top: 15px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    color: #888;
                    // justify-content: center;
                }

            }
        }
    }
}

</style>