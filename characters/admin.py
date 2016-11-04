from django.contrib import admin
from characters.models import (
    Character,
    Description,
    Location,
    Morph,
    SpeciesCategory,
)

admin.site.register(Character)
admin.site.register(Morph)
admin.site.register(Description)
admin.site.register(Location)
admin.site.register(SpeciesCategory)
