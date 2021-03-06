scrum-board
===========

An analogue digital scrumboard. You can find a demo [here](http://scrummie.meteor.com)

## Run in development

    $> MONGO_URL='mongodb://localhost:27017/scrumboard' meteor --settings=scrummie.json

## Bundle

    $> cd .gulp
    $.gulp> gulp styles
    $> cd ..
    $> meteor bundle scrummie.tgz

    # unpack on destination
    $> cd bundle

    # rebuild native packages
    $> rm -rf programs/server/node_modules/fibers
    $> npm install fibers@1.0.1

    # setup environment variables (METEOR_SETTINGS is optional)
    $> export MONGO_URL='mongodb://localhost/scrummie'
    $> export ROOT_URL='http://localhost:3000'
    $> export PORT=3000
    $> export METEOR_SETTINGS="`cat scrummie.json`"
    $> node main.js

    # if wrong version of node
    $> sudo npm install n -g
    $> sudo n 0.10.26   // This will give you the specific version
    
## With ROOT_URL

    $> export ROOT_URL=http://localhost:3000/scrummie
    
If scrummie runs behind a reverse-proxy, the public url needs to be defined in scrummie.json

    baseUrl: 'http://localhost/scrummie'
    
ROOT_URL === baseUrl

## URL parameters

### Task colors

Create post-its with default colors (only if no colors are defined)
Examples:

    http://scrummie.meteor.com?colors=ffff92
    http://scrummie.meteor.com?colors=ffff92,232345
    http://scrummie.meteor.com?colors=Backend,Front

### Initials

Automatically add initials when moving a post-it from one lane to the other (only if no initials are set yet)
Examples:

    http://scrummie.meteor.com?member=Lucas
    http://scrummie.meteor.com?member=LC

### Reset deployed application

    $> meteor deploy test.meteor.com --delete
    $> meteor deploy test.meteor.com

# linux startup script

    #!/bin/sh -e

    case "${1}" in
        status)
            echo -n "Status ${DESC}: "
            echo TODO
	          ;;
        start)
            echo -n "Starting ${DESC}: "
            su - ubuntu -c 'nohup /mnt/scrummie/run &'
            ;;
        stop)
            echo -n "Stopping ${DESC}: "
            echo TODO
            ;;
        restart|force-reload)
            echo -n "Restarting ${DESC}: "
            echo TODO
            ;;
        *)
            echo "Usage: /etc/init.d/${NAME} {status|start|stop|restart|force-reload
    }" >&2
        exit 1
        ;;
    esac

    exit 0
    
# Application Configuration

TODO

Example scrummie.json:

    {
        "loglevel": "info",
        "hipchat": {
          "message": "{{member.name}} finished task <a href='{{url}}/{{project}}/task/{{task._id}}'>{{task.title}}</a>"
        },
        "github": {
          "clientId": "*******",
          "clientSecret": "******************"
        },
        "appName": "Scrummie",
        "uploadFolder": ".uploads",
        "host": {
            "domain": "localhost",
            "port": "3000"
        },
        "url": "localhost",
    }


 development:
 
    $> mrt --settings=scrummie.json

 production (bundled version):
 
    $> export METEOR_SETTINGS="`car scrummie.json`"


Resources:

  * http://stackoverflow.com/questions/21324716/db-not-defined-error-in-mongodb-using-meteor-js/21325934#21325934


Interesting:

  * http://www.manuel-schoebel.com/blog/iron-router-tutorial
  * http://stackoverflow.com/questions/18520550/meteor-pass-data-to-nested-templates
  * https://www.andrewmunsell.com/blog/introduction-to-realtime-web-meteor-and-nodejs
  * https://github.com/aknuds1/example-meteor-and-ng-app
  * http://projectricochet.com/blog/meteor-js-performance#.UzCGAK1dXno
  * https://www.eventedmind.com/feed/meteor-ironrouter
  * https://www.eventedmind.com/feed/meteor-introducing-deps
  * https://www.eventedmind.com/feed/
  * http://meteorhacks.com/complete-npm-integration-for-meteor.html
  * Fast renderer
    * http://meteorhacks.com/introducing-fast-render.html
    * http://meteorhacks.com/fast-render-internals-and-how-it-works.html
  * http://github.differential.io/reststop2/
  * https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md
  * http://meteorhacks.com/fibers-eventloop-and-meteor.htmlre
  * Async stuff:
    * http://meteorhacks.com/improved-async-utilities-in-meteor-npm.html
  * Logging - https://www.npmjs.org/package/winston
