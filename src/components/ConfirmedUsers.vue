<template>
<div class="confirmed-users-container">
    <div class="confirmed-users-header"><h2>Confirmed Users</h2></div>
        <div class="confirmed-users">
            <div v-for="(user, index) in confirmedUsers" :key="index">
                <img :src="user.picture.large" alt="User picture">
                <p>{{ user.name.first }} {{ user.name.last }}</p>
                <p>Rating: {{ user.rating }}  {{ getEmojiFromRating(user.rating) }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RatedUser } from '../types/types'

@Component
export default class ConfirmedUsers extends Vue {
    confirmedUsers: RatedUser[] = []

    addConfirmedUser (user: RatedUser) {
      this.confirmedUsers.push(user)
    }

    private getEmojiFromRating (rating: number):string {
      switch (true) {
      case (rating < 30):
        return '😞'
      case (rating < 60):
        return '😐'
      default:
        return '🔥'
      }
    }
}
</script>

<style>
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
