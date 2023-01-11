from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import UserChangeForm, UserCreationForm


class CustomUserAdmin(UserAdmin):

    # form = UserChangeForm
    # add_form = UserCreationForm

    list_display = ('email',)
    list_filter = ('is_superuser', 'is_active')
    fieldsets = (
        ('Details', {'fields': ('first_name',
         'last_name', 'email', 'password')}),
        ('Access', {'fields': ('is_active', 'is_staff',
         'is_superuser', 'user_permissions', 'groups')}),
    )
    add_fieldsets = (
        ('Details', {'fields': ('first_name',
         'last_name', 'email', 'password1','password2')}),
        ('Access', {'fields': ('is_active', 'is_staff',
         'is_superuser', 'user_permissions', 'groups')}),
    )
    search_fields = ('email',)
    ordering = ('email',)
    # filter_horizontal = ()


User = get_user_model()

admin.site.register(User, CustomUserAdmin)

# admin.site.register(User)
