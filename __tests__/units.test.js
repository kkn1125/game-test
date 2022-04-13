/**
 * @jest-environment jsdom
 */

 import { Ability, Status } from '../assets/modules/units/base/BaseSetting';
import { BaseUnit, Human } from '../assets/modules/units/Units';

describe('유닛 테스트', () => {

    test('테스트 연결 확인', () => {
        expect(0).toBe(0);
    });

    test('플레이어 생성 테스트', () => {
        const status = Status.createStatus(5, 5, 5, 5);
        const ability = Ability.createAbility(5, 0, 1);
        const BaseUnitInfo = BaseUnit.createBaseUnit('kimson', 1, 0, 300, 50, 300, 50, ability, status);
        const HumanInfo = Human.createHuman({
            head: null,
            body: null,
            pants: null,
            hand: null,
            foot: null,
        }, [], 0, true);

        expect(new Human(BaseUnitInfo, HumanInfo).name).toStrictEqual('kimson');
    });
    
});