<template>
    <hintRegisterField 
        v-show="visiblehintRegisterField" 
        :field="field" id="hint-id" 
        :typefield="typefield"
        :objectName="objectName"    
        :objectEmail="objectEmail"
        :objectPassword="objectPassword"
    ></hintRegisterField>
    <div class="register-page-main">
        <div class="inner">


            <div class="window-class-register" v-if="window_regisration">

                <div class="inline-progress" id="progress-validation-and-filling"></div>

                <div class="inline-title">
                    <span>
                        Lets Get Started
                    </span>
                    <span class="bottom-title">
                        Perfect! Now let's set your name and password
                    </span>
                </div>

                <div class="inner-content-left">
                    <div class="wrapper-inptut">
                        <input type="text" placeholder="name" v-model="fieldName" @focus="visibleHint($event, 'name')" @focusout="() => {this.visiblehintRegisterField = false}">
                        
                    </div>
                    <div class="wrapper-inptut">
                        <input type="text" placeholder="email" v-model="fieldEmail" @focus="visibleHint($event, 'email')" @focusout="() => {this.visiblehintRegisterField = false}">
                        
                    </div>
                    <div class="wrapper-inptut">
                        <input type="password" placeholder="password" v-model="fieldPassword" @focus="visibleHint($event, 'password')" @focusout="() => {this.visiblehintRegisterField = false}">
                        
                    </div>

                    <div class="privacy-text">
                        <span>Every plugin that collects, uses, or stores user data, or passes it to an external source or third <span id="privacy-id">Privacy Policy</span></span>
                    </div>
                </div>

                <div class="bottom-inline">

                    <div class="text-link">
                        <span id="text-id">Already a member? <span id="wrap-text-id" @click="() => {this.window_regisration = false}">Log in</span></span>
                    </div>

                    <div class="btn-sign-up">
                        <span @click="register()">
                            sign up
                        </span>
                    </div>
                </div>

            </div>

            <div class="window-class-log-in" v-else>

                <div class="inner-content">

                    <div class="inline-title">
                        <span>
                            Lets Get Started
                        </span>
                        <span class="bottom-title">
                            Perfect! Now let's write your E-mail and password that verify
                        </span>
                    </div>

                    <div class="wrapper-inptut">
                        <input type="text" placeholder="email" v-model="vEmail">
                    </div>
                    <div class="wrapper-inptut">
                        <input type="password" placeholder="password" v-model="vPassword">
                    </div>

                </div>

                <div class="bottom-inline">
                    <div class="text-link">
                        <span id="text-id">Else don't have account? <span id="wrap-text-id" @click="() => {this.window_regisration = true}">Sign Up</span></span>
                    </div>

                    <div class="btn-sign-up">
                        <span @click="verify()">
                            verify
                        </span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
import hintRegisterField from '@/components/localWindows/hintRegisterField.vue'
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            window_regisration: true,
            visiblehintRegisterField: false,
            fieldName: '',
            filName: false,
            fieldEmail: '',
            filEmail: false,
            fieldPassword: '',
            filPassword: false,
            field: '',
            typefield: '',

            // model of configuration
            objectName: {},
            objectEmail: {},
            objectPassword: {},

            // DOM ELEMENTS
            progress: null,

            // Verify models
            vEmail: '',
            vPassword: '',

            // validation regEx
            regexEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            regexPassword: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/,

        }
    },

    mounted() {
        this.progress = document.querySelector('#progress-validation-and-filling')
        this.progress.style.width = '0%'

        this.objectName = {one: false, two: false, free: false}
        this.objectEmail = {one: false, two: false, free: false}
        this.objectPassword = {one: false, two: false, free: false}
    },

    watch: {
        fieldName: {
            handler(newValue) {
                this.validation_field('name', newValue);
            },
            deep: true,
        },
        fieldEmail: {
            handler(newValue) {
                this.validation_field('email', newValue);
            },
            deep: true, 
        },
        fieldPassword: {
            handler(newValue) {
                this.validation_field('password', newValue);
            },
            deep: true,
        },
    },

    computed: {
        ...mapState('verify', {
            resultVerify: 'resultVerify',
        }),
        ...mapState('articles', {
            authorId: 'authorId',
        }),
    },

    methods: {

        /////// store functions ///////
        
        ...mapActions('verify', {
            verify_: 'verify_'
        }),
        ...mapActions('regis', {
            createAccount: 'createAccount',
        }),

        /////// store functions ///////


        /////// Local functions ///////

        register() {
            if(
                this.filName
                && 
                this.filEmail 
                && 
                this.filPassword
                &&
                this.objectName.one
                &&
                this.objectName.two
                &&
                this.objectName.free
                &&
                this.objectEmail.one
                &&
                this.objectEmail.two
                &&
                this.objectPassword.one
                &&
                this.objectPassword.two
            ) {
                this.createAccount({
                    name: this.fieldName,
                    email: this.fieldEmail,
                    password: this.fieldPassword,
                })
                this.fieldName = ''
                this.fieldEmail = ''
                this.fieldPassword = ''
            } else {
                console.log('fields in not valid? please check writted data')
            }
        },

        async verify() {
            if(this.regexEmail.test(this.vEmail) && this.regexPassword.test(this.vPassword)) {
                console.log('fields is valid')
                await this.verify_({
                    email: this.vEmail,
                    password: this.vPassword,
                })
                if(this.authorId && this.resultVerify) {
                    console.log('set local-storage item by author-id')
                    localStorage.setItem('author-id', this.authorId)
                    this.$store.commit('setisAuth', true)
                    localStorage.setItem('isAuth', this.$store.state.isAuth)
                    this.vEmail = ''
                    this.vPassword = ''
                    this.$router.push('/')
                }
            } else {
                console.log('this.vEmail or this.vPassword no valid')
            }
        },

        /////// local functions ///////

        visibleHint(event, typefield) {
            this.typefield = typefield
            this.visiblehintRegisterField = true;
            let el = event.target;
            let hint_el = document.querySelector('#hint-id');
            let coords = el.getBoundingClientRect();
            // hint_el.style.left = coords.left + ( el.offsetWidth / 6 ) + "px";
            hint_el.style.left = coords.left + "px";
            hint_el.style.top = coords.bottom + "px";
        },

        positionCursor(e) {
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

        validation_field(type, value) {
            value = value.trim()
            if(type === 'name') {
                if(value === '' || !/^[a-zA-Z ]+$/.test(value)) {
                    this.filName = false
                    this.progress.style.width = (parseInt(this.progress.style.width,10)-33)+'%'
                    this.objectName.one = false
                    this.objectName.two = false
                    this.objectName.free = false
                }

                if(this.filName) return
                this.validation_name(value)
            }
            if(type === 'email') {
                if(value === '') {
                    this.objectEmail.two = false
                    this.filEmail = false
                    this.objectEmail.one = false
                    this.progress.style.width = (parseInt(this.progress.style.width,10)-33)+'%'
                }
                
                // if(this.regexEmail.test(value) === false) {
                //     this.progress.style.width = (parseInt(this.progress.style.width,10)-33)+'%'
                // }

                if(this.filEmail) return
                this.validation_email(value)
            }
            if(type === 'password') {
                if(!this.regexPassword.test(value))
                {
                    this.filPassword = false
                    this.objectPassword.two = false
                }
                if(value === '') {
                    this.filPassword = false
                    this.objectPassword.one = false
                    this.progress.style.width = (parseInt(this.progress.style.width,10)-33)+'%'
                }

                if(this.filPassword) return
                this.validation_password(value)
            }
        },
        validation_name(field) {
            if(field.length > 4) {
                this.objectName.one = true
            }
            if(field != '') {
                this.objectName.two = true
            }
            if(/^[a-zA-Z ]+$/.test(field)) {
                this.objectName.free = true
            }

            if( field.length > 4 && field != '' && field && /^[a-zA-Z ]+$/.test(field)) {
                this.field = field
                if(this.progress) {
                    this.progress.style.width = (parseInt(this.progress.style.width,10)+33)+'%'
                    this.filName = true
                }
            }
            
        },
        validation_email(field) {
            if(this.regexEmail.test(field))
            {
                this.objectEmail.one = true
            }
            if(field != '') {
                this.objectEmail.two = true
            }

            if( field.length > 4 && field != '' && field && this.regexEmail.test(field)) {
                this.field = field
                if(this.progress) {
                    this.progress.style.width = (parseInt(this.progress.style.width,10)+33)+'%'
                    this.filEmail = true
                }
            }
        },
        validation_password(field) {
            if(this.regexPassword.test(field))
            {
                this.objectPassword.two = true
            }
            if(field != '') {
                this.objectPassword.one = true
            }
            if( field.length > 4 && field != '' && field && this.regexPassword.test(field)) {
                this.field = field
                if(this.progress) {
                    this.progress.style.width = (parseInt(this.progress.style.width,10)+33)+'%'
                    this.filPassword = true
                }
            }
        },
    },

    components: {
        hintRegisterField
    },
}
</script>


<style lang="scss" scoped>
    
.register-page-main {
    width: 100%;
    height: 100vh;
    background-color: #0D1117;
    color: #fff;

    .inner {
        width: 100%;
        height: 100%;
        padding: 15px;
        position: relative;

        .window-class-log-in {
            position: absolute;
            background-color: rgba($color: #161B22, $alpha: .4);
            width: 50%;
            height: 50%;
            margin: 0;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
            padding: 10px;
            padding-top: 50px;
            border-radius: 10px;

            .inner-content {
                width: 100%;
                height: 100%;
                float: left;
                padding: 25px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .inline-title {
                    margin-top: 10px;
                    width: 100%;
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    top: 10px;
                    position: absolute;
                    flex-direction: column;

                    .bottom-title {
                        color: #888;
                    }
                }
                .wrapper-inptut {
                    display: flex;
                    width: 100%;
                    align-items: center;
                    justify-content: center;

                    input {
                        margin-top: 10px;
                        width: 50%;
                        height: auto;
                        background: rgba($color: #444444, $alpha: .3);
                        border-radius: 5px;
                        padding: 15px;
                        border: 1px solid #333;
                        color: #fff;
    
                        &:hover {
                            cursor: pointer;
                            border: 1px solid rgba($color: #49babe, $alpha: 1.0);
                        }
    
                        &:focus {
                            outline: 1px solid #49babe;
                        }
                    }
                }
            }

            .bottom-inline {
                position: absolute;
                width: 100%;
                height: 70px;
                border-top: 1px solid #222;
                bottom: 0;
                left: 0;

                display: flex;
                align-items: center;

                .text-link {
                    margin-left: 10px;

                    #text-id {
                        font-size: 15px;
                        #wrap-text-id {
                            color: rgba($color: #49babe, $alpha: 1.0);

                            &:hover {
                                cursor: pointer;
                                opacity: .7;
                            }
                        }
                    }
                }

                .btn-sign-up {
                    margin-left: auto;
                    margin-right: 20px;
                    padding: 8px 45px 8px 45px;
                    border: 1px solid #333;

                    &:hover {
                        cursor: pointer;
                        border: 1px solid rgba($color: #49babe, $alpha: 1.0);
                        
                    }

                    span {
                        color: #777;
                        text-transform: uppercase;
                        font-size: 12px;
                        
                    }
                }
            }
        }

        .window-class-register {
            position: absolute;
            background-color: rgba($color: #161B22, $alpha: .4);
            width: 50%;
            height: 50%;
            margin: 0;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
            padding: 10px;
            padding-top: 50px;
            border-radius: 10px;

            .bottom-inline {
                position: absolute;
                width: 100%;
                height: 70px;
                border-top: 1px solid #222;
                bottom: 0;
                left: 0;

                display: flex;
                align-items: center;

                .text-link {
                    margin-left: 10px;

                    #text-id {
                        font-size: 15px;
                        #wrap-text-id {
                            color: rgba($color: #49babe, $alpha: 1.0);

                            &:hover {
                                cursor: pointer;
                                opacity: .7;
                            }
                        }
                    }
                }

                .btn-sign-up {
                    margin-left: auto;
                    margin-right: 20px;
                    padding: 8px 45px 8px 45px;
                    border: 1px solid #333;

                    &:hover {
                        cursor: pointer;
                        border: 1px solid rgba($color: #49babe, $alpha: 1.0);
                        
                    }

                    span {
                        color: #777;
                        text-transform: uppercase;
                        font-size: 12px;
                        
                    }
                }
            }

            .inline-progress {
                top: 1px;
                position: absolute;
                width: 0%;
                height: 2px;
                background-color: #49babe;
                left:1px;
                // animation: scale33 .5s forwards;
                transition-property: width;
                transition-duration: .5s;
            }

            // @keyframes scale33 {
            //     0% {
            //         width: 0%;
            //     }
            //     100% {
            //         width: 33%;
            //     }
            // }

            .inline-title {
                margin-top: 10px;
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 10px;
                position: absolute;
                flex-direction: column;

                .bottom-title {
                    color: #888;
                }
            }

            .inner-content-left {
                width: 100%;
                height: 100%;
                float: left;
                padding: 25px;
                display: flex;
                flex-direction: column;
                align-items: center;
                // justify-content: center;

                .privacy-text {
                    font-size: 14px;
                    height:100px;
                    display: flex;
                    align-items: end;

                    #privacy-id {
                        color: rgba($color: #49babe, $alpha: 1.0);

                        &:hover {
                            cursor: pointer;
                            opacity: .7;
                        }
                    }
                }

                .wrapper-inptut {
                    display: flex;
                    width: 100%;
                    align-items: center;
                    justify-content: center;

                    input {
                        margin-top: 10px;
                        width: 50%;
                        height: auto;
                        background: rgba($color: #444444, $alpha: .3);
                        border-radius: 5px;
                        padding: 15px;
                        border: 1px solid #333;
                        color: #fff;
    
                        &:hover {
                            cursor: pointer;
                            border: 1px solid rgba($color: #49babe, $alpha: 1.0);
                        }
    
                        &:focus {
                            outline: 1px solid #49babe;
                        }
                    }
                }

            }

            .inner-content-right {
                width: 50%;
                height: 100%;
                float: left;
                // background-color: #333;

            }
        }
    }
}

</style>