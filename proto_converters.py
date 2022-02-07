def protobuf_to_dict(proto_obj):
    key_list = proto_obj.DESCRIPTOR.fields_by_name.keys()
    d = {}
    for key in key_list:
        d[key] = getattr(proto_obj, key)
    return d