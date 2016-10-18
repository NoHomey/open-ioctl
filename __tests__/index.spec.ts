jest.mock('fs');
import { devPath, ioctlFlags, openIoctl, openIoctlSync } from '../index';
import { O_NONBLOCK } from 'constants';
import { open, openSync } from 'fs';

describe('open-ioctl', () => {
    describe('devPath', () => {
        it('returns the concatination of /dev/ and the given path', () => {
            expect(devPath('test/test_dev')).toBe('/dev/test/test_dev');
        });
    });

    describe('ioctlFlags', () => {
        it('is the union of ioctl (3) and none blocking modes', () => {
            expect(ioctlFlags).toEqual(3 | O_NONBLOCK);
        });
    });

    describe('openIoctl', () => {
        it('opens a file based on /dev/ in ioctl, none blocking mode', () => {
            function callback(err: NodeJS.ErrnoException, fd: number): void {
                console.log(!err ? fd : err.message);
            }

            openIoctl('test/test_dev', callback);
            expect(open).toBeCalledWith('/dev/test/test_dev', 3 | O_NONBLOCK, callback);
        });
    });

    describe('openIoctlSync', () => {
        it('opens synchroniosly a file based on /dev/ in ioctl, none blocking mode', () => {
            (openSync as jest.Mock<(path: string, mode: number) => number>).mockReturnValueOnce(9);
            expect(openIoctlSync('test/test_dev')).toBe(9);
            expect(openSync).toBeCalledWith('/dev/test/test_dev', 3 | O_NONBLOCK);
        });
    });
});