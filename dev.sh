#!/bin/env bash

temp=`node get-token.js|jq .access_token`
temp="${temp%\"}"
token="${temp#\"}"

ACCESS_TOKEN="$token" yarn dev
