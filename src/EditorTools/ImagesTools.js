import store from "@/store/store";
import { Object } from "core-js";

class ImageTool {

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }    

    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    render(){
        this.wrapper = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        input.type = 'file'
        input.id = 'file_img'
        label.setAttribute('for', 'file_img');

        if (this.data && this.data.url){
            this._createImage(this.data.url, this.data.caption);
            return this.wrapper;
        }
        
        this.wrapper.classList.add('simple-image');
        this.wrapper.appendChild(input);
        this.wrapper.appendChild(label);
        
        label.style.background = 'none'
        label.style.border = '1px solid #999'
        label.style.borderRadius = '5px'
        label.style.width = '100%'
        label.style.height = '50px'
        label.style.display = 'flex'
        label.style.alignItems = 'center'
        label.style.justifyContent = 'center'
        label.innerHTML = 'choice image'
        label.style.padding = '5px'
        label.style.color = '#fff'
        input.value = this.data && this.data.url ? this.data.url : '';
        label.style.cursor = 'pointer'
        input.style.display = 'none'
    
        input.addEventListener('change', async (event) => {
            let file = event.target.files[0]
            let url = undefined
            if(!file) {console.log('file is not defined, return'); return;}
            let typefile = file.type?.split('/')[1]
            if(typefile === undefined) {console.log('field type from object file is undefined, return'); return;}
            if(file instanceof Object) {
                if(typefile != undefined) {
                    try {
                        await store.dispatch('articles/uploadImage', file)
                        url = await store.getters['articles/returnurl']
                        this._createImage(url);
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            console.log(file, typeof file,typefile, 'hello')
        });

    
        return this.wrapper;
    }

    _createImage(url, captionText){
        const image = document.createElement('img');
        const caption = document.createElement('input');
    
        image.src = url;
        image.style.width = '100%'
        image.style.height = '400px'
        image.style.objectFit = 'cover'

        caption.placeholder = 'Caption...';
        caption.value = captionText || '';
        caption.style.width = '100%'
        caption.style.height = '50px'
        caption.style.background = 'none'
        caption.style.border = 'none'
        caption.style.borderRadius = '5px'
        caption.style.padding = '5px'
        caption.style.color = '#fff '
        
    
        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(image);
        this.wrapper.appendChild(caption);
    }
    

    save(blockContent){
        // const image = blockContent.querySelector('img');
        const images = blockContent.querySelectorAll('img');
        const captions = blockContent.querySelectorAll('input');

        if(images.length != 0) {
            for (let index = 0; index < images.length; index++) {
                const img = images[index];
    
                return {
                    url: img.src,
                    caption: captions[index].value ? captions[index].value : '',
                }
                
            }
        }


    }
}

export {ImageTool}