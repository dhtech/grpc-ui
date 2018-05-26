#!/usr/bin/env bash

env GOOS=windows GOARCH=amd64 go build -ldflags -H=windowsgui
env GOOS=linux GOARCH=amd64 go build -o grpc-ui-linux
env GOOS=freebsd GOARCH=amd64 go build -o grpc-ui-freebsd
env GOOS=darwin GOARCH=amd64 go build -o grpc-ui-macosx