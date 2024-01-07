from rest_framework import serializers
from .models import MyModel
from .models import Profile

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = '__all__'  # Wybierz pola, które chcesz uwzględnić

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['ID_uzytkownika', 'Zdjecie_profilowe', 'Data_urodzenia', 'Inne_informacje']