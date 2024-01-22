import GroupStrategy from './GroupStrategy.js'
import InGame from './InGame.js'

export default class GenderBaseGroup extends GroupStrategy {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    doGroup(courts, joinPlayers) {

        if (joinPlayers.length === 0) {
            return
        }

        const groupedJoins = this.groupByGender(joinPlayers);

        courts.forEach((court) => {
            let count = 0
            let requirePositions = court.getRequirePositions();

            if (!requirePositions.length) {
                return;
            }

            requirePositions.forEach((position) => {
                count++

                if (groupedJoins.get(0).length === 0 && groupedJoins.get(1).length === 0) {
                    return
                }

                if (groupedJoins.get(count % 2).length === 0) {
                    count++
                }

                const currentGroup = groupedJoins.get(count % 2);

                const randomIndex = Math.floor(Math.random() * currentGroup.length);
                const selectedJoin = currentGroup.splice(randomIndex, 1)[0];

                court.addInGamePlayer(position, new InGame(court, selectedJoin.player));
            });
        });
    }

    groupByGender(joinPlayers) {
        const groupedJoins = new Map();

        joinPlayers.forEach((join) => {
            let key = 1
            if (join.player.gender == "female") {
                key = 0
            }

            if (!groupedJoins.has(key)) {
                groupedJoins.set(key, []);
            }

            groupedJoins.get(key).push(join);
        });

        return groupedJoins;
    }
}