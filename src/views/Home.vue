<template lang="pug">
  .home
    img(alt="Vue logo" :src="vueLogo")
    HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script>
import HelloWorld from 'src/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      vueLogo: 'dist/'+ require('src/assets/logo.png')
    }
  }
}
</script>
