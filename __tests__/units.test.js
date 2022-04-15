/**
 * @jest-environment jsdom
 */

import * as SampleItem from "../assets/modules/units/sample/__Items.js";
import * as SampleStatus from "../assets/modules/units/sample/__status.js";
import * as SampleUnit from "../assets/modules/units/sample/__Units.js";
import { Human } from "../assets/modules/units/Units.js";

const h1 = SampleUnit.human;

h1.showStatus();
h1.showAbility();
h1.jump();
h1.attack();

describe('유닛 테스트', () => {

    test('테스트 연결 확인', () => {
        expect(h1).toBeDefined();
    });

    test('플레이어 생성 테스트', () => {
        expect(new Human(SampleUnit.baseUnitInfo, SampleUnit.humanInfo).name).toStrictEqual('kimson');
    });

    test('플레이어 레벨업 테스트', () => {
        h1.levelUp();
        expect(h1.level).toStrictEqual(2);
    });

    test('플레이어 죽음 테스트', () => {
        h1.die();
        expect(h1.live).toBeFalsy();
    });

    test('플레이어 이동 테스트', () => {
        h1.move(1);
        expect(h1.x).toStrictEqual(1);
        h1.move(-2);
        expect(h1.x).toStrictEqual(-1);
    });

    test('플레이어 농부 생성 테스트', () => {
        expect(new Human(SampleUnit.baseUnitInfo, SampleUnit.humanInfo).name).toStrictEqual('kimson');
    });

});