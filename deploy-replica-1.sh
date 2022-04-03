#!/bin/bash

kubectl scale --replicas=1 -f auth-service/auth-service-deployment.yaml
kubectl scale --replicas=1 -f data-service/data-service-deployment.yaml
kubectl scale --replicas=1 -f database-service/database-service-deployment.yaml
kubectl scale --replicas=1 -f gateway/gateway-deployment.yaml
kubectl scale --replicas=1 -f metadata-service/metadata-service-deployment.yaml
kubectl scale --replicas=1 -f Neo-FE/fe-deployment.yaml
kubectl scale --replicas=1 -f registry-service/registry-service-deployment.yaml
kubectl scale --replicas=1 -f user-register-service/user-register-service-deployment.yaml
