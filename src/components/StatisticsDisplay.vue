<template>
  <div class="statistics-display">
    <h2>Statistics</h2>
    <p>{{ acceptedUsersCount }}</p>
    <p>{{ declinedUsersCount }}</p>
    <p>{{ averageRating }}</p>
    <p>{{ acceptedPercent }}</p>
    <p>{{ elapsedTime }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RatingRecord, RatedUser, RatingOutcome } from '../types/types'

@Component
export default class StatisticsDisplay extends Vue {
  // kolik casu od prvniho inputu
  // Procenta accept/reject
  // pocet accepted rejected
  // average rating

  data () {
    return {
      ratings: [],
      firstRatingTime: undefined,
      elapsedTime: 'No ratings yet!'
    }
  }

  ratings: RatingRecord[] = []
  firstRatingTime: Date | undefined = undefined
  elapsedTime = 'No ratings yet!'
  intervalId: number | undefined = undefined

  created () {
    this.intervalId = window.setInterval(() => {
      this.updateElapsedTime()
    }, 1000) // Update every second
  }

  destroyed () {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId)
    }
  }

  updateElapsedTime () {
    if (this.firstRatingTime === undefined) {
      this.elapsedTime = 'No ratings yet!'
    } else {
      const now = new Date()
      const diffMs = now.getTime() - this.firstRatingTime.getTime()
      const diffSec = Math.floor(diffMs / 1000)
      this.elapsedTime = `${Math.floor(diffSec / 60)} minutes and ${diffSec % 60} seconds`
    }
  }

  addAcceptedUser (acceptedUser: RatedUser) {
    const newRecord: RatingRecord = {
      decision: RatingOutcome.Accepted,
      rating: acceptedUser.rating,
      ratedAt: new Date()
    }

    this.ratings.push(newRecord)

    if (this.firstRatingTime === undefined) {
      this.firstRatingTime = newRecord.ratedAt
    }
  }

  addDeclinedUser () {
    const newRecord: RatingRecord = {
      decision: RatingOutcome.Discarded,
      rating: undefined,
      ratedAt: new Date()
    }

    this.ratings.push(newRecord)

    if (this.firstRatingTime === undefined) {
      this.firstRatingTime = newRecord.ratedAt
    }
  }

  private get acceptedUsersCount (): string {
    return `Accepted Users: ${this.ratings.filter(r => r.decision === RatingOutcome.Accepted).length}`
  }

  private get declinedUsersCount (): string {
    return `Declined Users: ${this.ratings.filter(r => r.decision === RatingOutcome.Discarded).length}`
  }

  private get acceptedPercent (): string {
    if (this.ratings.length === 0) {
      return 'No rated users yet'
    }

    const acceptedRatingsCount = this.ratings.filter(r => r.decision === RatingOutcome.Accepted).length
    const percentAccepted = (acceptedRatingsCount / this.ratings.length) * 100
    return `Accepted ${percentAccepted.toFixed(1)} %`
  }

  private get averageRating (): string {
    if (this.ratings.length === 0) {
      return 'No users accepted yet'
    }
    const acceptedRatings = this.ratings
      .filter(r => r.decision === RatingOutcome.Accepted && r.rating !== undefined)
      .map(r => r.rating as number)

    const average = acceptedRatings.reduce((a, b) => Number(a) + Number(b), 0) / acceptedRatings.length

    return `Average rating: ${average.toFixed(1)}%`
  }
}
</script>

<style>
.statistics-display {
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: left;
}

.statistics-display h2 {
  margin-top: 0;
  color: #2c3e50;
}

.statistics-display p {
  margin: 10px 0;
  color: #333;
}
</style>
