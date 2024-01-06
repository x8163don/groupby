export default  class Player {
    constructor(id, name, gender) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.joinTimes = 0;

    }

    incrementJoinTimes() {
        this.joinTimes++;
    }
}