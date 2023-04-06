#!/bin/bash
cd /home/ec2-user/mzplatform-learn
yarn install
yarn build
pm2 delete all
pm2 start yarn -w -i 0 --name "next" -- start
sudo systemctl restart nginx