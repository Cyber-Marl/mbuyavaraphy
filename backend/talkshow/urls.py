from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EpisodeViewSet,
    GuestViewSet,
    ViewerQuestionCreateView,
    NewsletterSubscribeView,
    BookingInquiryCreateView,
)

router = DefaultRouter()
router.register('episodes', EpisodeViewSet, basename='episode')
router.register('guests', GuestViewSet, basename='guest')

urlpatterns = [
    path('', include(router.urls)),
    path('viewer-questions/', ViewerQuestionCreateView.as_view(), name='viewer-questions'),
    path('newsletter/subscribe/', NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
    path('booking-inquiries/', BookingInquiryCreateView.as_view(), name='booking-inquiries'),
]
