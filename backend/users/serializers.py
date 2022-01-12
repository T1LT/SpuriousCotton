from rest_framework import fields, serializers
from .models import User

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

    
    def create(self, validated_data):
        print(validated_data)
        password = validated_data.pop('password', None)
        instance = self.Meta.model.objects.create(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "user_name", "first_name", "last_name", "phone_number")