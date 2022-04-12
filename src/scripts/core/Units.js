/**
 * @param {object} options 기본 유닛 정보
 * @param {string} options.name 유닛 이름
 * @param {int} options.hp 유닛 체력
 * @param {int} options.mp 유닛 마나
 * @param {int} options.x 유닛 x좌표
 * @param {int} options.y 유닛 y좌표
 * @param {int} options.size 유닛 크기
 * @param {float} options.damage 유닛 데미지
 * @param {int} options.exp 유닛 데미지
 * @returns {array} 배열
 */
function createUnitInfo (options) {
    return Object.values(options);
}

/* istanbul ignore next */
function WeaponBase (damage=0, durability=0) {
    this.damage = damage;
    this.durability = durability;
}
/* istanbul ignore next */
function UnitBase (name='no name', hp=0, mp=0, x=0, y=0, size=0, damage=0, exp=0) {
    this.jumping = false;
    this.shield = 5;
    this.level = 1;
    this.live = true;
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.maxhp = hp;
    this.maxmp = mp;
    this.damage = damage;
    this.exp = exp;
    this.maxexp = function () {return this.level*100;}
    this.x = x;
    this.y = y;
    this.size = size;
    this.getExp = function (exp) {
        this.exp += exp;
        if(this.maxexp()<=this.exp) {
            this.setLevel(1);
            console.warn(`${this.name} 이(가) 레벨 업 했다! 레벨이 ${this.level} 로 올랐다!`);
            console.error(`${this.maxexp()} 를 채워야 한다!`)
            this.exp = 0;
            console.log(`================================================`);
        }
    }
    this.setLevel = function (value) {
        this.level += value;
        let hpInc = 0;
        let damInc = 0;
        let shieldInc = 0;
        if(this.type == 'human') {
            hpInc = 100;
            damInc = 10;
            shieldInc = 5;
        } else {
            hpInc = 50;
            damInc = 2;
            shieldInc = 2;
        }

        this.hp = this.maxhp = this.hp + value*hpInc;
        this.damage += this.level*damInc;
        this.shield += this.level*shieldInc;
    }
    this.attack = function (target) {
        if(this.damage >= target.shield) {
            target.hp -= this.damage - target.shield;
            console.log(`${this.name} 이(가) ${target.name} 을(를) 공격했다.`);
            console.log(`${this.name} 이(가) ${target.name}에게 ${this.damage - target.shield} 데미지를 입혔다.`);
        } else {
            console.log(`${this.name} 이(가) ${target.name} 을(를) 공격했다.`);
            console.log(`${this.name} 의 공격이 ${target.name}에게 먹히지 않는다!`);
        }
        if(target.hp<=0 && target.type != 'human') {
            let randIdx = parseInt(Math.random()*target.dropItems.length);
            console.debug(`${target.name} 을(를) 처치했다!`);
            console.debug(`"${target.dropItems[randIdx]}" 을(를) 얻었다!`);
            this.addBag(target.dropItems[randIdx]);
            target.die();
            this.getExp(target.exp);
            let rand = parseInt(Math.random()*100);
            if(rand%2==0) {
                console.debug(`일정 확률로 운 좋게 ${this.name} 의 체력을 ${rand} 만큼 회복했다!`);
                setTimeout(() => {
                    this.hp += rand;
                    if(this.hp>this.maxhp) this.hp = this.maxhp;
                }, 50);
            }
        } else {
            console.log(`${target.name} 의 체력이 ${target.hp} 남았다.`);
        }
        console.log(`================================================`);
    };
    this.die = function () {
        this.live = false;
    }
}

/* istanbul ignore next */
function Monster (baseData, dropItems=[]) {
    UnitBase.apply(this.__proto__, baseData);
    this.type = 'monster';
    this.dropItems = dropItems;
}

/* istanbul ignore next */
function Human (baseData, equipment=null) {
    UnitBase.apply(this.__proto__, baseData);
    this.type = 'human';
    this.money = 0;
    this.equipment = equipment;
    this.bag = [];
    this.addBag = function (items) {
        this.bag.push(items);
    }
    this.showBag = function () {
        console.log(`가방을 열었습니다. ${this.bag.length>0?`[ ${this.bag.join(', ')} ] 이 있습니다.`:`텅 비었습니다.`}`);
    }
}

function extend (child, parent) {
    child.prototype = new parent;
    child.prototype.constructor = parent;
}

extend(Monster, UnitBase);
extend(Human, UnitBase);

export {createUnitInfo, Monster, Human};