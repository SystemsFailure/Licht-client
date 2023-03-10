

import { db } from "@/main";
import { collection, addDoc, query, getDoc, doc, getDocs, where } from "firebase/firestore";

const regis = {
    state: () => ({
        data: {},
        author: {},
        resultRegis: false,
    }),
    mutations: {
        setauthor(st, vl) {
            st.author = vl
        },
        setresultRegis(s, v) {
            s.resultRegis = v
        },
    },
    actions: {
        async createAccount({state, dispatch}, data) {
            await dispatch('existenceTest', data)
            if(state.resultRegis === true) {
                const docRef = await addDoc(collection(db, "authors"), {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    index: 0,
                });
                console.log(docRef, state)
            }
        },

        async getAuthor({ commit }, id) {

            const docRef = doc(db, "authors", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
            // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            let data = {
                id: docSnap.id,
                name: docSnap.data().name,
                email: docSnap.data().email,
                password: docSnap.data().password,
                index: docSnap.data().index,
            }

            commit('setauthor', data)
        },

        async getAsyncAllAuthors() {
            const uquery = query(collection(db, "authors"));
            const querySnapshot = await getDocs(uquery);
            querySnapshot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    password: doc.data().password,
                    index: doc.data().index,
                }
                console.log(doc.id, " => ", doc.data(), data);
            });
        },

        async existenceTest({commit}, data) {
            const q = query(collection(db, "authors"), where("email", "==", data.email), where('password', '==', data.password));
            const querySnapshot = await getDocs(q);
            let doc = querySnapshot
            if(!doc.empty) {
                commit('setresultRegis', false)
                console.log('so author already exist')
            } else {
                console.log('okey')
                commit('setresultRegis', true)
            }
        },
    },

    namespaced: true,
}

export default regis