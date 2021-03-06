from .api import AssignmentViewSet, AssignmentAssignViewSet, ViewAssignedAssignmentToStudent, GradedAssignmentViewSet
from rest_framework import routers
from django.urls import path, include

"""
router = routers.DefaultRouter()
router.register('api/quizz', QuizzViewSet, 'Quizz')
urlpatterns = router.urls
"""
router = routers.DefaultRouter()
router.register('api/assignment', AssignmentViewSet, 'assignment'),
router.register('api/assignment_assign',
                AssignmentAssignViewSet, 'assignment_assign')
router.register('api/assignment_view',
                ViewAssignedAssignmentToStudent, 'assignment_view')

router.register('api/graded',
                GradedAssignmentViewSet, 'graded')
urlpatterns = router.urls
