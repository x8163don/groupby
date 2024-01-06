import GroupStrategy from './GroupStrategy.js'
import InGame from './InGame.js'

export default class PlayCountBaseGroup extends GroupStrategy {
    constructor() {
        super()
    }

    doGroup(courts, joinPlayers) {

        if (joinPlayers.length === 0) {
            return
        }

        const groupedJoins = this.groupByGamePlayCount(joinPlayers);
        const gamePlayCounts = Array.from(groupedJoins.keys()).sort();
        let curGamePlayCount = gamePlayCounts[0];

        courts.forEach((court) => {
            let requirePositions = court.getRequirePositions();

            if (!requirePositions.length) {
                return;
            }

            requirePositions.forEach((position) => {
                if (groupedJoins.get(curGamePlayCount).length === 0) {
                    if (gamePlayCounts.indexOf(curGamePlayCount) === gamePlayCounts.length - 1) {
                        return
                    } else {
                        curGamePlayCount = gamePlayCounts[gamePlayCounts.indexOf(curGamePlayCount) + 1];
                    }
                }

                const currentGroup = groupedJoins.get(curGamePlayCount);
                if (!currentGroup || currentGroup.length === 0) {
                    return;
                }

                const randomIndex = Math.floor(Math.random() * currentGroup.length);
                const selectedJoin = currentGroup.splice(randomIndex, 1)[0];

                court.addInGamePlayer(position, new InGame(court, selectedJoin.player));
            });
        });
    }

    groupByGamePlayCount(joinPlayers) {
        const groupedJoins = new Map();

        joinPlayers.forEach((join) => {
            const gamePlayCount = join.gamePlayCount;

            if (!groupedJoins.has(gamePlayCount)) {
                groupedJoins.set(gamePlayCount, []);
            }

            groupedJoins.get(gamePlayCount).push(join);
        });

        return groupedJoins;
    }
}