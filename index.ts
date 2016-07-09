/// <reference path="typings/globals/node/index.d.ts" />
import { open, openSync } from 'fs';
import { O_NONBLOCK } from 'constants';
import { join } from 'path';

const flagsIoctl = 3 | O_NONBLOCK;

function devPath(path: string): string {
    return join('/dev', path);
}

function openIoctl(path: string, callback: (err: NodeJS.ErrnoException, fd: number) => void): void {
    open(devPath(path), flagsIoctl, callback);
}

function openIoctlSync(path: string): number {
    return openSync(devPath(path), flagsIoctl);
}

export { openIoctl, openIoctlSync };