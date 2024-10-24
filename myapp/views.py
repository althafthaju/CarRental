from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return HttpResponse("Welcome to the Car Rental Service")

def about(request):
    return HttpResponse("About the Car Rental Service")