<template>
  <div class="hello">
  <h2>HelloWorld</h2>
  <button v-on:click="greet">Greet</button>
  </div>
</template>

<script>
import {HelloRequest} from "@/proto/communicate_pb.js"
import {CommunicateTestClient} from "@/proto/communicate_grpc_web_pb.js"
import {ref} from "vue";
export default {
  name: 'HelloWorld',
  setup(){
    const client = ref(new CommunicateTestClient('http://localhost:8080', null, null));

    const greet = () => {
      let request = new HelloRequest();
      request.setName("world")
      client.value.sayHello(request, {}, (err, response) => {
        if (err) {
          console.log(`Unexpected error for sayHello: code = ${err.code}` +
                  `, message = "${err.message}"`);
        } else {
          console.log(response.getMessage());
        }
      });
    }

    return {
      client,
      greet
    }
  },
  props: {
    msg: String
  },

}
</script>

