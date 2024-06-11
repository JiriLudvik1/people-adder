<template>
  <div class="statistics-display">
    <h2>Statistics</h2>
    <p>{{ acceptedUsersCount }}</p>
    <p>{{ declinedUsersCount }}</p>
    <p>{{ averageRating }}</p>
    <p>{{ acceptedPercent }}</p>
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

  ratings: RatingRecord[] = []

  addAcceptedUser (acceptedUser: RatedUser) {
    const newRecord: RatingRecord = {
      decision: RatingOutcome.Accepted,
      rating: acceptedUser.rating,
      ratedAt: new Date()
    }

    this.ratings.push(newRecord)
  }

  addDeclinedUser () {
    const newRecord: RatingRecord = {
      decision: RatingOutcome.Discarded,
      rating: undefined,
      ratedAt: new Date()
    }

    this.ratings.push(newRecord)
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

    // funguje pokud zadavas porad stejny cisla
    // nefunguje kdyz ty cisla jsou ruzna
    // accepted ratings je dopici number[]
    // funguje u ruznych cisel na pohodu
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
