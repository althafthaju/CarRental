from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, CustomerViewSet, CarViewSet, RentalViewSet, PaymentViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

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
