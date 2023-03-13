<template>
    <div class="main-articles">

        <settingsArticlesWindow 
            id="context-menu-id"
            v-show="visibleWindowOfSettingsArticle" 
            @closeWindow="() => {this.visibleWindowOfSettingsArticle = false}"
        ></settingsArticlesWindow>

        <div class="inner">
            <div class="inline-err" v-if="articlesList === []">
                <span>You don't have nobody an article, create new article. Start to creature</span>
            </div>
            <div class="inline">
                <div class="search-comp">
                    <input type="text" placeholder="search..." v-model="searchField">
                </div>
                <div class="btn-create-new-articles" @click="() => {this.$router.push('/editor')}">new</div>
            </div>
            <div class="list" id="general-list-of-articles">
                <div 
                    class="it-articles" 
                    v-for="it in filteredListOfArticles" 
                    :key="it.id" 
                    @click="viewOnItemId(it)"
                    @contextmenu="visibleContextMenu($event, it.id, it)"
                >
                    
                    <div class="line-1">
                        <span id="article-title">{{ it.title }}</span>
                        <span id="mode">{{ it.mode }}</span>
                    </div>

                    <div class="line-2">
                        <span id="count-forks">{{ it.arrayForks.length }}</span> <span id="forks-text">forks</span>
                    </div>

                    <div class="line-3">
                        <span>{{ it.description }}</span>
                    </div>

                    <div class="line-4">
                        <div class="wrapper-">
                            <span id="views-count">{{ it.arrayViews }}</span>
                            <span>views</span>
                        </div>

                        <div class="wrapper--">
                            <span id="likes-count">{{ it.arrayLikes }}</span>
                            <span>likes</span>
                        </div>
                    </div>
                </div>

                <div v-if="articlesList === []" class="load-more">load more</div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import settingsArticlesWindow from '@/components/localWindows/settingsArticlesWindow.vue'
export default {
    data() {
        return {
            visibleWindowOfSettingsArticle: false,
            articlesList: [],
            searchField: '',
        }
    },

    async mounted() {
        const arr = await this.getAuthorArticles(localStorage.getItem('author-id'))
        this.articlesList = arr
    },

    computed: {
        
        filteredListOfArticles() {
            return this.articlesList.filter(it => {
                return it.title.toLowerCase().indexOf(this.searchField.toLowerCase()) > -1
            })
        },

    },

    methods: {
        ...mapActions('articles', {
            getAuthorArticles: 'getAuthorArticles',
        }),

        viewOnItemId(it) {
            console.log(it.id)
            this.$router.push(`articles/article/${it.id}`)
        },

        visibleContextMenu(event, id, it) {
            console.log(id, it, 'console out by data from event of contextmenu')
            let contextmenu = document.getElementById('context-menu-id')

            this.visibleWindowOfSettingsArticle = true

            let {x, y} = this.positionCursor()

            let coordsTarget = contextmenu.getBoundingClientRect()
            let PerfomanceWidthScreen = window.innerWidth / 2

            if(x > PerfomanceWidthScreen)
            {
                console.log(PerfomanceWidthScreen, 'perfomance')
                if(y > 600)
                {
                    contextmenu.style.top = (y - coordsTarget.height) + 'px'
                    contextmenu.style.left = (x - coordsTarget.width) + 'px'
                } else {
                    contextmenu.style.top = y + 'px'
                    contextmenu.style.left = (x - coordsTarget.width) + 'px'
                    console.log('wh')
                }
            } else {
                if(y > 700)
                {
                    contextmenu.style.top = (y - coordsTarget.height) + 'px'
                    contextmenu.style.left = x + 'px'
                }else {
                    contextmenu.style.top = y + 'px'
                    contextmenu.style.left = x + 'px'
                }
            }

            event.preventDefault()
        },

        positionCursor(e){
            let x = 0
            let y = 0
            if (!e) {
                e = window.event;
            }
            if (e.pageX || e.pageY){
                x = e.pageX;
                y = e.pageY;
            } else if (e.clientX || e.clientY){
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return {x: x, y: y}
        },
    },

    components: {
        settingsArticlesWindow,
    }
}
</script>
<style lang="scss" scoped>
    
.main-articles {
    width: 100%;
    height: 100%;
    float: right;
    // position: relative;
    .inner {
        width: 100%;
        height: 100%;
        position: relative;

        .inline-err {
            position: absolute;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);

            span {
                // margin-left: 18%;
            }
        }


        .list {
            width: 100%;
            height: calc(100% - 60px);
            overflow: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .load-more {
                margin-top: 30px;
                width: 80%;
                height: 30px;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #161B22;
            }

            .it-articles {
                width: 80%;
                height: auto;
                padding: 10px;
                background-color: #161B22;
                border: 1px solid #161B22;
                margin-top: 10px;
                border-radius: 5px;
                &:hover {
                    border: 1px solid #333;
                    transition: .3s;
                }
                .line-1 {
                    display: flex;
                    align-items: center;
                    #article-title {
                        color: #00C0C0;
                    }

                    #mode {
                        margin-left: auto;
                        margin-right: 10px;
                        text-transform: uppercase;
                        font-size: 12px;
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    }
                }

                .line-2 {
                    margin-top: 7px;
                    display: flex;
                    align-items: center;
                    font-size: 15px;
                    color: #888;

                    #count-forks {

                    }

                    #forks-text {
                        margin-left: 5px;
                    }
                }

                .line-3 {
                    margin-top: 5px;
                    span {
                        color:#666;
                        font-size: 16px;
                    }
                }

                .line-4 {
                    margin-top: 10px;
                    width: 100%;
                    font-size: 14px;
                    display: flex;
                    .wrapper- {
                        span {
                            margin-left: 5px;
                        }
                    }

                    .wrapper-- {
                        margin-left: 10px;
                        span {
                            margin-left: 5px;

                        }
                    }
                }
            }
        }

        .inline {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            top: 0;
            padding: 5px;

            .search-comp {
                display: flex;
                align-items: center;
                margin-left: 20px;

                input {
                    outline: none;
                    border: none;
                    width: 300px;
                    height: 35px;
                    padding: 8px;
                    background: #161B22;
                    color: white;
                    border-radius: 5px;
                }

            }
            .btn-create-new-articles {
                margin-left: auto;
                margin-right: 20px;
                background-color: #00C0C0;
                padding: 5px 15px 5px 15px;
                color: white;
                border-radius: 5px;

                &:hover {
                    cursor: pointer;
                    opacity: .6;
                    transition: .3s;
                }
            }
        }
    }
}

</style>