from django.urls import path
from . import views

app_name="home"
urlpatterns = [
    path('',views.Home,name="home"),
    path('mrkc/',views.protfolio,name='protfolio'),
    path('contact/',views.contact,name="contact"),
    

]
