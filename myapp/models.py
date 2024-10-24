from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.exceptions import ValidationError


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(max_length=200)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField()

    def __str__(self):
        return self.user.username


class Car(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    license_plate = models.CharField(max_length=15, unique=True)
    brand = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    daily_rental_rate = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='car_images/', null=True, blank=True)

    def __str__(self):
        return f"{self.brand} {self.name} ({self.year})"


class Rental(models.Model):
    id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    rental_date = models.DateTimeField(default=timezone.now)
    return_date = models.DateTimeField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='Pending')

    def clean(self):
        if self.return_date <= self.rental_date or (self.return_date - self.rental_date).days > 1:
            raise ValidationError("The car can only be rented for a maximum of one day.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def return_car(self):
        self.car.available = True
        self.car.save()
        self.status = 'Returned'
        self.save()

    def process_payment(self, amount, payment_method):
        Payment.objects.create(
            rental=self,
            amount=amount,
            payment_method=payment_method
        )
        self.status = 'Paid'
        self.save()

    def __str__(self):
        return f"Rental of {self.car} by {self.customer}"


class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    rental = models.ForeignKey(Rental, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(default=timezone.now)
    payment_method = models.CharField(max_length=50)

    def __str__(self):
        return f"Payment of {self.amount} for rental {self.rental.id} on {self.payment_date}"
