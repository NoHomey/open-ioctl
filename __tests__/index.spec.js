"use strict";
jest.mock('fs');
jest.mock('constants');
var index_1 = require('../index');
describe('open-ioctl', function () {
    describe('devPath', function () {
        it('returns the concatination of /dev/ and the given path', function () {
            expect(index_1.devPath('test/test_dev')).toBe('/dev/test/test_dev');
        });
    });
});
