const BaseSetting = {
    commons: {
        default: {
            name: 'no name',
            gravity: 1,
        }
    },
    player: {
        default: {
            AUTO_EARN_TIME: 100,
            EARN_VALUE: 1,
            sizeX: 50,
            sizeY: 80,
            x: 300,
            y: 0,
            GROUND_RATIO: 0.83,
            name: 'no name',
            speed: 5,
            jump: 15,
            gravity: 0,
            hp: 300,
            mp: 50,
            maxHp: 300,
            maxMp: 50,
            exp: 0,
            money: 1000,
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
    },
    monster: {
        default: {
            name: 'test monster'
        }
    },
    item: {
        default: {
            name: 'item-a',
            ability: {
                damage: 1,
                critical: 0,
                farmSpeed: 1,
            },
            status: {
                power: 0,
                dex: 0,
                int: 0,
                luck: 0,
            }
        }
    },
    structure: {
        default: {
            locate: {
                x: 0,
                y: 30,
            },
            size: {
                width: 50,
                height: 50,
            },
            category: {
                subject: 'subject',
                building: 'building',
            },
            speed: 1,
        }
    },
    cloud: {
        default: {
            width: 180,
            height: 80,
        },
        LIMIT_AMOUNT: 200,
        SPEED: 1,
    },
    cactus: {
        LIMIT_AMOUNT: 450,
        SPEED: 1,
        GROUND_RATIO: 0.785,
    },
    ground: {
        default: {
            amount: 5,
            width: 300,
            height: 100,
        },
        LIMIT_AMOUNT: 450,
        SPEED: 2,
    },
};

export {
    BaseSetting
};