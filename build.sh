#!/bin/env bash

temp=`node util/get-token.js|jq .access_token`
temp="${temp%\"}"
token="${temp#\"}"

ACCESS_TOKEN="$token" yarn build
