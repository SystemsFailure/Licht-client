<template>
    <div v-if="false" class="lds-ripple"><div></div><div></div></div>
    <div class="main-page">
        <navigationBar></navigationBar>
        <ProfileView></ProfileView>
        <ArticlesContainer></ArticlesContainer>
    </div>
</template>
<script>
import navigationBar from '@/components/NavigationBar.vue'
import ProfileView from '@/components/ProfileView.vue'
import ArticlesContainer from '@/components/ArticlesContainer.vue'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            
        }
    },

    methods: {
        ...mapMutations('articles', {
            setauthorId: 'setauthorId',
        })
    },

    mounted() {
        if(localStorage.getItem('author-id'))
        {
            this.setauthorId(localStorage.getItem('author-id'))
            console.log('set id is', localStorage.getItem('author-id'))
        }
    },

    components: {
        navigationBar,
        ProfileView,
        ArticlesContainer,
    }
}
</script>
<style lang="scss" scoped>

.main-page {
    width: 100%;
    height: 100vh;
    background-color: #0D1117;
    color: white;
    padding-top: 50px;
    display: flex;
    
}

.lds-ripple {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}


</style>