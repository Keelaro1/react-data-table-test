# react-data-table-test

Test task of creating a table with basic table functionality

The task was taken from - https://github.com/fugr-ru/frontend-javascript-test

Docker image link: https://hub.docker.com/repository/docker/keelaro1/reacttable/general

# Usage

## dev

yarn start

## prod

docker pull keelaro1/reacttable
docker run -d -p 3000:80 --rm --name reacttable-c keelaro1/reacttable
open browser at port 3000