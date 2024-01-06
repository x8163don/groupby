export default class Court {
    constructor(id, maxPlayerCount) {
        this.id = id;
        this.maxPlayerCount = maxPlayerCount;

        this.inGamePlayers = new Array(maxPlayerCount);
    }

    getRequirePositions() {
        let result = []
        for (let i = 0; i < this.maxPlayerCount; i++) {
            if (!this.inGamePlayers[i]) {
                result.push(i)
            }
        }
        return result
    }

    addInGamePlayer(position, inGamePlayer) {
        if (position >= this.maxPlayerCount) {
            throw new Error("Position out of range")
        }
        this.inGamePlayers[position] = inGamePlayer
    }


    clearInGamePlayers() {
        this.inGamePlayers = new Array(this.maxPlayerCount)
    }
}