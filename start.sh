#!/bin/bash
cd /home/salvocolonna/dynu
export NVM_DIR="/home/salvocolonna/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
npm run start:prod
