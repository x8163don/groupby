import PlayCountBaseGroup from './PlayCountBaseGroup.js'

export default class Session {
    constructor(id) {
        this.id = id;
        this.sessionPlayers = [];
        this.courts = [];

        this.groupStrategy = new PlayCountBaseGroup();
    }

    addJoin(join) {
        const includePlayerIDs = this.sessionPlayers.map(sessionPlayer => sessionPlayer.player.id)
        if (includePlayerIDs.includes(join.player.id)) {
            return
        }
        this.sessionPlayers.push(join);
        join.player.incrementJoinTimes()
    }

    removeJoinPlayer(playerID) {
        this.sessionPlayers = this.sessionPlayers.filter((join) => join.player.id !== playerID)
        this.courts.forEach((court) => {
            court.inGamePlayers = court.inGamePlayers.filter((inGamePlayer) => inGamePlayer.player.id !== playerID)
        })
    }

    addCourt(court) {
        this.courts.push(court);
    }

    removeCourt(courtID) {
        this.courts = this.courts.filter((court) => court.id !== courtID)
    }

    group() {
        const inGamePlayerIDs = this.courts.map((court) => court.inGamePlayers.map((inGamePlayer) => inGamePlayer.player.id)).flat(Infinity)
        const restPlayerIDs = this.sessionPlayers.filter(join => join.isRest).map(join => join.player.id)
        const players = this.sessionPlayers
            .filter(join => !inGamePlayerIDs.includes(join.player.id) && !restPlayerIDs.includes(join.player.id))
        this.groupStrategy.doGroup(this.courts, players)
        this.sessionPlayers.forEach(join => join.unmarkPreviousGamePlayer())
    }

    changePlayerRestState(playerID) {
        this.courts.forEach((court) => {
            const idx = court.inGamePlayers.findIndex(inGamePlayer => inGamePlayer?.player?.id === playerID)
            if (idx === -1) {
                return
            }
            court.inGamePlayers[idx] = null
        })

        this.sessionPlayers.find(join => join.player.id === playerID).changeRestState()
    }

    endGame(courtID) {
        let targetCourt = this.courts.find((court) => court.id === courtID)
        if (!targetCourt) {
            return
        }

        targetCourt.recordPreviousGamePlayerSet()

        const endGamePlayerIDs = targetCourt.inGamePlayers.map((inGamePlayer) => inGamePlayer?.player?.id)
        this.sessionPlayers.forEach(sessionPlayer => {
            if (!endGamePlayerIDs.includes(sessionPlayer.player.id)) {
                return
            }
            sessionPlayer.incrementGamePlayCount()
            sessionPlayer.markPreviousGamePlayer()
        })

        targetCourt.clearInGamePlayers()
    }

    cleanCourt(courtID){
        let targetCourt = this.courts.find((court) => court.id === courtID)
        if (!targetCourt) {
            return
        }
        targetCourt.clearInGamePlayers()
    }

    endAllGame() {
        this.courts.forEach(court => {
            this.endGame(court.id)
        })
    }

    getNotInGamePlayers() {
        const inGamePlayerIDs = this.courts.map((court) => court.inGamePlayers.map((inGamePlayer) => inGamePlayer?.player.id)).flat(Infinity).filter(id => !!id)
        return this.sessionPlayers
            .filter(join => !join.isRest && !inGamePlayerIDs.includes(join.player.id))
            .map(join => join.player)
    }

    getRestPlayers() {
        return this.sessionPlayers
            .filter(join => join.isRest)
            .map(join => join.player)
    }

    setGroupStrategy(groupStrategy) {
        this.groupStrategy = groupStrategy
    }
}