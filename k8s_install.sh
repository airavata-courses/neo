ansible-playbook -vvv -become --become-user=root -i inventory/$CLUSTER/hosts cluster.yml -b -v --limit ${CLUSTER}*
