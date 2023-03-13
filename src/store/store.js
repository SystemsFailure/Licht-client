import { createStore } from 'vuex'
import articles_module from './articles'
import regis from './registration'
import verify from './verify'

import { storage } from '@/main'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'

import { db } from '@/main'
import { getDoc, doc, updateDoc } from 'firebase/firestore'


const store = createStore({
    modules: {
        articles: articles_module,
        verify: verify,
        regis: regis,
    },
    state: () => ({
        isAuth: true,
        isAdmin: false,
        publicKey: '',
        privateKey: '',

        listFollowes: [],

        listPrefixes_navbar: [
            {id: 0, string: 'profile'},
            {id: 1, string: 'articles'}
        ],
    }),
    mutations: {
        setisAuth(st, vl) {
            st.isAuth = vl
        },
        setisAdmin(st, vl) {
            st.isAdmin = vl
        },
        filListFollowers(st, vl) {
            st.listFollowes.push(vl)
        },
    },
    getters: {

    },
    actions: {
        async getFollowers({commit}, authorId) {
            if(authorId) {

                let author = null
                
                const docRef = doc(db, "authors", authorId);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    if(docSnap.data())
                    {
                        author = docSnap

                        for (const iterator of author.data().arrayFollowers) {
                            const docRefFollower = doc(db, "authors", iterator)
                            const docSnapFollower = await getDoc(docRefFollower)
                            if(docSnapFollower.exists()) {

                                commit('filListFollowers', {
                                    id: docSnapFollower.id,
                                    authorId: docSnapFollower.data().authorId,
                                    arrayID: docSnapFollower.data().arrayID,
                                    title: docSnapFollower.data().title,
                                    description: docSnapFollower.data().description,
                                    arrayForks: docSnapFollower.data().arrayForks,
                                    arrayLikes: docSnapFollower.data().arrayLikes,
                                    arrayViews: docSnapFollower.data().arrayViews,
                                    arrayFollowers: docSnapFollower.data().arrayFollowers,
                                    subId: docSnapFollower.data().subId,
                                })
                            }
                        }

                    }
                }
            }
        },

        async uploadImage({dispatch}, data) {
            let file = data.file
            let filename = file.name.split('.')[0]
            let fileExt = file.type.split('/')[1]
            let file_path = null
            console.log(data, data.authorId, data.file, fileExt, filename)
            const storageRef = ref(storage, `images/profile/${data.authorId}/${filename}.${fileExt}`);
            await uploadBytes(storageRef, file).then( async (snapshot) => {
                file_path = snapshot.metadata.fullPath
                const imageRef = ref(storage, snapshot.metadata.fullPath)
                if(!imageRef) {
                    console.log(imageRef, 'not found', 'MessageController -> file not found' + `${file_path}`);
                    return;
                }
                await getDownloadURL(imageRef).then((url) => {
                    if(articles_module.getters.returnauthorId) {
                        
                        dispatch('changeField', {authorId: data.authorId, field: 'img', newvalue: url})
                        return url
                    }
                }).catch((error) => {
                    console.log(error);
                })
                }).catch( error => {
                    console.log(error)
            })
        },

        async getFollowings({state}, authorId) {
            if(authorId) {
                console.log(state)
            }
        },

        async changeField({state}, data) {
            console.log(data.authorId, data.field, data.newvalue, [data.field])
            if(data.authorId) 
            {
                const authorRef = doc(db, "authors", data.authorId);
                if(!authorRef) {return}
                await updateDoc(authorRef, {
                    [data.field]: data.newvalue
                });
                console.log(state)
                
            } else {
                console.log('id is not define')
                return
            }
        }
    }
})

export default store