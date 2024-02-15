#!/bin/bash
export NVM_DIR="/home/salvocolonna/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

PROJDIR=/home/salvocolonna/dynu
cd $PROJDIR
npm run start:prod