from django.urls import path
from . import views
urlpatterns = [
    path('',views.Home,name="home"),
    path('mrkc/',views.protfolio,name='protfolio'),

]
