<template>
    <div class="unique-page">
        <div class="inner">
            <div class="content-center">
                <div class="block-content-bout-article">

                    <div class="inline-name-author">
                        <span id="author-name-ar-id"></span>
                        <span id="article-id-"></span>
                    </div>
                    <div class="inline-title">
                        <span id="title-article-by-id"></span>
                        <span id="atCreated-id"></span>
                    </div>
                    <div class="inline-desc">
                        <span id="desc-article-by-id"></span>
                    </div>
                    <div class="bottom-box-content">
                        <span class="views-class">
                            <span id="count-views"></span>
                        </span>
                        <div class="forks-class">
                            <span id="count-forks-id"></span>
                        </div>
                        <div class="likes-class">
                            <span id="count-likes-id"></span>
                        </div>
                    </div>
                </div>
                <div class="central-block">

                    <div class="list-blocks" @scroll="scrollList">

                        <div class="wrapper-object" v-for="it in blocks" :key="it.id">

                            <div class="object-header" v-if="it.type === 'header'">
                                <h1 v-if="it.data.level === 1" v-html="it.data?.text"></h1>
                                <h2 v-if="it.data.level === 2" v-html="it.data?.text"></h2>
                                <h3 v-if="it.data.level === 3" v-html="it.data?.text"></h3>
                                <h4 v-if="it.data.level === 4" v-html="it.data?.text"></h4>
                                <h5 v-if="it.data.level === 5" v-html="it.data?.text"></h5>
                                <h6 v-if="it.data.level === 6" v-html="it.data?.text"></h6>
                            </div>

                            <div class="object-paragraph" v-if="it.type === 'paragraph'">
                                <h1 v-if="it.data.level === 1" v-html="it.data?.text"></h1>
                                <h2 v-if="it.data.level === 2" v-html="it.data?.text"></h2>
                                <h3 v-if="it.data.level === 3" v-html="it.data?.text"></h3>
                                <h4 v-if="it.data.level === 4" v-html="it.data?.text"></h4>
                                <h5 v-if="it.data.level === 5" v-html="it.data?.text"></h5>
                                <h6 v-if="it.data.level === 6" v-html="it.data?.text"></h6>
                                <span v-if="!it.data.level" v-html="it.data?.text"></span>
                            </div>
                            
                            <div class="object-image" v-if="it.type === 'image'">
                                <img :src="it.data?.url">
                                <div class="wrapper-caption-box">
                                    <span v-if="it.data.caption && it.data.caption != '' " v-html="it.data.caption" class="caption_by_image"></span>
                                </div>
                            </div>

                            <div class="object-code" v-if="it.type === 'code'">
                                <pre v-highlightjs="it.data.code" class="per-code-cl_">
                                    <code class="javascript code-cl"></code>
                                </pre>
                            </div>

                        </div>

                        
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
    data() {
        return {
            blocks: 
            [
                {
                    "authorId": "tGWMC8SK2lOf0mdOl9bs",
                    "data": {
                        "level": 1,
                        "text": "Station number one? Why did you done?"
                    },
                    "id": "OMyGxpjxGs",
                    "type": "header",
                    "subId": "OMyGxpjxGs-ybefnI-6um"
                },
                {
                    "authorId": "tGWMC8SK2lOf0mdOl9bs",
                    "data": {
                        "text": "Сегодня мы рассмотрим работу с&nbsp;<b>Retrofit</b>&nbsp;2. Правды ради стоит отметить, что мы будем работать еще с 2 отдельными библиотеками, а именно&nbsp;<b>Picasso</b>&nbsp;и&nbsp;<b>Spots-dialog</b>."
                    },
                    "id": "ybefnI-6um",
                    "type": "paragraph",
                    "subId": "OMyGxpjxGs-ybefnI-6um"
                },
                {
                    "authorId": "tGWMC8SK2lOf0mdOl9bs",
                    "data": {
                        "text": "Hello? how are you<br>what <b>mean</b> it now? <i>What</i> you don't <b>gonna</b> die"
                    },
                    "id": "P9-LqkXVlq",
                    "type": "paragraph",
                    "subId": "P9-LqkXVlq"
                },
                {
                    "authorId": "tGWMC8SK2lOf0mdOl9bs",
                    "data": {
                        "level": 4,
                        "text": "0. Создание проекта"
                    },
                    "id": "W_o2uFV_e0",
                    "type": "header",
                    "subId": "OMyGxpjxGs-ybefnI-6um"
                },
                {
                    "authorId": "tGWMC8SK2lOf0mdOl9bs",
                    "data": {
                        "text": "Здесь все максимально просто, создаем новый проект в Android Studio, выбираем Empty Activity. Далее необходимо выбрать язык программирования, у нас это будет Kotlin."
                    },
                    "id": "ZERpKe0mwx",
                    "type": "paragraph",
                    "subId": "OMyGxpjxGs-ybefnI-6um"
                },
                {
                    "authorId": "tGWMC8SK2lOf0mdOl9bs",
                    "data": {
                        "url": "https://firebasestorage.googleapis.com/v0/b/test-licht-5299e.appspot.com/o/images%2FtGWMC8SK2lOf0mdOl9bs%2F06-2-kopiya_4Wko-3.jpeg?alt=media&token=085ebe86-f439-4395-af9e-645f6cf0a50d",
                        "caption": "Welcome my friends this is jut caption of image? only a caption"
                    },
                    "id": "rDzVXxPZmp",
                    "type": "image",
                    "subId": "OMyGxpjxGs-ybefnI-6um"
                },
                {
                    "authorId": "tGWMC8SK2lOf0mdOl9bs",
                    "data": {
                        "code": "if(true) \n{\n  console.log('this is code...');\n}"
                    },
                    "id": "M9EKleu6SP",
                    "type": "code",
                    "subId": "OMyGxpjxGs-ybefnI-6um"
                }
            ],
            
        }
    },

    computed: {
        ...mapState('articles', {
            DataGettedArticleInstance: 'DataGettedArticleInstance',
        }),
    },

    async mounted() {
        if(localStorage.getItem('author-id')) 
        {
            this.setauthorId(localStorage.getItem('author-id'))
        }
        this.blocks = []
        let articleId = this.$route.params.id
        if(articleId) {
            let list = await this.getArticleByIdContent(articleId)
            this.blocks = list
            console.log(list)
            this.setDataArticleToDocument()
        }
    },


    methods: {
        ...mapActions('articles', {
            getArticleByIdContent: 'getArticleByIdContent',
        }),

        ...mapMutations('articles', {
            setauthorId: 'setauthorId',
        }),

        setDataArticleToDocument() {
            if(this.DataGettedArticleInstance != {})
            {
                
                document.getElementById('title-article-by-id').innerText = this.DataGettedArticleInstance.title || 'default'
                document.getElementById('desc-article-by-id').innerText = this.DataGettedArticleInstance.description || 'default'
                document.getElementById('count-views').innerText = `views ${this.DataGettedArticleInstance.arrayViews}` || '0'
                document.getElementById('author-name-ar-id').innerText = `${this.DataGettedArticleInstance.authorName}` || 'def'
                // document.getElementById('count-forks-id').innerText = `forks ${this.DataGettedArticleInstance.arrayForks.length}` || 'def'
                document.getElementById('count-forks-id').innerText = 'def'
                document.getElementById('count-likes-id').innerText = `likes ${this.DataGettedArticleInstance.arrayLikes}` || 'def'
                document.getElementById('article-id-').innerText = `UID - ${this.DataGettedArticleInstance.id}` || 'def'

            
            }
        },

        scrollList() {
            console.log('scrolling')
        },
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

                .list-blocks {
                    width: 100%;
                    height: 100%;
                    overflow: auto;

                    .wrapper-object {
                        width: 100%;
                        height: auto;

                        .object-code {
                            width: 100%;
                            height: auto;
                            padding: 10px;

                            .per-code-cl_ {
                                display: flex;
                                align-items: center;
                                width: 100%;
                                .code-cl {
                                    background-color: #0D1117;
                                    padding: 15px;
                                    border-radius: 8px;
                                }
                            }
                        }

                        .object-image {
                            width: 100%;
                            height: auto;
                            padding: 10px;
                            color: #fff;

                            img {
                                width: 100%;
                                height: 600px;
                                object-fit: cover;
                                border-radius: 20px;
                            }

                            .wrapper-caption-box {
                                border: 1px solid #333;
                                border-radius: 20px;
                                padding: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                
                                .caption_by_image {
                                    color: #888;
                                    font-size: 16px;
                                    font-family: 'Times New Roman', Times, serif;
                                }
                            }

                        }

                        .object-header {
                            width: 100%;
                            height: auto;
                            padding: 10px;
                            color: #fff;
                        }

                        .object-paragraph {
                            width: 100%;
                            height: auto;
                            padding: 10px;
                            color: #fff;
                        }

                    }
                    

                }
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

                .inline-name-author{ 
                    width: 100%;
                    padding: 0px;
                    display: flex;
                    align-items: center;
                    #article-id- {
                        margin-left: auto;
                        color: #999;
                        &:hover {
                            cursor: pointer;
                            opacity: .5;
                        }
                    }
                }

                .bottom-box-content {
                    width: 100%;
                    height: auto;
                    display: flex;
                    align-items: center;
                    margin-top: auto;

                    .likes-class {
                        display: flex;
                        // width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;

                        #count-likes-id {
                            color: #777;
                            font-size: 14px;
                            margin-left: 20px;
                        }
                    }

                    .forks-class {
                        display: flex;
                        // width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        #count-forks-id {
                            color: #777;
                            font-size: 14px;
                            margin-left: 20px;
                        }
                    }

                    .views-class {
                        // width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;

                        #count-views {
                            color: #777;
                            font-size: 14px;
                        }
                    }
                }

                .inline-title {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 20px;
                    // justify-content: center;
                    margin-top: 5px;
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