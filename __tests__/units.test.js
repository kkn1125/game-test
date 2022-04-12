/**
 * @jest-environment jsdom
 */

 import * as Units from '../src/scripts/core/Units';

describe('유닛 테스트', () => {

    test('인간 종족 테스트', () => {
        const data = {
            name: 'kimson',
            hp: 500,
            mp: 50,
            x: 300,
            y: 350,
            size: 50,
            damage: 80,
            exp: 0,
        }
        const info = Units.createUnitInfo(data);
        const h1 = new Units.Human(info, 'fist');
        expect(h1.name).toStrictEqual('kimson');
        expect(h1.damage).toStrictEqual(80);
        expect(h1.equipment).toStrictEqual('fist');
    });

    test('몬스터 종족 테스트', () => {
        const data = {
            name: 'coco',
            hp: 100,
            mp: 25,
            x: 300,
            y: 350,
            size: 50,
            damage: 2,
            exp: 0,
        }
        const info = Units.createUnitInfo(data);
        const m1 = new Units.Monster(info, ['coco farm', '150won']);
        expect(m1.name).toStrictEqual('coco');
        expect(m1.hp).toStrictEqual(100);
        expect(m1.mp).toStrictEqual(25);
        expect(m1.dropItems[0]).toStrictEqual('coco farm');
        expect(m1.damage).toStrictEqual(2);
    });
    
});