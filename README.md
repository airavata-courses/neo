# Openstack VM and Kubernetes Configuration Deployment

## Steps for Setup

### Current Setup

Current Kubernetes consists of a Master and two worker nodes, IPs for all the nodes are as below:-

- **Master Node:- 149.165.153.238**
- **Worker Node 1:- 149.165.154.212**
- **Worker Node 2:- 149.165.154.213**

### Steps followed to create VMs on Openstack

1. Create an openrc file for authentication from [Jetstream2 Cloud Application Credentials](https://js2.jetstream-cloud.org/identity/application_credentials/)
  - Credentials used by Project Neo:- [openrc Credentials](https://js2.jetstream-cloud.org/identity/application_credentials/b11d6d65b39a4a25ab92a89a73eee032/detail/)
  - Open shell terminal and run `source [openrc file location]`
2. If SSH Private/Public key pair isn't present in your local, create it using ssh-keygen, it will be saved at [Key Pairs](https://js2.jetstream-cloud.org/project/key_pairs)
3. Create Floating Public IPs for all the Nodes using command:- `openstack floating ip create public`
4. Use the custom kubespray configuration branch present in Neo Repository for cluster deployment:-
  - `git clone https://github.com/airavata-courses/neo.git`
  - `git checkout feature-kubernetes-cluster-deployment-config`
  - `cd neo`
5. Execute terraform scripts by using existing inventory:-
  - `export CLUSTER=yourclustername`
  - `cp -r inventory/kubejetstream inventory/$CLUSTER`
  - `cd inventory/$CLUSTER`
6. Update cluster.tfvars file present in `inventory/$CLUSTER`
  - public_key_path
  - ssh_user
  - number_of_k8s_masters_no_floating_ip = 1
  - flavor_k8s_master = "4" for medium instance
  - number_of_k8s_nodes_no_floating_ip = 2
  - flavor_k8s_node = "4"
  - k8s_master_fips = ["149.165.153.238"]
7. Execute init and apply script using below command:-
  - bash terraform_init.sh
  - bash terraform_apply.sh
8. Access Instance using:-
  - ssh ubuntu@149.165.153.238
  
### Steps followed to setup Kubernetes Cluster

1. Change directory to root directory of repo
2. `pip install -r requirements.txt`
3. Update cluster values in `inventory/$CLUSTER/group_vars/all/all.yml` and `inventory/$CLUSTER/group_vars/k8s-cluster/k8s-cluster.yml`
4. bash k8s_install.sh
5. ssh ubuntu@149.165.153.238
  - sudo kubectl get pods
