export interface User {
    name: { first: string, last: string }
    picture: { large: string }
}

export interface RatedUser extends User {
    rating: number
}

export enum RatingOutcome {
    Accepted = 'Accepted',
    Discarded = 'Discarded'
}

export interface RatingRecord {
    decision: RatingOutcome
    rating?: number
    ratedAt: Date
}
