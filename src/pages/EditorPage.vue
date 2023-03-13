<template>
    <CreateArticleQ v-if="visibleQuestionWindow" @closeFunction="() => {this.visibleQuestionWindow = false}" :savedData_="savedData_"></CreateArticleQ>
    <div class="main-editor">
        <div class="left-bloc">
            <div class="inline-title-block">
                <span>Articles configurations</span>
            </div>
            <div class="wrapper-box-for-inp-author-name-id">
                <input type="text" placeholder="author name, min 4 symbols" id="inp-name-author-id" v-model="authornameField">
                <div class="wrapper-box-for-check-box-id">
                    <span>default name</span>
                    <input type="checkbox" name="" id="inp-check-box-id" v-model="checkboxValue">
                </div>
            </div>
            <input type="text" placeholder="name article, min 10 symbols" id="inp-name-art-id" v-model="nameField">
            <textarea name="" id="textarea-desc-art-id" cols="30" rows="10" placeholder="description article, min 10 symbols" v-model="descriptionField"></textarea>
            
            <button id="save-button">create</button>
            <!-- <span>{{ this.author.name }}</span> -->
        </div>


        <div class="inner">
            <div id="editorjs">

            </div>

            <!-- <div class="wraooer">
                <pre v-highlightjs="codespace" class="per-code-cl">
                    <code class="javascript code-cl" id="code-id"></code>
                </pre>
            </div> -->
            <!-- <div class="wrapper-container-for-output">
                <pre id="output"></pre>
            </div> -->
        </div>

    </div>
</template>
<script>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import link from '@editorjs/link';
import code from '@editorjs/code'
import {ImageTool} from '@/EditorTools/ImagesTools';
import Paragraph from '@editorjs/paragraph'
import { mapActions, mapState, mapMutations } from 'vuex';

import CreateArticleQ from '@/components/localWindows/CreateArticleQ.vue'

export default {
    async mounted() {

        if(localStorage.getItem('author-id')) 
        {
            this.setauthorId(localStorage.getItem('author-id'))
        }

        if(this.checkboxValue === true) {
            this.authornameField = this.author.name
        }
        if(localStorage.getItem('author-id')) {
            
            this.author = await this.getAuthor(localStorage.getItem('author-id'))
            console.log('%c author id is exits', 'color: teal;')

        } else {
            console.log('%c author id is null or undefined', 'color: red;')
        }

        window.onunload = () => {
            this.toDeleteAllChachedImages()
        };
        window.addEventListener('hashchange', (e) => {
            console.log('hashChenged', e.oldURL, e.newURL)
        }, false);
        this.$nextTick(() => {
            let listHtmlDocs = document.querySelectorAll('.ce-code__textarea cdx-input')
            for (const el of listHtmlDocs) {
                el.style.background = '#333'
            }
            console.log('trigger')
        })
        const editor = new EditorJS({
            holder: 'editorjs',

            tools: {
                image: ImageTool,
                paragraph: {
                    class: Paragraph,
                    defaultLevel: 1,
                },
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    
                    config: {
                        placeholder: 'Enter a header',
                        defaultLevel: 1
                    }
                },
                link: {
                    class: link,
                    
                },
                code: {
                    class: code,
                },

            },

            autofocus: true,
            placeholder: 'Let`s write an awesome story',
            defaultBlock: '',

        });

        const saveButton = document.getElementById('save-button');
        // const output = document.getElementById('output');

        saveButton.addEventListener('click', () => {

            if(!this.validationFields()) {
                console.log('validation is null');
                return;
            }
            editor.save().then( savedData => {
                this.setdataFields({
                    authornameField: this.checkboxValue && this.author != {} ? this.author.name : this.authornameField,
                    articleTitleField: this.nameField,
                    descriptionField: this.descriptionField,
                })

                // output.innerHTML = JSON.stringify(savedData, null, 4);
                this.savedData_ = savedData
                this.visibleQuestionWindow = true
            })
        })

        editor.isReady.then(() => {
            let doc = document.getElementsByClassName('ce-popover')[0]
            let docInlinetoolbar = document.querySelector('.ce-inline-toolbar')
            let docToolBox = document.querySelector('.ce-toolbar__plus')
            docInlinetoolbar.style.color = '#111'
            docToolBox.style.color = '#555'
            doc.parentElement.style.color = '#111'
        })
    },

    computed: {
        ...mapState('articles', {
            result: 'result',
            cacheFullPathsList: 'cacheFullPathsList',
        }),
    },

    watch: {
        checkboxValue: {
            handler(value) {
                if(value === true) this.authornameField = this.author.name
                else this.authornameField = ''
            },
            deep: true,
        }
    },

    data() {
        return {
            listItems: [
                {id: 0, content: 'Type data'}
            ],
            codespace: '',
            visibleQuestionWindow: false,
            savedData_: [],

            author: {},

            nameField: '',
            descriptionField: '',
            authornameField: '',
            checkboxValue: false,
        }
    },
    components: {
        CreateArticleQ
    },

    methods: {
        ...mapActions('articles', {
            deleteImagesThroughCache: 'deleteImagesThroughCache',
        }),

        ...mapMutations('articles', {
            setdataFields: 'setdataFields',
            setauthorId: 'setauthorId',
        }),

        ...mapActions('regis', {
            getAuthor: 'getAuthor',
        }),

        validationFields() {
            if(this.nameField && this.nameField != '' && this.nameField.length > 4) {
                if(this.descriptionField && this.descriptionField != '' && this.descriptionField.length > 10) {
                    if(this.authornameField && this.authornameField != '' && this.authornameField.length > 10) {
                        console.log('success')
                        return true
                    } else {
                        console.log('no success')
                        return false
                    }
                }
            }
        },

        toDeleteAllChachedImages() {
            if(this.result === 0 || this.result === null) {
                if(this.cacheFullPathsList && this.cacheFullPathsList != [] && this.cacheFullPathsList.length != 0)
                {
                    this.deleteImagesThroughCache(this.cacheFullPathsList)
                }
            }
            if (this.result === 1) {
                console.log('no deleted images')
                return
            }
        },
    },

    unmounted() {
        console.log('destroed')
        this.toDeleteAllChachedImages()
    },
}
</script>
<style scoped>
    
.main-editor {
    width: 100%;
    height: 100vh;
    background-color: #0D1117;
    /* color: black; */
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
}
.left-bloc {
    width: 400px;
    height: auto;
    padding: 10px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
}

.left-bloc .wrapper-box-for-inp-author-name-id {
    width: 100%;
    height: auto;
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    flex-direction: column;
}

.left-bloc .wrapper-box-for-inp-author-name-id .wrapper-box-for-check-box-id {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    padding-left: 5px;
}

.left-bloc .wrapper-box-for-inp-author-name-id #inp-name-author-id {
    width: 100%;
    height: 40px;
    padding: 5px;
    padding-left: 15px;
    background: none;
    border: 1px solid #222;
    outline: none;
    color: white;
    margin-top: 15px;
}

.left-bloc .wrapper-box-for-inp-author-name-id #inp-check-box-id {
    outline: none;
    padding: 3px;
    border: none;
    background: none;
    margin-left: 10px;
}

.left-bloc .inline-title-block {
    width: 100%;
    display: flex;
    justify-content: center;
    justify-content: center;

}

.left-bloc .inline-title-block span {
    font-size: 14px;
    font-family:'Courier New', Courier, monospace;
    text-transform: uppercase;
    font-weight: 400;
    color: #888;
}

.left-bloc #inp-name-art-id {
    width: 100%;
    height: 40px;
    padding: 5px;
    padding-left: 15px;
    background: none;
    border: 1px solid #222;
    outline: none;
    color: white;
    margin-top: 15px;
}

.left-bloc #textarea-desc-art-id {
    width: 100%;
    height: 40px;
    padding: 5px;
    padding-left: 15px;
    padding-top: 15px;
    background: none;
    border: 1px solid #222;
    outline: none;
    color: white;
    margin-top: 15px;
    max-width: 100%;
    min-width: 100%;
    max-height: 200px;
    min-height: 200px;
}

#editorjs {
    width: 100%;
    height: 100%;
}

.inner {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: auto;
}

#output {
    position: absolute;
    left:50px;
    top:50px;
}

#code-id {
    padding: 10px;
}

#save-button {
    padding: 8px;
    background-color: #2b2734;
    color: white;
    border: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    width: 100%;
    margin-top: 15px;
}

#save-button:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: .3s;
}

.wraooer {
    border: 1px solid #333;
    background-color: #2b2734;
    border-radius: 8px;
}

.wrapper-container-for-output {
    width: 350px;
    height: auto;
}

.per-code-cl {
    background-color: #2b2734;
}

.code-cl {
    background-color: #2b2734 !important;
    padding: 0;
    display: block;
    float: left;
    left: 0;
}

#editorjs {
    width: 100%;
}

.codex-editor__redactor {
    width: 80%;
}

.cdx-block {
    width: 100%;
}

.inner #editorjs .simple-image {
    padding: 20px 0;
}

.inner #editorjs .simple-image img {
    max-width: 300px;
    height: 30vh;
    margin-bottom: 15px;
}

.inner #editorjs .simple-image input {
    width: 100%;
    padding: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    outline: none;
    font-size: 14px;
}

.ce-code__textarea {
    min-height: 200px;
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    color: #41314e;
    line-height: 1.6em;
    font-size: 12px;
    background: #2b2734;
    border: 1px solid #f1f1f4;
    box-shadow: none;
    white-space: pre;
    word-wrap: normal;
    overflow-x: auto;
    resize: vertical;
}

.ce-popover__item-label {
    color: black !important;
    background-color: red !important;
}

</style>