#sed 's/10\.0\.0\.[[:digit:]]\+/'"$IP/g" inventory/$CLUSTER/artifacts/admin.conf > $HOME/.kube/config
sed -i 's/10\.0\.0\.[[:digit:]]\+/'"$IP/g" inventory/$CLUSTER/artifacts/admin.conf #> $HOME/.kube/config
