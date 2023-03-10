<template>
    <div class="main-articles">
        <div class="inner">
            <div class="inline">
                <div class="search-comp">
                    <input type="text" placeholder="search...">
                </div>
                <div class="btn-create-new-articles" @click="() => {this.$router.push('/editor')}">new</div>
            </div>
            <div class="list">
                <div class="it-articles" v-for="it in articlesList" :key="it.id">
                    <div class="line-1">
                        <span id="article-title">{{ it.title }}</span>
                        <span id="mode">{{ it.mode }}</span>
                    </div>
                    <div class="line-2">
                        <span id="count-forks">{{ it.countForks }}</span> <span id="forks-text">forks</span>
                    </div>
                    <div class="line-3">
                        <span>{{ it.desc }}</span>
                    </div>
                    <div class="line-4">
                        <div class="wrapper-">
                            <span id="views-count">{{ it.countViews }}</span>
                            <span>views</span>
                        </div>

                        <div class="wrapper--">
                            <span id="likes-count">{{ it.countLikes }}</span>
                            <span>likes</span>
                        </div>
                    </div>
                </div>

                <div class="load-more">load more</div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            articlesList: [
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'test-client', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Nano-neiron', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Code-box', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
                {id: 0, mode: 'public', desc: 'my custom article science group work hidden blur more of tm', title: 'Ghost', countViews: '13.4M', countForks: '153K', countLikes: '524M'},
            ]
        }
    },
}
</script>
<style lang="scss" scoped>
    
.main-articles {
    width: 100%;
    height: 100%;
    float: right;

    .inner {
        width: 100%;
        height: 100%;


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