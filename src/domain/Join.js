export default class Join {
    constructor(session, player) {
        this.session = session;
        this.player = player;
        this.isRest = false;

        this.gamePlayCount = 0;
    }

    incrementGamePlayCount() {
        this.gamePlayCount++
    }

    changeRestState() {
        this.isRest = !this.isRest
    }
}