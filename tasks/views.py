from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import TaskSerializer
from .models import Task

# Create your views here.


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]

    # 👇 Esta parte es la que asocia la tarea con el usuario autenticado
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # 👇 Esto hace que cada usuario vea solo sus propias tareas
    # def get_queryset(self):
    #     return Task.objects.filter(user=self.request.user)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })
