<template>
<div class="signin">
<input type="text" v-model="input_email" />
<input type="text" v-model="input_password" />
<button v-on:click="signIn">SignIn</button>  
<p>{{ token }}</p>
<button v-on:click="getUserInfo">GetUserInfo</button>
<h3> User Data</h3>
<p>{{ userInfo}}</p>
<p>{{ userInfo.email}}</p>
<p>{{ userInfo.password }}</p>

</div>
    
</template>

<script>
import { computed, ref } from 'vue'
import {useStore} from "vuex"

export default {
    setup(){
        const store = useStore()
        const token = computed(()=>store.getters.showToken)

        const userInfo = computed(()=>store.getters.getUserInfo)

        const input_email = ref("")
        const input_password = ref("")

        const signIn = () => {
            let email = input_email.value
            let password = input_password.value
            console.log(email, password)
            store.dispatch("SignIn", {email, password})
        }

        const getUserInfo = () => {
            store.dispatch("GetUserInfo")
        }


        return {
            input_email,
            input_password,
            token,
            userInfo,
            signIn,
            getUserInfo,
        }
    }

}

</script>