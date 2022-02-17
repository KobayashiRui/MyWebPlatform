import {SignInRequest, UserInfoRequest} from "@/proto/todolist_pb.js"
import {TodoListServiceClient} from "@/proto/todolist_grpc_web_pb.js"

const grpcController = {
    state: () => ({
      grpcClient : new TodoListServiceClient('http://localhost:8080', null, null),
      auth_token: "",
      message : "",
      userInfo : {},
    }),
    mutations: {
      set_token(state, token){
          console.log("set token")
          state.auth_token = token
      },
      set_userdata(state, {email, password}){
        console.log("email:", email, ", pw:" , password)
        state.userInfo = {email: email, password: password}
      }
    },
    getters:{
        showToken(state){
            return state.auth_token
        },
        getUserInfo(state){
            return state.userInfo
        }
    },
    actions: {
        SignIn ({state, commit}, {email, password}){
            console.log("data:", email, password)
            let reqeust = new SignInRequest();
            reqeust.setEmail(email);
            reqeust.setPassword(password);
            console.log(state.grpcClient)
            state.grpcClient.signIn(reqeust, {}, (err, response) => {
                if (err) {
                    console.error(err);
                }else{
                    const token = response.getToken()
                    console.log(token)
                    commit("set_token", token)
                }
            }) 
        },
        GetUserInfo({state, commit}){
            let reqeust = new UserInfoRequest();
            state.grpcClient.userInfo(reqeust, {"x-auth-token":state.auth_token}, (err, response) => {
                if (err) {
                    console.error(err);
                }else{

                    commit("set_userdata", { email: response.getEmail(), password:response.getPassword()})
                }
            })

        }
    }
  }

export default grpcController