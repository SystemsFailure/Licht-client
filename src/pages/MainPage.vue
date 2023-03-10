<template>
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
export default {
    data() {
        return {
            
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

</style>