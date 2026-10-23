from django.db.models import Q, F
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle, AnonRateThrottle
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiTypes

from .models import Guest, Episode, TopicSubmission, NewsletterSubscriber, BookingInquiry
from .serializers import (
    GuestSerializer,
    EpisodeListSerializer,
    EpisodeDetailSerializer,
    TopicSubmissionSerializer,
    NewsletterSubscriberSerializer,
    BookingInquirySerializer,
)


class EpisodeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for browsing and searching The Mbuya VaRaphy Talk Show episodes.
    """
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Episode.objects.prefetch_related('guests').all()
        category = self.request.query_params.get('category')
        is_featured = self.request.query_params.get('is_featured')
        search = self.request.query_params.get('search')

        if category and category.lower() != 'all':
            queryset = queryset.filter(category=category.lower())

        if is_featured is not None:
            if is_featured.lower() in ['true', '1']:
                queryset = queryset.filter(is_featured=True)
            elif is_featured.lower() in ['false', '0']:
                queryset = queryset.filter(is_featured=False)

        if search:
            search_term = search.strip()
            queryset = queryset.filter(
                Q(title__icontains=search_term) |
                Q(description__icontains=search_term) |
                Q(synopsis__icontains=search_term) |
                Q(guests__name__icontains=search_term)
            ).distinct()

        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return EpisodeDetailSerializer
        return EpisodeListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count safely
        Episode.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        instance.refresh_from_db(fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @extend_schema(
        summary="Retrieve current featured headline episode",
        description="Returns the primary featured broadcast episode (e.g. premiere / season opener)."
    )
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_episode = Episode.objects.filter(is_featured=True).first()
        if not featured_episode:
            featured_episode = Episode.objects.first()
        if not featured_episode:
            return Response({"detail": "No episodes found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = EpisodeDetailSerializer(featured_episode)
        return Response(serializer.data)


class GuestViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and retrieve guest clinicians, speakers, and cultural elders.
    """
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer


class ViewerQuestionCreateView(APIView):
    """
    Submit an anonymous or identified question for Mbuya Va Raphy's upcoming episode.
    Throttled to prevent spam.
    """
    throttle_classes = [AnonRateThrottle]

    @extend_schema(
        request=TopicSubmissionSerializer,
        responses={201: TopicSubmissionSerializer},
        summary="Submit viewer confidential question",
        description="Submit a question or story to the advice corner for on-air counseling."
    )
    def post(self, request):
        serializer = TopicSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save()
            return Response(
                {
                    "message": "Your question has been received in sacred confidence. Thank you for reaching out to Mbuya Va Raphy.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewsletterSubscribeView(APIView):
    """
    Subscribe to weekly broadcast notifications and counseling insights.
    """
    @extend_schema(
        request=NewsletterSubscriberSerializer,
        responses={200: NewsletterSubscriberSerializer},
        summary="Subscribe to the broadcast newsletter",
    )
    def post(self, request):
        serializer = NewsletterSubscriberSerializer(data=request.data)
        if serializer.is_valid():
            subscriber = serializer.save()
            return Response(
                {
                    "message": "Welcome to The Mbuya Va Raphy Circle. You will receive private broadcast notifications.",
                    "email": subscriber.email
                },
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingInquiryCreateView(APIView):
    """
    Submit sponsorship inquiry, media appearance, or counseling consultation request.
    """
    @extend_schema(
        request=BookingInquirySerializer,
        responses={201: BookingInquirySerializer},
        summary="Submit sponsorship or speaking booking inquiry",
    )
    def post(self, request):
        serializer = BookingInquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            return Response(
                {
                    "message": "Thank you for contacting Melody Magengezha and The Mbuya Va Raphy production team. We will respond within 48 business hours.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
