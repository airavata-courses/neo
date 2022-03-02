#!/bin/bash

kubectl delete deployments --ignore-not-found=true auth-service-deploy data-service-deploy database-service-deploy gateway-deploy metadata-service-deploy mongo-deployment fe-deploy registry-service-deploy user-register-service-deploy
kubectl delete services --ignore-not-found=true user-register-service registry-service fe mongo-neo metadata-service gateway database-service data-service auth-service

echo '\nDeploy Mongo\n'
kubectl apply -f mongo-neo/mongo-neo-service.yaml
kubectl apply -f mongo-neo/mongo-neo-deployment.yaml

echo '\nDeploy Auth Service\n'
kubectl apply -f auth-service/auth-service.yaml
kubectl apply -f auth-service/auth-service-deployment.yaml

echo '\nDeploy Data Service\n'
kubectl apply -f data-service/data-service.yaml
kubectl apply -f data-service/data-service-deployment.yaml

echo '\nDeploy Database Service\n'
kubectl apply -f database-service/database-service.yaml
kubectl apply -f database-service/database-service-deployment.yaml

echo '\nDeploy Gateway\n'
kubectl apply -f gateway/gateway-service.yaml
kubectl apply -f gateway/gateway-deployment.yaml

echo '\nDeploy Metadata Service\n'
kubectl apply -f metadata-service/metadata-service.yaml
kubectl apply -f metadata-service/metadata-service-deployment.yaml

echo '\nDeploy Registry Service\n'
kubectl apply -f registry-service/registry-service.yaml
kubectl apply -f registry-service/registry-service-deployment.yaml

echo '\nDeploy User Register Service\n'
kubectl apply -f user-register-service/user-register-service.yaml
kubectl apply -f user-register-service/user-register-service-deployment.yaml

echo '\nDeploy User FE\n'
kubectl apply -f Neo-FE/fe-service.yaml
kubectl apply -f Neo-FE/fe-deployment.yaml
