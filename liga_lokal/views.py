from rest_framework import viewsets
from .models import MyModel
from .serializers import MyModelSerializer
from django.shortcuts import render
from .models import Profile
from rest_framework.generics import ListAPIView
from .serializers import ProfileSerializer

class MyModelViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

def profile_list(request):
    profiles = Profile.objects.all()  # Pobieranie wszystkich profili
    return render(request, 'profile_list.html', {'profiles': profiles})

class ProfileListView(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer