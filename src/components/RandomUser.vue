<template>
    <div class="user-container">
        <div v-if="loading">Loading...</div>
        <div v-else class="user-details">
            <h2>{{ user?.name.first }} {{ user?.name.last }}</h2>
            <img :src="user?.picture.large" alt="User Image" class="user-image">

            <div class="rating-slider">
                <input type="range" min="1" max="100" v-model="rating" class="slider"/>
                <div>Rating: {{ rating }}</div>
            </div>
        </div>

        <div v-if="!loading">
            <button class="confirm-rating-button" @click="handleConfirm">Interested</button>
            <button class="refresh-button" @click="handleRefresh">Not interested</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { RatedUser } from '../types/types'

@Component
export default class RandomUser extends Vue {
    user: RatedUser | null = null
    loading = false
    rating = 50

    created () {
      this.fetchUser()
    }

    private async fetchUser () {
      this.loading = true
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()

      this.user = { ...data.results[0], rating: this.rating }
      this.rating = 50

      this.loading = false
    }

    @Emit('decline')
    private async handleRefresh () {
      await this.fetchUser()
      return this.user
    }

    @Emit('confirm')
    private emitUser ():RatedUser {
      if (this.user) {
        this.user.rating = this.rating
      }
      return this.user as RatedUser
    }

    private async handleConfirm () {
      this.emitUser()
      await this.fetchUser()
    }
}
</script>

<style scoped>
.user-container {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    width: 300px;
    margin: 20px auto;
    min-height: 200px;
}

.user-details {
    text-align: center;
}

.user-image {
    border-radius: 50%;
    width: 100px;
    height: 100px;
}

.refresh-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #f44336; /* Red */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.refresh-button:hover {
    background-color: #d32f2f;
}

.confirm-rating-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.confirm-rating-button:hover {
    background-color: #45a049;
}

.rating-slider {
    display: flex;
    align-items: center;
    gap: 10px;
}

.slider {
    width: 100%;
}
</style>
