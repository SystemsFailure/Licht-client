<template>
    <div class="main-profile-view">
        <div class="inner">

            <img id="profile-image" src="@/assets/buetyful.jpg">

            <div class="profile-data">

                <div class="block-up">
                    <span id="author-name">Eren Miller</span>
                    <span id="author-prof">Designer of nano-armor</span>
                </div>

                <div class="block-pre-middle">
                    <span id="author-bio">
                        Logic can take you from 
                        point A to point B, and imagination
                        can take you anywhere. Urwild
                    </span>
                </div>

                <div class="block-middle">
                    <div class="followers-block">
                        <span id="count-followers">1.5M</span> <span>followers</span>
                    </div>
                    
                    <div class="following-block">
                        <span id="count-followings">63</span> <span>followings</span>
                    </div>
                </div>

                <div class="block-end">
                    <span id="work-place">Nanotek .inc</span>
                    <span id="author-country">United Kingdoms, London</span>
                    <span id="twitter-link">https://Twitterlink.com</span>
                </div>

            </div>
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

.main-profile-view {
    width: 500px;
    height: 100%;
    float: left;
    background-color: #161B22;

    .inner {
        width: 100%;
        height: 100%;
        padding: 10px;
        display:flex;
        flex-direction: column;
        align-items: center;
        // padding-left: 60px;

        #profile-image {
            width: 280px;
            height: 280px;
            border-radius: 50%;
            object-fit: cover;
        }

        .profile-data {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 500px;

            .block-up {
                margin-top: 30px;
                width: 100%;
                height: auto;
                padding: 5px;
                display: flex;
                flex-direction: column;
                #author-name {
                    font-size: 20px;
                    color: white;
                }

                #author-prof {
                    font-size: 16px;
                    color: #777;
                }
            }

            .block-pre-middle {
                margin-top: 20px;
                width: 100%;
                height: auto;
                padding: 5px;
                display: flex;

                #author-bio {
                    width: 280px;
                    word-wrap:break-word;
                    font-size: 15px;
                    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
            }

            .block-middle {
                margin-top: 30px;
                width: 100%;
                height: auto;
                padding: 5px;
                display: flex;
                font-size: 15px;

                .followers-block {
                    color: #888;

                    #count-followers {
                        color: #00C0C0;
                    }

                    &:hover {
                        cursor: pointer;
                        opacity: .8;
                        transition: .3s;
                    }
                }

                .following-block {
                    margin-left: 20px;
                    color: #888;
                    #count-followings {
                        color: #00C0C0;

                    }

                    &:hover {
                        cursor: pointer;
                        opacity: .8;
                        transition: .3s;
                    }
                }
            }

            .block-end {
                margin-top: 30px;
                width: 100%;
                height: auto;
                padding: 5px;
                display: flex;
                flex-direction: column;

                span {
                    margin-top: 10px;
                    font-size: 16px;
                    
                }
            }
        }

    }
}

</style>