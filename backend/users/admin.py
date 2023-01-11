from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import UserChangeForm, UserCreationForm


class CustomUserAdmin(UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('email',)
    list_filter = ('is_superuser','is_active')
    fieldsets = (
        (None, {'fields': ('first_name', 'last_name', 'is_active',
         'is_staff', 'is_superuser', 'email', 'password')}),
    )
    add_fieldsets = (
        (None, {'fields': ('first_name', 'last_name', 'is_active',
         'is_staff', 'is_superuser', 'email', 'password1', 'password2')}),
    )
    search_fields = ('email',)
    ordering = ('email',)
    # filter_horizontal = ()


User = get_user_model()

admin.site.register(User, CustomUserAdmin)

# admin.site.register(User)
