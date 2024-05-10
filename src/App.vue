<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="user-controls">
      <button @click="addUser" class="add-user-button">Add User</button>
      <button @click="removeUser" class="remove-user-button">Remove User</button>
    </div>

    <transition-group name="list" tag="div" class="users-container">
      <RandomUser v-for="(user, index) in users" :key="index" @confirm="handleConfirm"/>
    </transition-group>
    <div class="confirmed-users-container">
    <div class="confirmed-users-header"><h2>Confirmed Users</h2></div>
    <div class="confirmed-users">
      <div v-for="(user, index) in confirmedUsers" :key="index">
        <img :src="user.picture.large" alt="User picture">
        <p>{{ user.name.first }} {{ user.name.last }}</p>
        <p>Rating: {{ user.rating }}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RandomUser from './components/RandomUser.vue'
import { RatedUser } from './types/types'

@Component({
  components: {
    // HelloWorld,
    RandomUser
  }
})
export default class App extends Vue {
  users = [1, 2, 3]
  confirmedUsers: RatedUser[] = []

  private addUser () {
    this.users.push(this.users.length + 1)
  }

  private removeUser () {
    this.users.pop()
  }

  private handleConfirm (user: RatedUser) {
    this.confirmedUsers.push(user)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.users-container {
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  flex-wrap: wrap;
}

.add-user-button {
  display: block;
  width: 200px;
  height: 45px;
  margin: 20px auto;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  transition: all 0.5s;
  cursor: pointer;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.add-user-button:hover {
  background-color: #45a049;
  color: white;
}

.user-controls {
  display: flex;
  justify-content: space-between;
  width: 420px;
  margin: 0 auto;
}

.remove-user-button {
  display: block;
  width: 200px;
  height: 45px;
  margin: 20px auto;
  background-color: #f44336; /* Red */
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  transition: all 0.5s;
  cursor: pointer;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.remove-user-button:hover {
  background-color: #d32f2f;
  color: white;
}

.list-move {
  transition: transform 0.5s ease;
}

.list-leave-active {
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.confirmed-users-container {
  position: relative;
  border: 1px solid #ddd; /* thin, light-colored border */
  border-radius: 10px; /* rounded corners */
  padding: 20px; /* some padding */
  margin: 20px 0; /* some margin */
}

.confirmed-users-header {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%; /* ensure the header takes up the full width of the container */
  display: flex; /* use flexbox to center the text */
  justify-content: center; /* center the text horizontally */
  align-items: center; /* center the text vertically */
}

.confirmed-users {
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  flex-wrap: wrap;
  margin-top: 40px;
  position: relative;
  z-index: 0;
}
.confirmed-users img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
