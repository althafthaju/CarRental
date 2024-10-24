from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, CustomerViewSet, CarViewSet, RentalViewSet, PaymentViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#router paths have all the api endpoints like /api/customers, /api/cars, /api/rentals, /api/payments
#and you can use GET, POST, PUT, DELETE methods on these endpoints
router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'cars', CarViewSet)
router.register(r'rentals', RentalViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
