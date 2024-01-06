export default class PlayerList {
    constructor() {
        this.players = []
    }

    addPlayer(player) {
        this.players.findIndex(p => p.id === player.id) === -1 && this.players.push(player)
    }

    getSortedPlayer() {
        return this.players.order((p1, p2) => p1.joinTimes - p2.joinTimes)
    }
}