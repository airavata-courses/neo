#!/bin/bash

kubectl apply -f mongo-neo/db-secrets.yaml
kubectl apply -f mongo-neo/db-pv.yaml
kubectl apply -f mongo-neo/db-pvc.yaml

./deploy.sh