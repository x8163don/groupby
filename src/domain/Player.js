export default class Player {
    constructor(id, name, gender, joinTimes = 0) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.joinTimes = joinTimes;

    }

    incrementJoinTimes() {
        this.joinTimes++;
    }
}