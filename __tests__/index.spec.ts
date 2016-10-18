jest.mock('fs');
jest.mock('constants');
import { devPath } from '../index';

describe('open-ioctl', () => {
    describe('devPath', () => {
        it('returns the concatination of /dev/ and the given path', () => {
            expect(devPath('test/test_dev')).toBe('/dev/test/test_dev');
        });
    });
});