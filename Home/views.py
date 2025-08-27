from django.shortcuts import render , redirect
from . import models
from django.contrib import messages
def Home(request):
    return render (request,"block/index.html")

def protfolio(request):
    return render (request,"protfolio/protfolio.html")


def contact(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        data = models.Contact.objects.create(name=name,email=email,message=message)
        data.save()
        messages.success(request,"Recived your Interest ! ,")
        return redirect('home:protfolio')
        