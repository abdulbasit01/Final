import datetime

from django.db import models
from django.utils import timezone
from Accounts.models import User
from Chairman_Framework.models import CLO


class Assignment(models.Model):
    title = models.CharField(max_length=200, null=True)
    teacher = models.ForeignKey(
        User, related_name="teacher_create", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    question_text = models.CharField(max_length=200, null=True)
    quizz = models.ForeignKey(Assignment, on_delete=models.CASCADE, null=True)
    clo = models.ForeignKey(CLO, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
    choice_text = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.choice_text



class Assignment_Assign_To_Student(models.Model):
    student_name = models.ManyToManyField(User)
    assignment = models.ManyToManyField(Assignment)



class GradedAssignment(models.Model):
    student = models.ForeignKey(
        User, related_name="student_create", on_delete=models.CASCADE, null=True)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.SET_NULL, blank=True, null=True)



class Response(models.Model):
    graded=models.ForeignKey(GradedAssignment, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.CharField(max_length=200)

    def __str__(self):
        return self.answer_text