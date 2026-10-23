from rest_framework import serializers
from .models import Guest, Episode, TopicSubmission, NewsletterSubscriber, BookingInquiry


class GuestSerializer(serializers.ModelSerializer):
    avatar_url = serializers.ReadOnlyField(source='display_avatar')

    class Meta:
        model = Guest
        fields = [
            'id',
            'name',
            'title_profession',
            'bio',
            'avatar',
            'avatar_url',
            'social_links',
            'created_at',
        ]


class EpisodeListSerializer(serializers.ModelSerializer):
    guests = GuestSerializer(many=True, read_only=True)
    thumbnail_url = serializers.ReadOnlyField(source='display_thumbnail')
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Episode
        fields = [
            'id',
            'title',
            'slug',
            'season_number',
            'episode_number',
            'category',
            'category_display',
            'description',
            'duration',
            'air_date',
            'is_featured',
            'thumbnail',
            'thumbnail_url',
            'view_count',
            'video_url',
            'audio_podcast_url',
            'guests',
        ]


class EpisodeDetailSerializer(serializers.ModelSerializer):
    guests = GuestSerializer(many=True, read_only=True)
    thumbnail_url = serializers.ReadOnlyField(source='display_thumbnail')
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Episode
        fields = [
            'id',
            'title',
            'slug',
            'season_number',
            'episode_number',
            'category',
            'category_display',
            'description',
            'synopsis',
            'video_url',
            'audio_podcast_url',
            'duration',
            'air_date',
            'is_featured',
            'thumbnail',
            'thumbnail_url',
            'view_count',
            'guests',
            'created_at',
            'updated_at',
        ]


class TopicSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicSubmission
        fields = [
            'id',
            'name',
            'is_anonymous',
            'email',
            'country_location',
            'topic_category',
            'question_body',
            'consent_to_broadcast',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_question_body(self, value):
        if len(value.strip()) < 15:
            raise serializers.ValidationError("Please provide at least 15 characters so Mbuya Va Raphy has sufficient context for counseling.")
        return value.strip()

    def validate_country_location(self, value):
        if not value.strip():
            raise serializers.ValidationError("Please provide your city, country, or diaspora region.")
        return value.strip()


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']

    def create(self, validated_data):
        email = validated_data.get('email', '').lower().strip()
        subscriber, _ = NewsletterSubscriber.objects.get_or_create(
            email=email,
            defaults={'is_active': True}
        )
        return subscriber


class BookingInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingInquiry
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'organization',
            'inquiry_type',
            'message',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_full_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Please enter your full name.")
        return value.strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Please provide more details in your message.")
        return value.strip()
