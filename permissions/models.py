from django.db import models

class Permission(models.Model):
    """
    Permission

    Designates the permission level of the object, meaning who can see it
    """
    pass

class PermissionChangeRequest(models.Model):
    """
    Permission change request

    Designates a request to change permisisons of an object owned by multiple
    people (so as to give others the opportunity to veto.
    """
    pass

class AclPermission(models.Model):
    """
    ACL permission

    Designates a per-user permission for an item so that owners can specify
    permissions on an individual basis
    """
    pass

class Acl(models.Model):
    """
    ACL

    Designates an actual implementation of an ACL permission for a user and
    object.
    """
    pass
