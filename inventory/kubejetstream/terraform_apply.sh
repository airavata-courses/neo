terraform apply -auto-approve -var-file=cluster.tfvars -var="cluster_name=$CLUSTER" -var="network_name=${CLUSTER}-network" ../../contrib/terraform/openstack
