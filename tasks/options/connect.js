// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
module.exports = {
    localhost: {
        options: {
            port: 9666,
            keepalive: true,
            open: {
                target: 'http://localhost:9666/index.html'
            },
            hostname: 'localhost'
        }
    }
};