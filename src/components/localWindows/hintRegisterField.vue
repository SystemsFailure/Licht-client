<template>
    <div class="main-hint-window">
        <div class="inner">
            <div class="box-content">

                <div v-if="typefield === 'name'" class="content">

                    <div class="inner-box">
                        <span>
                            <svg v-if="!objectName.one" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d3d3d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57cde4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            <span id="one-full" :style="objectName.one? {'color' : '#57cde4'} : {'color' : '#888'}">4 simbols minimum</span>
                        </span>

                        <span>
                            <svg v-if="!objectName.two" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d3d3d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#57cde4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            <span id="one-full" :style="objectName.two? {'color' : '#57cde4'} : {'color' : '#888'}">Name must be exits</span>
                        </span>

                        <span>
                            <svg v-if="!objectName.free" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d3d3d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#57cde4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            <span id="one-full" :style="objectName.free? {'color' : '#57cde4'} : {'color' : '#888'}">Expression RegEx</span>
                        </span>
                    </div>

                    <div class="wrapper-text-c">

                        <span id="about-name">
                            The personal name given to a person at birth and allowing others to distinguish one person from another
                        </span>

                    </div>
                </div>

                <div v-if="typefield === 'email'" class="content">
                    <div class="inner-box">
                        <span>
                            <svg v-if="!objectEmail.one" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d3d3d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57cde4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            <span id="one-full" :style="objectEmail.one? {'color' : '#57cde4'} : {'color' : '#888'}">email must have @</span>
                        </span>

                        <span>
                            <svg v-if="!objectEmail.two" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d3d3d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#57cde4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            <span id="one-full" :style="objectEmail.two? {'color' : '#57cde4'} : {'color' : '#888'}">E-mail must be exits</span>
                        </span>
                    </div>

                    <div class="wrapper-text-c">

                        <span id="about-name">
                            Email is required in order to verify you, check that you are a person
                        </span>

                    </div>
                </div>

                <div v-if="typefield === 'password'" class="content">
                    <div class="inner-box">
                        <span>
                            <svg v-if="!objectPassword.one" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d3d3d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57cde4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            <span id="one-full" :style="objectPassword.one? {'color' : '#57cde4'} : {'color' : '#888'}">Password must be exits</span>
                        </span>

                        <span>
                            <svg v-if="!objectPassword.two" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d3d3d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#57cde4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            <span id="one-full" :style="objectPassword.two? {'color' : '#57cde4'} : {'color' : '#888'}">Password must be expression reg-Ex</span>
                        </span>
                    </div>

                    <div class="wrapper-text-c">

                        <span id="about-name">
                            Password - a conditional word or an arbitrary set of characters, consisting of letters, numbers and other symbols, and designed to confirm identity or authority
                        </span>

                    </div>
                </div>

            </div>


        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },

    props: {
        field: {},
        typefield: {},

        objectName: {},
        objectEmail: {},
        objectPassword: {},
    },

    watch: {
        objectName: {
            handler(newValue) {
                if(newValue.one) {
                    console.log('one is true')
                }
            },
            deep: true,
        }
    }

    
}
</script>
<style lang="scss" scoped>

.main-hint-window {
    width: auto;
    height: auto;
    padding: 15px;
    background-color: rgba($color: #000000, $alpha: .85);
    position: absolute;
    color: #fff;
    z-index: 2;
    
    border-radius: 5px;

    .inner {
        width: 100%;
        height: 100%;


        .box-content { 
            width: 100%;
            height: 100%;
            .content {
                width: 200px;
                height:auto;
                text-transform: uppercase;
                font-weight: 300;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                font-size: 5px;

                .wrapper-text-c {
                    margin-top: 30px;
                    #about-name {
                        // margin-top: 20px;
    
                        width: 100px;
                        font-size: 12px;
                        text-transform: lowercase;
                        color: #555;
                        word-wrap: break-word;
                    }
                }


                .inner-box {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    
                    span {
                        margin-top: 5px;
                        display: flex;
                        // justify-content: center;
                        align-items: center;

                        #one-full {
                            font-size: 12px;
                            color: #888;
                            margin-left: 10px;

                        }
                    }
                }
            }
        }
    }
}

</style>