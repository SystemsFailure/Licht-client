<template>
    <div class="main-navbar">
        <div class="inner">

            <div class="wrapper-all-spans">
                <span id="Title-site">Licht</span>
                <div class="wrapper-span">
                    <span>profile</span>
                    <span>issue</span>
                    <span>codespaces</span>
                    <span>explore</span>
                </div>
            </div>

            <div class="navigation-pages-paner">
                <span v-for="it in listPrefixes_navbar" :key="it.id">
                    {{ it.id != listPrefixes_navbar[listPrefixes_navbar.length - 1].id ? it.string + ' ' + '/' : it.string + ' '}}
                </span>
            </div>

            <div class="tools-kit-navbar">
                <div class="notifications">
                    <img src="@/assets/icons8-почта-50.png" alt="">
                </div>

                <div class="toggle-tools">
                    <span>+</span>
                </div>

                <div class="my-avatar">
                    <img src="@/assets/buetyful.jpg" alt="">
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            
        }
    },

    computed: {
        ...mapState({
            listPrefixes_navbar: 'listPrefixes_navbar', 
        }),
    },

    methods: {

    }
}
</script>
<style lang="scss" scoped>

.main-navbar {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    z-index: 1;
    .inner {
        width: 100%;
        height: 100%;
        background-color: #161B22;
        display: flex;
        align-items: center;

        .tools-kit-navbar {
            margin-left: auto;
            width: auto;
            height: 100%;
            padding: 5px;
            display: flex;
            align-items: center;
            .notifications {
                margin-top: 4px;
                img {
                    width: 20px;
                    height: 20px;

                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                        transition: .3s;
                    }
                }
            }

            .toggle-tools {
                margin-left: 20px;
                margin-right: 20px;
                span {
                    font-size: 35px;
                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                        transition: .3s;
                    }
                }
            }

            .my-avatar {
                margin-top: 4px;
                margin-left: auto;
                margin-right: 10px;
                img {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    object-fit: cover;
                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                        transition: .3s;
                    }
                }
            }
        }

        .wrapper-all-spans {
            width: 400px;
            height: 100%;
            display: flex;
            align-items: center;

            #Title-site {
                color: #888;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                text-transform: lowercase;
                font-size: 18px;
                margin-left: 10px;
            }
    
            .wrapper-span {
                margin-left: 20px;   
                height: 100%;
                display: flex;
                align-items: center;         
                span {
                    text-transform: uppercase;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    color: white;
                    margin-left: 10px;
                    font-size: 12px;
                    &:hover {
                        cursor: pointer;
                        opacity: .8;
                        transition: .3s;
                    }
                }
            }
        }


        .navigation-pages-paner {
            width: auto;
            // background-color: rgb(95, 95, 95);
            height: 100%;
            display: flex;
            align-items: center;
            padding: 10px 10px 10px 10px;

            span {
                margin-left: 5px;
                &:hover {
                    cursor: pointer;
                }
            }
        }

    }
}

</style>