export default class Court {
    constructor(id, maxPlayerCount) {
        this.id = id;
        this.maxPlayerCount = maxPlayerCount;

        this.inGamePlayers = new Array(maxPlayerCount);
        this.previousGamePlayerSet = new Map()
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

    recordPreviousGamePlayerSet() {
        this.previousGamePlayerSet.clear()
        for (let i = 0; i < this.maxPlayerCount; i += 2) {
            const key = [this.inGamePlayers[i]?.player?.id, this.inGamePlayers[i + 1]?.player?.id].sort((a, b) => a - b).join(",")
            this.previousGamePlayerSet.set(key, true)
        }
    }

    clearInGamePlayers() {
        this.inGamePlayers = new Array(this.maxPlayerCount)
    }
}