export interface User {
    name: { first: string, last: string }
    picture: { large: string }
}

export interface RatedUser extends User {
    rating: number
}