from django.db import models
from django.contrib.auth.models import User

class Permission(models.Model):
    """
    Permission

    Designates the permission level of the object, meaning who can see it
    """
    permission = models.CharField(max_length = 20) # i.e.: read, write, delete, etc
    level = models.CharField(max_length = 20) # i.e.: group, world, user, involvedusers, etc
    use_acls = models.BooleanField(default = False)
    invert_acls = models.BooleanField(default = False)
    model = models.CharField(max_length = 50)
    object_id = models.IntegerField()
    active = models.BooleanField(default = True)

class PermissionChangeRequest(models.Model):
    """
    Permission change request

    Designates a request to change permisisons of an object owned by multiple
    people (so as to give others the opportunity to veto.
    """
    permission = models.ForeignKey('Permission')
    owner = models.ForeignKey(User)
    discussion = models.TextField(blank = True)

class AclEntry(models.Model):
    """
    ACL

    Designates an actual implementation of an ACL permission for a user and
    object so that owners can specify who has what access to what item.
    """
    permission = models.ForeignKey('Permission')
    user = models.ForeignKey(User)
