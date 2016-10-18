"use strict";
jest.mock('fs');
var index_1 = require('../index');
var constants_1 = require('constants');
var fs_1 = require('fs');
describe('open-ioctl', function () {
    describe('devPath', function () {
        it('returns the concatination of /dev/ and the given path', function () {
            expect(index_1.devPath('test/test_dev')).toBe('/dev/test/test_dev');
        });
    });
    describe('ioctlFlags', function () {
        it('is the union of ioctl (3) and none blocking modes', function () {
            expect(index_1.ioctlFlags).toEqual(3 | constants_1.O_NONBLOCK);
        });
    });
    describe('openIoctl', function () {
        it('opens a file based on /dev/ in ioctl, none blocking mode', function () {
            function callback(err, fd) {
                console.log(!err ? fd : err.message);
            }
            index_1.openIoctl('test/test_dev', callback);
            expect(fs_1.open).toBeCalledWith('/dev/test/test_dev', 3 | constants_1.O_NONBLOCK, callback);
        });
    });
    describe('openIoctlSync', function () {
        it('opens synchroniosly a file based on /dev/ in ioctl, none blocking mode', function () {
            fs_1.openSync.mockReturnValueOnce(9);
            expect(index_1.openIoctlSync('test/test_dev')).toBe(9);
            expect(fs_1.openSync).toBeCalledWith('/dev/test/test_dev', 3 | constants_1.O_NONBLOCK);
        });
    });
});
