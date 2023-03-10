import { createStore } from 'vuex'
import articles_module from './articles'
import regis from './registration'
import verify from './verify'
const store = createStore({
    modules: {
        articles: articles_module,
        verify: verify,
        regis: regis,
    },
    state: () => ({
        isAuth: true,
        isAdmin: false,


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
    },
    getters: {

    },
    actions: {

    }
})

export default store