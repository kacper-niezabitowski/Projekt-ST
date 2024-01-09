from django.contrib import admin
from .models import Team, Player, Match, Lineup, Competition, TeamsCompetitions

admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Match)
admin.site.register(Lineup)
admin.site.register(Competition)
admin.site.register(TeamsCompetitions)
