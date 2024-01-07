from django.db import models

class MyModel(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()


class Profile(models.Model):
    ID = models.AutoField(primary_key=True)
    ID_uzytkownika = models.IntegerField(unique=True)
    Zdjecie_profilowe = models.BinaryField()  # Użyj odpowiedniego typu pola dla danych binarnych
    Data_urodzenia = models.DateField()
    Inne_informacje = models.TextField()

    class Meta:
        db_table = 'profile'  # Nazwa tabeli w bazie danych
