class DefaultText {
    constructor({data}){
        this.data = data;
    }   

    static get toolbox() {
        return {
            title: 'defaule txt',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }


    static get sanitize() {
        return {
            text: {
                br: true,
                div: true,
            },
        };
    }

    
    render() {
        // this.wrapper = document.createElement('div');
        const textarea = document.createElement('textarea');
        textarea.classList.add('ddeafaultext');
        textarea.style.background = 'none'
        textarea.style.border = 'none'
        textarea.style.borderRadius = '5px'
        textarea.style.width = '100%'
        textarea.style.maxWidth = '100%'
        textarea.style.minWidth = '100%'
        textarea.style.height = '50px'
        textarea.style.maxHeight = '50px'
        textarea.style.minHeight = '50px'
        textarea.style.display = 'flex'
        textarea.style.padding = '5px'
        textarea.style.color = '#fff'
        textarea.placeholder = 'Write something...'
        return textarea;
    }

    save(blockContent){
        const text = blockContent.querySelector('.ddeafaultext');
    
        return {
          caption: text.value
        }
    }
}

export default DefaultText