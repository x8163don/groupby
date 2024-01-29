import GroupStrategy from './GroupStrategy.js'
import InGame from './InGame.js'

export default class RandomBaseGroup extends GroupStrategy {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    doGroup(courts, joinPlayers) {
        courts.forEach((court) => {
            let requirePositions = court.getRequirePositions();

            if (!requirePositions.length) {
                return;
            }

            requirePositions.forEach((position) => {
                const randomIndex = Math.floor(Math.random() * joinPlayers.length);
                const selectedJoin = joinPlayers.splice(randomIndex, 1)[0];
                court.addInGamePlayer(position, new InGame(court, selectedJoin.player));
            });
        });
    }
}