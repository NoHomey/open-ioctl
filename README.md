# open-ioctl

Opens device file in non-blocking ioctl mode only

# Installation

Install with npm:

```bash
$ npm install open-ioctl
```

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

# Written in TypeScript and TypeScript Ready!



