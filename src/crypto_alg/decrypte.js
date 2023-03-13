import { Object } from 'core-js';
import aes from 'crypto-js/aes'
import utf from 'crypto-js/enc-utf8'


const decrypte_password = (content, secret_key) => {
    if(content instanceof Object)
    {
        var bytes  = aes.decrypt(ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(utf));
        return decryptedData
    } else {
        var bytes  = aes.decrypt(content, secret_key);
        var originalText = bytes.toString(utf);
        return originalText
    }
}

export { decrypte_password }