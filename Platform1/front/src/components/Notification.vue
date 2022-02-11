<template>
  <div class="notification">
  <h2>Notification</h2>
  <button v-on:click="send">send</button>
  </div>
</template>

<script>
import {NotificationRequest} from "@/proto/communicate_pb.js"
import {CommunicateTestClient} from "@/proto/communicate_grpc_web_pb.js"
import {ref} from "vue";
export default {
  name: 'Notification',
  setup(){
    const client = ref(new CommunicateTestClient('http://localhost:8080', null, null));

    const send = () => {
      let metadata = {}
      let streamRequest = new NotificationRequest();
      streamRequest.setNum(10)
      var stream = client.value.notification(streamRequest, metadata);
      stream.on('data', function(response) {
        console.log("get data:",response.getNum());
      });
      stream.on('end', function() {
        console.log("stream end!")
      });
    }

    return {
      client,
      send
    }
  },
  props: {
    msg: String
  },

}
</script>

