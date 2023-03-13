<template>
    <div class="change-inp-clss">
        <div class="inner" id="change-field-win">
            <img src="@/assets/icons8-удалить.svg" alt="" id="close-el" @click="() => {this.$emit('close')}">
            <input type="text" :placeholder="placeholder_text" v-model="newValue">

            <div class="bottom-box" @click="change">
                <div class="btn-confirm">
                    injection
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            newValue: '',
        }
    },

    props: {
        placeholder_text:  {},
        typefield: {}
    },

    mounted() {
        // let windowEdit = document.getElementById('change-field-win')
        // document.addEventListener('click', (e) => {
        //     const withinBoundaries = e.composedPath().includes(windowEdit);

        //     if ( ! withinBoundaries ) {
        //         this.$emit('close')
        //     }
        // })
    },

    methods: {
        ...mapActions({
            changeField: 'changeField',
        }),

        change() {
            let data = {
                authorId: localStorage.getItem('author-id'),
                field: this.typefield,
                newvalue: this.validationValue(this.newValue) ? this.newValue : false
            }
            switch (this.typefield) {
                
                case 'name':
                    document.getElementById('author-name').innerText = this.newValue
                    this.changeField(data)
                    this.newValue = ''

                    break;
                case 'speciality':
                    document.getElementById('author-prof').innerText = this.newValue
                    this.changeField(data)
                    this.newValue = ''

                    break;
                    case 'bio':
                    document.getElementById('author-bio').innerText = this.newValue
                    this.changeField(data)
                    this.newValue = ''

                    break;
                case 'company':
                    document.getElementById('work-place').innerText = this.newValue
                    this.changeField(data)
                    this.newValue = ''

                    break;
                case 'country':
                    document.getElementById('author-country').innerText = this.newValue
                    this.changeField(data)
                    this.newValue = ''
    
                    break;
                case 'twitterLink':
                    document.getElementById('twitter-link').innerText = this.newValue
                    this.changeField(data)
                    this.newValue = ''

                    break;

                default:
                    break;
            }
        },

        validationValue(newValue_) {
            if(newValue_ != '' && newValue_.length != 0) {
                newValue_ = newValue_.trim()
                return true
            } else {
                return
            }
        }
    }
}
</script>
<style lang="scss" scoped>

.change-inp-clss {
    width: auto;
    height: auto;
    min-width: 350px;
    // min-height: 100px;
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #161B22, $alpha: .8);
    z-index: 3;
    border-radius: 10px;

    .inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        position: relative;
        #close-el {
            position: absolute;
            right: 0;
            transform: translateX(30px);
            width: 15px;
            height: 15px;

            &:hover {
                cursor: pointer;
                opacity: .8;
            }
        }

        input {
            width: 70%;
            padding: 10px;
            color: #fff;
            font-size: 12px;
            background-color: rgba($color: #000000, $alpha: .1);
            border: 1px solid #333;
            border-radius: 5px;

            &:focus {
                outline: 1px solid turquoise;
            }
        }

        .bottom-box {
            margin-left: auto;
            width: 25%;
            padding: 8px;
            background-color: rgb(184, 0, 0);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            &:hover {
                cursor: pointer;
                opacity: .8;
                background-color: rgb(143, 0, 0);
                transition: .3s;
                
            }
            .btn-confirm {

            }
        }
    }
}
    
</style>