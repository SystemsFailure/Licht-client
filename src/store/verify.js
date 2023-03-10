import { db } from "@/main";
import { collection, where, query, getDocs,  } from "firebase/firestore";
import store from "./store";

const verify = {
    state: () => ({
        resultVerify: false,
    }),
    mutations: {
        setresultVerify(st, v) {
            st.resultVerify = v
        },
    },
    actions: {
        async verify_({state, commit}, data) {
            const q = query(collection(db, "authors"), where("email", "==", data.email), where('password', '==', data.password));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty) {
                console.log('so author is not exits')
                commit('setresultVerify', false)
                return
            }
            querySnapshot.forEach((doc) => {
                console.log('doc.data().email', doc.data().email, state)
                if(doc.data().email && doc.data().password) {
                    console.log('doc.data().email', doc.data().email)
                    commit('setresultVerify', true)
                    store.commit('articles/setauthorId', doc.id)
                }
            });
        },
    },

    namespaced: true,
}

export default verify