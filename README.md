# open-ioctl

Opens device file in non-blocking ioctl mode only

[![npm version](https://badge.fury.io/js/open-ioctl.svg)](https://badge.fury.io/js/open-ioctl)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NoHomey/open-ioctl)
[![Build Status](https://semaphoreci.com/api/v1/nohomey/open-ioctl/branches/master/badge.svg)](https://semaphoreci.com/nohomey/open-ioctl)
[![Code Climate](https://codeclimate.com/github/NoHomey/open-ioctl/badges/gpa.svg)](https://codeclimate.com/github/NoHomey/open-ioctl)
[![Test Coverage](https://codeclimate.com/github/NoHomey/open-ioctl/badges/coverage.svg)](https://codeclimate.com/github/NoHomey/open-ioctl/coverage)
[![Issue Count](https://codeclimate.com/github/NoHomey/open-ioctl/badges/issue_count.svg)](https://codeclimate.com/github/NoHomey/open-ioctl)
![TypeScript](https://img.shields.io/badge/%3C%20%2F%3E-TypeScript-blue.svg)
![Typings](https://img.shields.io/badge/typings-%E2%9C%93-brightgreen.svg)

# Installation

Install with npm:

```bash
$ npm install open-ioctl
```

[![NPM](https://nodei.co/npm/open-ioctl.png?downloads=true&stars=true)](https://nodei.co/npm/open-ioctl/)

# Description

Opening ioctl only device drivers made easy.

Opens device file in non-blocking ioctl mode. File is opend with flags 3 | O_NONBLOCK.

Flag 3 means that only ioctl calls can be made for comunication with the device driver (remember read/write operations are expensive this is why open-ioctl was made in first place to make it easer for performance and command oriented device drivers).

Flag O_NONBLOCK means that ioctl calls will not put process and thread from which they came to sleep.

# Warning

## O_NONBLOCK

O_NONBLOCK: flag is different compared to O_ASYNC (which is recomended to use only in rear an special cases, also you have no access to it in node).
O_NONBLOCK means that all syscalls respectivly ioctl calls will not put the process and thread from which they were made to sleep while the result is awaited. This is perfect for in node process call so no even loop block will occure.

O_ASYNC can't be used on regular device files only terminals, sockets and pipes also it's not exported in fs.constants from the 'fs' module with a reason! For more information see: Posix open(2), open(3).

# Usage

## openIoctl(path, callback)

- path \<String\>
- callback \<Function\>

### path is based on /dev

The callback gets two arguments (err, fd).

- err \<ErrnoException\>
- fd \<Integer\>

```javascript
const { openIoctl } = require('open-ioctl');
const { close } = require('fs');
openIoctl('test_dev', function(err, fd) { // /dev/test_dev
  if(err) {
    console.log(err);
  } else {
    console.log(fd);
    /* ioctl calls */
    close(fd, function(err) {
      if(err) {
        console.log(err);
      }
    });
  }
});
```

## openIoctlSync(path)

- path \<String\>

Synchronous version of openIoctl(). Returns an integer representing the file descriptor \<Integer\>.

```javascript
const { openIoctlSync } = require('open-ioctl');
const { closeSync } = require('fs');
var fd = openIoctlSync('test/test_dev'); // /dev/test/test_dev
console.log(fd);
/* ioctl calls */
closeSync(fd);
```

## open device file located outside of /dev

```javascript
const { openIoctlSync } = require('open-ioctl');
const { closeSync } = require('fs');
var fd = openIoctlSync('../proc/some_dev'); // /proc/some_dev
console.log(fd);
/* ioctl calls */
closeSync(fd);
```

# For full working example code visit: (https://github.com/NoHomey/nodejs-ioctl-example)

# Written in TypeScript and TypeScript Ready!



