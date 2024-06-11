<template>
  <div class="navbar">
    <div class="navbar-headers">
      <h1>People Adder</h1>
      <h2 @click="showDialog = true">About</h2>
    </div>

    <div v-if="showDialog" class="dialog">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus.</p>
      <h2 @click="showDialog = false">Close</h2>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const showDialog = ref(false)

    return {
      showDialog
    }
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 10px 0;
  text-align: left;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.navbar-headers {
  display: flex;
}

.navbar-headers h1, .navbar-headers h2 {
  margin-top: auto;
  margin-bottom: 0;
  padding-left: 20px;
}
</style>
