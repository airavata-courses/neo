# SSH key to use for access to nodes
public_key_path = "~/.ssh/id_rsa.pub"

# image to use for bastion, masters, standalone etcd instances, and nodes
image = "Featured-Ubuntu20"

# user on the node (ex. core on Container Linux, ubuntu on Ubuntu, etc.)
ssh_user = "ubuntu"

# 0|1 bastion nodes
number_of_bastions = 0

#flavor_bastion = "<UUID>"

# standalone etcds
number_of_etcd = 0

# masters
number_of_k8s_masters = 0

# Uncomment and set a previously created IP (or list) for the master nodes
k8s_master_fips = ["149.165.153.238"]

number_of_k8s_masters_no_etcd = 0

number_of_k8s_masters_no_floating_ip = 1

number_of_k8s_masters_no_floating_ip_no_etcd = 0

flavor_k8s_master = "4"

master_allowed_ports = [{"protocol" = "tcp", "port_range_min" = 80, "port_range_max" = 80, "remote_ip_prefix" = "0.0.0.0/0"}, {"protocol" = "tcp", "port_range_min" = 443, "port_range_max" = 443, "remote_ip_prefix" = "0.0.0.0/0"}]

# nodes
# for debugging purposes we can create nodes with floating ip
# in production better use nodes with no floating ip

number_of_k8s_nodes = 0

number_of_k8s_nodes_no_floating_ip = 2

flavor_k8s_node = "4"

# GlusterFS
# either 0 or more than one
#number_of_gfs_nodes_no_floating_ip = 0
#gfs_volume_size_in_gb = 150
# Container Linux does not support GlusterFS
#image_gfs = "<image name>"
# May be different from other nodes
#ssh_user_gfs = "ubuntu"
#flavor_gfs_node = "<UUID>"

# Jetstream 2
external_net = "3fe22c05-6206-4db2-9a13-44f04b6796e6"

# subnet_cidr = "<cidr>"

floatingip_pool = "public"

# list of availability zones available in your OpenStack cluster
# IU
az_list = ["nova"]
az_list_node = ["nova"]

bastion_allowed_remote_ips = ["0.0.0.0/0"]

# if you only access from a subset of IPs, set this accordingly for
# more security
k8s_allowed_remote_ips = ["0.0.0.0/0"]

# have Kubernetes traffic use the internal IP
use_access_ip = 0
