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

class Team(models.Model):
    name = models.CharField(max_length=255)
    shortname = models.CharField(max_length=255)
    tla = models.CharField(max_length=3)
    crest = models.URLField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    website = models.URLField(max_length=255, blank=True, null=True)
    founded = models.IntegerField(null=True, blank=True)
    clubcolors = models.CharField(max_length=50, blank=True, null=True)
    venue = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'teams' 

class Player(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=200)
    dateofbirth = models.DateField()
    nationality = models.CharField(max_length=200)
    fieldposition = models.CharField(max_length=200)
    shirtnumber = models.IntegerField()
    additionalinfo = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'players'

class Competition(models.Model):
    name = models.CharField(max_length=255)
    emblem = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'competitions'

class Match(models.Model):
    hometeam = models.ForeignKey(Team, related_name='home_matches', on_delete=models.CASCADE, db_column='hometeamid')
    awayteam = models.ForeignKey(Team, related_name='away_matches', on_delete=models.CASCADE, db_column='awayteamid')
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, db_column='competitionid')
    matchday = models.IntegerField()
    venue = models.CharField(max_length=100)
    awayteamgoals = models.IntegerField()
    hometeamgoals = models.IntegerField()
    minutes = models.IntegerField()
    matchtime = models.DateTimeField()
    matchdate = models.DateField()

    class Meta:
        db_table = 'match'

class Lineup(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    position = models.CharField(max_length=50)
    class Meta:
        db_table = 'lineups'

class TeamsCompetitions(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)  # Poprawione
    class Meta:
        db_table = 'teams_competitions'