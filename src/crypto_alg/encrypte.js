import { Object } from 'core-js';
import aes from 'crypto-js/aes';

const encrypt_password = (content, secret_key) => {
    if(content instanceof Object) {
        content = JSON.stringify(content)
        let enc_data = aes.encrypt(content, secret_key).toString()
        return enc_data
    } else {
        let enc_text = aes.encrypt(content, secret_key).toString()
        return enc_text
    }
}

export { encrypt_password }