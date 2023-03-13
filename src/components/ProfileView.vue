<template>
    <listFollowers v-if="visiblelistFollowers"></listFollowers>
    <ChangeField
        v-if="visibileEditFiled"
        :placeholder_text="placeholder_text"
        :typefield="typefield"
        @close="() => {this.visibileEditFiled = false}"
        ></ChangeField>
        <div class="main-profile-view">
            <div class="inner">
            <div v-if="loader" class="lds-ripple"><div></div><div></div></div>

            <div class="wrapper-img">
                <img id="profile-image" src="">
                <div class="block">
                    <label for="select_profile_img">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#dfdfdf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2 3)"><path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z"/><circle cx="10" cy="10" r="4"/></g></svg>
                    </label>
                    <input id="select_profile_img" name="select_profile_img" type="file" style="display: none" @change="changeImage($event)">
                    <span>change image</span>
                </div>
            </div>

            <div class="profile-data">

                <div class="block-up">
                    <div class="wrapper-name">
                        <span id="author-name"> 
                        </span>
                        <svg @click="editInfo('name')" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c1c1c1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                    </div>
                    <div class="wrapper-speciality">
                        <span id="author-prof">
                        </span>
                        <svg @click="editInfo('speciality')" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c1c1c1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                    </div>
                </div>

                <div class="block-pre-middle">
                    <span id="author-bio"></span>
                    <svg @click="editInfo('bio')" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c1c1c1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                </div>

                <div class="block-middle">
                    <div class="followers-block">
                        <span id="count-followers"></span> <span>followers</span>
                    </div>
                    
                    <div class="following-block">
                        <span id="count-followings"></span> <span>followings</span>
                    </div>
                </div>

                <div class="block-end">
                    <div class="wrapper-company">
                        <span id="work-place"></span>
                        <svg @click="editInfo('company')" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c1c1c1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                    </div>
                    <div class="wrapper-country">
                        <span id="author-country"></span>
                        <svg @click="editInfo('country')" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c1c1c1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                    </div>
                    <div class="wrapper-twit-link">
                        <span id="twitter-link"></span>
                        <svg @click="editInfo('twitterLink')" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c1c1c1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import listFollowers from '@/components/localWindows/listFollowers.vue'
import ChangeField from '@/components/localWindows/dialogs/ChangeField.vue'
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            visiblelistFollowers: false,
            visibileEditFiled: false,
            loader: true,
            placeholder_text: 'new name',
            typefield: '',
        }
    },

    created() {

    },
    
    mounted() {
        this.setAuthorData()
    },

    methods: {

        ...mapActions('regis', {
            getAuthor: 'getAuthor',
        }),

        ...mapActions({
            uploadImage: 'uploadImage',
        }),

        async setAuthorData() {
            const data = await this.getAuthor(localStorage.getItem('author-id'))
            document.getElementById('profile-image').src = data.img
            document.getElementById('author-name').innerText = data.name || 'name not specified'
            document.getElementById('author-prof').innerText = data.speciality || 'speciality not specified'
            document.getElementById('author-bio').innerText = data.bio || 'biography not specified'
            document.getElementById('work-place').innerText = data.company || 'name of company not specified'
            document.getElementById('author-country').innerText = data.country || 'country not specified'
            document.getElementById('twitter-link').innerText = data.twitterLink || 'twitter link not specified / https://Twitterlink.com'
            document.getElementById('count-followers').innerText = data.arrayFollowers.length
            document.getElementById('count-followings').innerText = data.arrayFollowings.length
            this.loader = false
        },

        async changeImage(event) {
            let file = event.target.files[0] || false
            if(file) {
                console.log(file, 'is true')
                let url = await this.uploadImage({file: file, authorId: localStorage.getItem('author-id')})
                document.getElementById('profile-image').src = url
            }
        },


        editName() {
            console.log('%c Oh my heavens! ', 'background: #222; color: #00C0C0')
        },

        editInfo(typecontent) {

            switch (typecontent) {
                case 'name':
                    console.log('%c name field', 'background: #222; color: #00C0C0')
                    this.placeholder_text = 'new name'
                    this.visibileEditFiled = true
                    this.typefield = typecontent

                    break;
                case 'speciality':
                    console.log('%c prof field', 'background: #222; color: #00C0C0')
                    this.placeholder_text = 'new prof'
                    this.visibileEditFiled = true
                    this.typefield = typecontent

                    break;
                case 'bio':
                    console.log('%c biography field', 'background: #222; color: #00C0C0')
                    this.placeholder_text = 'new biography'
                    this.visibileEditFiled = true
                    this.typefield = typecontent

                    break;
                case 'company':
                    console.log('%c place work field', 'background: #222; color: #00C0C0')
                    this.placeholder_text = 'new place work'
                    this.visibileEditFiled = true
                    this.typefield = typecontent

                    break;
                case 'country':
                    console.log('%c country field', 'background: #222; color: #00C0C0')
                    this.placeholder_text = 'new country'
                    this.visibileEditFiled = true
                    this.typefield = typecontent

                    break;
                case 'twitterLink':
                    console.log('%c twitter link', 'background: #222; color: #00C0C0')
                    this.placeholder_text = 'new twitter link'
                    this.visibileEditFiled = true
                    this.typefield = typecontent

                    break;

                default:
                    break;
            }
        },
        
    },


    components: {
        listFollowers,
        ChangeField,
    }
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
        position: relative;
        // padding-left: 60px;

        .wrapper-img {
            position: relative;
            // background-color: teal;
            border-radius: 50%;
            width: 280px;
            height: 280px;
            display: flex;
            align-items: center;
            justify-content: center;
            .block {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: rgba($color: #000000, $alpha: .5);
                opacity: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;


                label {
                    svg {
                        cursor: pointer;
                    }
                }

                span {
                    margin-top: 10px;
                    text-transform: uppercase;
                    font-size: 14px;
                }
            }
            &:hover .block {
                opacity: 1;
                transition: .3s;
            }
            #profile-image {
                width: 280px;
                height: 280px;
                border-radius: 50%;
                object-fit: cover;

            }
        }


        .profile-data {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 500px;
            cursor: default;

            .block-up {
                margin-top: 30px;
                width: 100%;
                height: auto;
                padding: 5px;
                display: flex;
                flex-direction: column;

                .wrapper-name {
                    &:hover svg {
                        opacity: 1;
                        transition: .3s;
                    }
    
                    svg {
                        opacity: 0;
                        cursor: pointer;
                    }
                    #author-name {
                        font-size: 20px;
                        color: white;
                        min-width: 100px;
                        min-height: 20px;
                            
                    }

                }
                .wrapper-speciality {

                    &:hover svg {
                        opacity: 1;
                        transition: .3s;
                    }

                    svg {
                        margin-left: 3px;
                        opacity: 0;
                        cursor: pointer;
                    }
                    #author-prof {
                        font-size: 16px;
                        color: #777;
                        min-width: 100px;
                        min-height: 20px;
                    }
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
                    min-width: 100px;
                    min-height: 20px;
                }

                &:hover svg {
                    opacity: 1;
                    transition: .3s;
                }

                svg {
                    margin-left: 3px;
                    opacity: 0;
                    cursor: pointer;
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

                .wrapper-company {
                    span {
                        margin-top: 10px;
                        font-size: 16px;
                        
                        min-width: 100px;
                        min-height: 20px;
                    }

                    &:hover svg {
                        opacity: 1;
                        transition: .3s;
                    }

                    svg {
                        margin-left: 3px;
                        opacity: 0;
                        cursor: pointer;
                    }
                }

                .wrapper-country {
                    span {
                        margin-top: 10px;
                        font-size: 16px;
                        
                        min-width: 100px;
                        min-height: 20px;

                    }
                    &:hover svg {
                        opacity: 1;
                        transition: .3s;
                    }

                    svg {
                        margin-left: 3px;
                        opacity: 0;
                        cursor: pointer;
                    }
                }

                .wrapper-twit-link {
                    span {
                        margin-top: 10px;
                        font-size: 16px;
                        
                        min-width: 100px;
                        min-height: 20px;

                    }
                    &:hover svg {
                        opacity: 1;
                        transition: .3s;
                    }

                    svg {
                        margin-left: 3px;
                        opacity: 0;
                        cursor: pointer;
                    }
                }

            }

        }

    }
}

.lds-ripple {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 80px;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}
.lds-ripple div {
  position: absolute;
  border: 4px solid rgb(185, 242, 240);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

</style>