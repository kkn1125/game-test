/**
 * @jest-environment jsdom
 */

import store from '../assets/utils/store';

describe('상태 관리 테스트', () => {
    test('값 저장', () => {
        function setValue (val) {
            store.data = val;
        }
        setValue(3);
        expect(store.data).toStrictEqual(3);
    });
    test('값 삭제', () => {
        function deleteKey (key) {
            delete store[key];
        }
        deleteKey('data');
        expect(store.data).toBeDefined();
    });
});