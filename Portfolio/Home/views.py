from django.shortcuts import render
from django.http import HttpResponse

def Home(request):
    return render (request,"block/index.html")

def protfolio(request):
    return render (request,"protfolio/protfolio.html")