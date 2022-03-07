#!/bin/bash

kubectl scale --replicas=3 -f auth-service/auth-service-deployment.yaml
kubectl scale --replicas=3 -f data-service/data-service-deployment.yaml
kubectl scale --replicas=3 -f database-service/database-service-deployment.yaml
kubectl scale --replicas=3 -f gateway/gateway-deployment.yaml
kubectl scale --replicas=3 -f metadata-service/metadata-service-deployment.yaml
kubectl scale --replicas=3 -f Neo-FE/fe-deployment.yaml
kubectl scale --replicas=3 -f registry-service/registry-service-deployment.yaml
kubectl scale --replicas=3 -f user-register-service/user-register-service-deployment.yaml
