import { open, openSync } from 'fs';
import { O_NONBLOCK } from 'constants';

export const flagsIoctl = 3 | O_NONBLOCK;

export function devPath(path: string): string {
    return '/dev/' + path;
}

export function openIoctl(path: string, callback: (err: NodeJS.ErrnoException, fd: number) => void): void {
    open(devPath(path), flagsIoctl, callback);
}

export function openIoctlSync(path: string): number {
    return openSync(devPath(path), flagsIoctl);
}