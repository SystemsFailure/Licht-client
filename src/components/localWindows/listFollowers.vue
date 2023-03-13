<template>
    <div class="list-followers">
        <div class="inner">
            <div class="lds-ripple"><div></div><div></div></div>
            <div class="inline">
                <span>list followers</span>
            </div>
            <div class="list">
                <div class="it" v-for="it in listFollowers" :key="it.id">
                    <img src="@/assets/buetyful.jpg" alt="">
                    <span id="field-name-id">{{ it.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listFollowers: [
                {id: 0, name: 'Eric Leonhard'}
            ],
        }
    },
}
</script>
<style lang="scss" scoped>


.list-followers {
    width: auto;
    height: auto;
    min-height: 300px;
    min-width: 400px;
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #161B22, $alpha: .8);
    z-index: 2;
    border-radius: 10px;
    .inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        flex-direction: column;
        .inline {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 12px;
                text-transform: uppercase;
                font-weight: 300;
                font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
        }
 
        .list {
            margin-top: 15px;
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 5px;
            .it {
                width: 100%;
                padding: 10px;
                display: flex;
                align-items: center;
                border: 1px solid #333;
                padding-left: 15px;
                font-size: 16px;
                border-radius: 7px;

                &:hover {
                    cursor: pointer;
                    border: 1px solid teal;
                }

                img {
                    width:32px;
                    height:32px;
                    border-radius: 50%;
                }

                #field-name-id {
                    margin-left: 10px;
                }
            }
        }
    }
}

.lds-ripple {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 80px;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}
.lds-ripple div {
  position: absolute;
  border: 4px solid rgb(158, 158, 158);
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