<template>
    <div class="user-container">
        <div v-if="loading">Loading...</div>
        <div v-else class="user-details">
            <h2>{{ user?.name.first }} {{ user?.name.last }}</h2>
            <img :src="user?.picture.large" alt="User Image" class="user-image">
        </div>

        <div v-if="!loading">
            <button class="refresh-button" @click="handleClick">Refresh</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface User {
    name: { first: string, last: string }
    picture: { large: string }
}

@Component
export default class RandomUser extends Vue {
    user: User | null = null
    loading = false

    created () {
        this.fetchUser()
    }

    private async fetchUser () {
        this.loading = true
        const response = await fetch('https://randomuser.me/api/')
        const data = await response.json()

        this.user = data.results[0]
        this.loading = false
    }

    private async handleClick () {
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
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.refresh-button:hover {
    background-color: #45a049;
}
</style>
