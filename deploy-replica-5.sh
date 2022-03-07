#!/bin/bash

kubectl scale --replicas=5 -f auth-service/auth-service-deployment.yaml
kubectl scale --replicas=5 -f data-service/data-service-deployment.yaml
kubectl scale --replicas=5 -f database-service/database-service-deployment.yaml
kubectl scale --replicas=5 -f gateway/gateway-deployment.yaml
kubectl scale --replicas=5 -f metadata-service/metadata-service-deployment.yaml
kubectl scale --replicas=5 -f Neo-FE/fe-deployment.yaml
kubectl scale --replicas=5 -f registry-service/registry-service-deployment.yaml
kubectl scale --replicas=5 -f user-register-service/user-register-service-deployment.yaml
