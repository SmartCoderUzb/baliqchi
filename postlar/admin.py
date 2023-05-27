from django.contrib import admin

from .models import Kategoriya, URL, Post

admin.site.register(Kategoriya)
admin.site.register(URL)
admin.site.register(Post)