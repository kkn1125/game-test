const BaseSetting = {
    commons: {
        default: {
            name: 'no name',
            gravity: 1,
        },
        SPEED: 3,
    },
    player: {
        default: {
            AUTO_EARN_TIME: 100,
            EARN_VALUE: 1,
            GROUND_RATIO: 0.83,
            level: 1,
            sizeX: 50,
            sizeY: 80,
            x: 350,
            y: 0,
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
            level: 1,
            sizeX: 70,
            sizeY: 50,
            x: 850,
            y: 0,
            name: 'test monster',
            jump: 15,
            gravity: 0,
            hp: 100,
            mp: 5,
            maxHp: 100,
            maxMp: 5,
            exp: 50,
            money: 100,
        },
        LIMIT_AMOUNT: 100,
        GROUND_RATIO: 0.785,
        SPEED: 5,
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
            amount: 12,
            width: 180,
            height: 80,
        },
        LIMIT_AMOUNT: 200,
        START_LEVEL: 25,
        SPEED: 1,
    },
    cactus: {
        default: {
            amount: 5,
            width: 60,
            height: 70,
        },
        LIMIT_AMOUNT: 450,
        SPEED: 1,
        GROUND_RATIO: 0.785,
    },
    ground: {
        default: {
            amount: 6,
            width: 350,
            height: 100,
        },
        LIMIT_AMOUNT: 450,
        SPEED: 2,
    },
};

export {
    BaseSetting
};