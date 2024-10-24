from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from rest_framework.decorators import action
from myapp.models import Customer, Car, Rental, Payment
from .serializers import CustomerSerializer, CarSerializer, RentalSerializer, PaymentSerializer


#views contains all the api endpoints and how they work and the logic behind them
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Anyone can register

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        # Validate required fields
        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = User.objects.create_user(username=username, password=password, email=email)

        # Generate JWT tokens for the new user
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    @action(detail=False, methods=['get'])
    def available(self, request):
        available_cars = Car.objects.filter(available=True)
        serializer = self.get_serializer(available_cars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer

    @action(detail=True, methods=['post'])
    def return_car(self, request, pk=None):
        rental = self.get_object()
        rental.return_car()
        return Response({'status': 'car returned'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def process_payment(self, request, pk=None):
        rental = self.get_object()
        amount = request.data.get('amount')
        payment_method = request.data.get('payment_method', 'Demo Payment Method')

        if not amount:
            return Response({'error': 'Amount is required.'}, status=status.HTTP_400_BAD_REQUEST)

        rental.process_payment(amount, payment_method)
        return Response({'status': 'payment processed'}, status=status.HTTP_200_OK)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

