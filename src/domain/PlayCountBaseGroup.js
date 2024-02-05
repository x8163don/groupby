import GroupStrategy from './GroupStrategy.js'
import InGame from './InGame.js'

export default class PlayCountBaseGroup extends GroupStrategy {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    doGroup(courts, joinPlayers) {
        const positions = this.getCourtPositions(courts)
        if (positions.length === 0) {
            return
        }

        const playerCandidates = this.getPlayerCandidates(joinPlayers, positions.length)
        if (playerCandidates.length === 0) {
            return
        }
        this.shuffle(playerCandidates)

        playerCandidates.forEach((join, i) => {
            const courtID = positions[i][0]
            const position = positions[i][1]
            courts.find(court => court.id === courtID).addInGamePlayer(position, new InGame(courts.find(court => court.id === courtID), join.player))
        })

        courts.forEach(court => {
            for (let i = 0; i < court.inGamePlayers.length; i += 2) {
                const key = [court.inGamePlayers[i]?.player?.id, court.inGamePlayers[i + 1]?.player?.id].sort((a, b) => a - b).join(",")
                if (court.previousGamePlayerSet.get(key)) {
                    this.shuffle(court.inGamePlayers)
                    court.inGamePlayers.sort((a, b) => (a === null) - (b === null))
                }
            }
        })
    }

    getPlayerCandidates(joinPlayers, desireSize) {
        const result = []
        const groupedJoins = new Map();

        joinPlayers.forEach((join) => {
            let gamePlayCount = join.gamePlayCount;

            if (gamePlayCount.isPreviousGamePlayer) {
                gamePlayCount += 1
            }

            if (!groupedJoins.has(gamePlayCount)) {
                groupedJoins.set(gamePlayCount, []);
            }

            groupedJoins.get(gamePlayCount).push(join);
        });

        const keys = Array.from(groupedJoins.keys()).sort((a, b) => a - b)
        keys.forEach((key) => {
            const targetJoins = groupedJoins.get(key)
            while (targetJoins.length > 0 && result.length < desireSize) {
                const randomIdx = Math.floor(Math.random() * (targetJoins.length));
                result.push(targetJoins[randomIdx]);
                targetJoins.splice(randomIdx, 1);
            }
        })
        return result
    }


    getCourtPositions(courts) {
        const result = []
        courts.forEach(court => {
            const positions = court.getRequirePositions()
            positions.forEach(position => {
                result.push([court.id, position])
            })
        })
        return result
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}