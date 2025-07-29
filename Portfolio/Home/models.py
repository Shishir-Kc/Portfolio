from django.db import models

# Create your models here.

class Contact(models.Model):
    name = models.CharField(verbose_name='user name')
    email = models.EmailField(verbose_name='user_mail')
    message = models.TextField(verbose_name='user_message!')

    class Meta:
        verbose_name = "contact"

    def __str__(self):
        return self.name