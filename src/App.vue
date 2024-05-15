<template>
  <div id="app">
    <div class="header">
      <StatisticsDisplay ref="statisticsDisplay"/>
      <img alt="Vue logo" src="./assets/logo.png">
    </div>
    <div class="user-controls">
      <button @click="addUser" class="add-user-button">Add User</button>
      <button @click="removeUser" class="remove-user-button">Remove User</button>
    </div>

    <transition-group name="list" tag="div" class="users-container">
      <RandomUser v-for="(user, index) in users" :key="index" @confirm="handleConfirm" @decline="handleDecline"/>
    </transition-group>
    <ConfirmedUsers ref="confirmedUsers"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RandomUser from './components/RandomUser.vue'
import { RatedUser } from './types/types'
import ConfirmedUsers from './components/ConfirmedUsers.vue'
import StatisticsDisplay from './components/StatisticsDisplay.vue'

@Component({
  components: {
    RandomUser,
    ConfirmedUsers,
    StatisticsDisplay
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
    (this.$refs.confirmedUsers as ConfirmedUsers).addConfirmedUser(user);
    (this.$refs.statisticsDisplay as StatisticsDisplay).addAcceptedUser(user)
  }

  private handleDecline (user: RatedUser) {
    (this.$refs.statisticsDisplay as StatisticsDisplay).addDeclinedUser()
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
