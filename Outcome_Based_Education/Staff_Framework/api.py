from .serializers import AssignmentSerializer, AssignAssignmentSerializer, GradedAssignmentSerializer
from .models import Assignment, Assignment_Assign_To_Student, GradedAssignment
from rest_framework import viewsets, permissions, generics
from Accounts.permissions import IsTeacherUser, IsStudentUser
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)


class AssignmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        return self.request.user.teacher_create.all()

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)

    def get_permissions(self):

        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsTeacherUser]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsTeacherUser]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsTeacherUser]
        return [permission() for permission in permission_classes]

# assignment assign viewset


class AssignmentAssignViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AssignAssignmentSerializer
    queryset = Assignment_Assign_To_Student.objects.all()

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsTeacherUser]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsTeacherUser]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsTeacherUser]
        return [permission() for permission in permission_classes]


# only assigned assignment to student can be viewed by particular student

class ViewAssignedAssignmentToStudent(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AssignAssignmentSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Assignment_Assign_To_Student.objects.filter(student_name=user)

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list':
            permission_classes = [IsStudentUser]
        return [permission() for permission in permission_classes]


class GradedAssignmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = GradedAssignmentSerializer

    def get_queryset(self):
        return self.request.user.student_create.all()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

    def get_permissions(self):

        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsStudentUser]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsStudentUser]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsStudentUser]
        return [permission() for permission in permission_classes]
