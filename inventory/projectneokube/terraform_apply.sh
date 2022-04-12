terraform -chdir=../../contrib/terraform/openstack apply -auto-approve -var-file=cluster.tfvars -var="cluster_name=$CLUSTER-cluster" -var="network_name=${CLUSTER}"
