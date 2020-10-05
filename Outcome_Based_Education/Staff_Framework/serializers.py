from Chairman_Framework.serializers import CLOSerializer
from rest_framework import serializers
from .models import Choice, Question, Assignment, Assignment_Assign_To_Student, GradedAssignment,Response
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


# read below blog if any confusion
# https://medium.com/@raaj.akshar/creating-reverse-related-objects-with-django-rest-framework-b1952ddff1c

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('choice_text',)


class QuestionSerializer(serializers.ModelSerializer):

    choice_set = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = '__all__'

    def create(self, validated_data):
        choice_validated_data = validated_data.pop('choice_set')
        question = Question.objects.create(**validated_data)
        choice_set_serializer = self.fields['choice_set']
        for each in choice_validated_data:
            each['question'] = question
        choices = choice_set_serializer.create(choice_validated_data)
        return question


class AssignmentSerializer(serializers.ModelSerializer):

    question_set = QuestionSerializer(many=True)

    class Meta:
        model = Assignment
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        question_validated_data = validated_data.pop('question_set')
        quizz = Assignment.objects.create(**validated_data)
        print(quizz)
        question_set_serializer = self.fields['question_set']
        for each in question_validated_data:
            each['quizz'] = quizz
        questions = question_set_serializer.create(question_validated_data)
        return quizz


class AssignAssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment_Assign_To_Student
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['assignment'] = AssignmentSerializer(
            read_only=True, many=True)
        return super(AssignAssignmentSerializer, self).to_representation(instance)



class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ('answer_text','question')
              



class GradedAssignmentSerializer(serializers.ModelSerializer):
    response_set = ResponseSerializer(many=True)

    class Meta:
        model = GradedAssignment
        fields = '__all__'
         
    def create(self, validated_data):
        response_validated_data = validated_data.pop('response_set')
        graded = GradedAssignment.objects.create(**validated_data)
        response_set_serializer = self.fields['response_set']
        for each in response_validated_data:
            each['graded'] = graded
        responses = response_set_serializer.create(response_validated_data)
        return graded
 
