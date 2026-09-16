#!/bin/bash
set -e

# 1. Запуск юнит-тестов перед деплоем (если упадут, скрипт остановится)
# pytest  # или python manage.py test / dotnet test

rsync -avz --exclude='.git' --exclude='__pycache__' --exclude='node_modules' ./ root@46.224.80.50:/alimqq-responsive/code/

ssh root@46.224.80.50 "sudo systemctl restart alimqq.service"