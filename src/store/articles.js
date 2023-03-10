import { doc, setDoc, collection, addDoc, query, where, getDocs, updateDoc, increment, getDoc, } from "firebase/firestore";
import { db } from "@/main";
import { storage } from "@/main";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const articles_module = {
    state: () => ({
        authorId: 'kkyvqdpvr7TniL2T5s5n',
        savedData: {},
        listOfIdCurrentArticle: [],
        authorArticleList: [],
        listArticles: [],
        blocks: [],
        file: null,
        progress: null,
        url: null,
        index: null,

        cacheFullPathsList: [],
        result: null,
    }),

    getters: {
        returnListIds(st) {
            return st.listOfIdCurrentArticle
        },
        returnauthorArticleList(st) {
            return st.authorArticleList
        },
        returmblocks(st) {
            return st.blocks
        },
        returnlistArticles(st) {
            return st.listArticles
        },
        returnfile(st) {
            return st.file
        },
        returnprogress(st) {
            return st.progress
        },
        returnurl(st) {
            console.log('return url')
            return st.url
        },
        returnauthorId(st) {
            return st.authorId
        },
        returnindex(st) {
            return st.index  
        },
        returncacheFullPathsList(st) {
            return st.cacheFullPathsList
        }
    },

    mutations: {
        setSavedData(st, vl) {
            st.savedData = vl
        },
        setListId(st, vl) {
            st.listOfIdCurrentArticle = vl
        },
        setfile(st, vl) {
            st.file = vl
        },
        setprogress(st, vl) {
            st.progress = vl
        },
        seturl(st, vl) {
            console.log('set url', vl)
            st.url = vl
        },
        setauthorId(st, vl) {
            st.authorId = vl
        },
        setindex(st, vl) {
            st.index = vl
        },
        setresult(st, vl) {
            st.result = vl
        },
        filListIds(state, vl) {
            state.listOfIdCurrentArticle.push(vl)
        },
        filAuthorArticleList(state, vl) {
            state.authorArticleList.push(vl)
        },
        filblocks(st, vl) {
            st.blocks.push(vl)
        },
        fillistArticles(st, vl) {
            st.listArticles.push(vl)
        },
        filcacheFullPathsList(st, vl) {
            st.cacheFullPathsList.push(vl)
        },
        unfilcacheFullPathsList(st) {
            st.cacheFullPathsList = []
        },
        unfilBlocks(st) {
            st.blocks = []
        },
    },

    actions: {
        async addArticleInstance() {

        },

        async addBlockInstance({state, commit, getters}, vl) {
            commit('setSavedData', vl)
            if(!state.savedData) {console.log('state.savedData is null, return');return}
            if(!state.savedData.blocks) {console.log('return'); return;}
            for (const el of state.savedData.blocks) {
                if(el != {}) 
                {
                    const data = {
                        authorId: state.authorId,
                        id: el.id ? el.id : null,
                        type: el.type ? el.type : null,
                        data: el.data ? el.data : null,
                        time: state.savedData.blocks.time ? state.savedData.blocks.time : null,
                        subId: state.savedData.blocks.length > 1 ? state.savedData.blocks[0].id + '-' +  state.savedData.blocks[1].id : state.savedData.blocks[0].id,
                    }
                    await setDoc(doc(db, "blocks", el.id), data);
                    commit('filListIds', el.id?el.id:null);
                }
                else
                {
                    console.log('interable element of el in state.savedData.blocks is null');
                    return;
                }
            }
            const listIds = getters.returnListIds
            if(listIds.length != 0 || listIds != [] || listIds != null || listIds != undefined)
            {
                const data_ = {
                    authorId: state.authorId,
                    title: 'default',
                    description: 'default',
                    arrayID: listIds,
                    arrayForks: [],
                    arrayLikes: 0,
                    arrayViews: 0,
                    subId: state.savedData.blocks.length > 1 ? state.savedData.blocks[0].id + '-' +  state.savedData.blocks[1].id : state.savedData.blocks[0].id,
                }
                const docRef = await addDoc(collection(db, "articles"), data_);
                console.log("Document written with ID: ", docRef.id);
            }
            commit('unfilcacheFullPathsList')
        },

        async getAuthorArticles({commit, state}, authorId) {
            authorId = state.authorId
            // const docInstance = null
            if(authorId)
            {
                const uquery = query(collection(db, "articles"), where("authorId", "==", authorId));
                const querySnapshot = await getDocs(uquery);
                querySnapshot.forEach((doc) => {
                    commit('filAuthorArticleList', {
                        id: doc.id,
                        authorId: doc.data().authorId,
                        arrayID: doc.data().arrayID,
                        title: doc.data().title,
                        description: doc.data().description,
                        arrayForks: doc.data().arrayForks,
                        arrayLikes: doc.data().arrayLikes,
                        arrayViews: doc.data().arrayViews,
                        subId: doc.data().subId,
                    })
                    console.log(doc.id, " => ", doc.data());
                });

            }
        },

        async getBlocks({state, commit}, blockId) {
            const q = query(collection(db, "blocks"), where("subId", "==", blockId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.exists() && doc.data()) {
                    let data = {
                        authorId: doc.data().authorId,
                        data: doc.data().data,
                        id: doc.data().id,
                        type: doc.data().type,
                        subId: doc.data().subId,
                    };
                    commit('filblocks', data);
                    console.log(doc.id, " => ", doc.data());
                }
            });
            console.log(state.blocks[0], 'blocks');
        },

        async getArticleByIdContent({dispatch}, id) {
            const docRef = doc(db, "articles", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if(docSnap.data()?.subId)
                {
                    dispatch('getBlocks', docSnap.data().subId)
                }
            } else {
                console.log("No such document!");
            }
        },

        async getArticles({commit}) {
            const uquery = query(collection(db, "articles"));
            const querySnapshot = await getDocs(uquery);
            querySnapshot.forEach((doc) => {
                commit('fillistArticles', {
                    id: doc.id,
                    authorId: doc.data().authorId,
                    arrayID: doc.data().arrayID,
                    title: doc.data().title,
                    description: doc.data().description,
                    arrayForks: doc.data().arrayForks,
                    arrayLikes: doc.data().arrayLikes,
                    arrayViews: doc.data().arrayViews,
                })
                console.log(doc.id, " => ", doc.data());
            });
        },

        async updatefield({getters, state}) {
            if(getters.returnauthorId != undefined) {
                const DocRef = doc(db, 'authors', state.authorId);
                await updateDoc(DocRef, {
                    index: increment(1),
                });
            }
        },

        async getfield({state, commit}, document) {
            if(state.authorId)
            {
                const ref = doc(db, document, state.authorId);
                const docSnap = await getDoc(ref);
                if (docSnap.exists()) {
                    commit('setindex', docSnap.data().index);
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        },

        async uploadImage({getters, dispatch, commit}, file) {
            let filename = file.name.split('.')[0]
            let fileExt = file.type.split('/')[1]
            let file_path = null
            console.log('uploading file is start...')
            
            if(file)
            {
                if(getters.returnauthorId) {
                    await dispatch('getfield', 'authors')
                    let index = getters.returnindex
                    await dispatch('updatefield', 'authors')

                    const storageRef = ref(storage, `images/${getters.returnauthorId}/${filename}-${index}.${fileExt}`);
                    await uploadBytes(storageRef, file).then( async (snapshot) => {
                        file_path = snapshot.metadata.fullPath
                        const starsRef = ref(storage, snapshot.metadata.fullPath)
                        if(!starsRef) {
                            console.log(starsRef, 'not found', 'MessageController -> file not found' + `${file_path}`);
                            return;
                        }
                        await getDownloadURL(starsRef).then((url) => {
                            if(file_path) {
                                commit('filcacheFullPathsList', file_path);
                            }
                            commit('seturl', url)
                          }).catch((error) => {
                            console.log(error);
                          })
                      }).catch( error => {
                        console.log(error)
                      })
                } else {
                    console.log('getters.returnauthorId is undefined or null')
                }
            } else {
                console.log('file is not define, sorry')
            }

        },

        async deleteImagesThroughCache({state, commit}, cacheFilesPathsArray) {
            if(state.cacheFullPathsList === cacheFilesPathsArray)
            {
                cacheFilesPathsArray = state.cacheFullPathsList
            }
            if(cacheFilesPathsArray != null && cacheFilesPathsArray != [] && cacheFilesPathsArray) {
                console.log(cacheFilesPathsArray, 'whati')
                for (const filepath of cacheFilesPathsArray) {
                    if(filepath) {
                        const desertRef = ref(storage, filepath);
                        // Delete the file
                        await deleteObject(desertRef).then(() => {
                          // File deleted successfully
                        }).catch((error) => {
                            console.log(error)
                        });
                    }                    
                }
                commit('unfilcacheFullPathsList')
            }
        },
    },

    namespaced: true
}

export default articles_module