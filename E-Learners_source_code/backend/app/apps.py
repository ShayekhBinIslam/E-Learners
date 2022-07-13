from django.apps import AppConfig


class AppConfig(AppConfig):
  """Configuration of the app

  Args:
      AppConfig (_type_): _description_
  """
  default_auto_field = "django.db.models.BigAutoField"
  name = "app"
  
