from rest_framework import models

class MyModel(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
