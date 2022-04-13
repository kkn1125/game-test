const BaseSetting = {
    player: {
        speed: 5,
        hp: 300,
        mp: 50,
        maxHp: 300,
        maxMp: 50,
        ability: {
            damage: 5,
            critical: 0,
            farmSpeed: 1,
        },
        status: {
            power: 5,
            dex: 5,
            int: 5,
            luck: 5,
        }
    }
}

const Ability = function (ability={}) {
    this.damage = ability.damage||BaseSetting.player.ability.damage;
    this.critical = ability.critical||BaseSetting.player.ability.critical;
    this.farmSpeed = ability.farmSpeed||BaseSetting.player.ability.farmSpeed;
}

const Status = function (status={}) {
    this.power = status.power||BaseSetting.player.status.power;
    this.dex = status.dex||BaseSetting.player.status.dex;
    this.int = status.int||BaseSetting.player.status.int;
    this.luck = status.luck||BaseSetting.player.status.luck;
}

Ability.createAbility = (damage, critical, farmSpeed) => {
    return {
        damage: damage,
        critical: critical,
        farmSpeed: farmSpeed,
    }
}

Status.createStatus = (power, dex, int, luck) => {
    return {
        power: power,
        dex: dex,
        int: int,
        luck: luck,
    }
}

export {BaseSetting, Status, Ability};