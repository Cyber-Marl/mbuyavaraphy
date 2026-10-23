from django.contrib import admin
from django.utils.html import format_html
from .models import Guest, Episode, TopicSubmission, NewsletterSubscriber, BookingInquiry


@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ('name', 'title_profession', 'avatar_preview', 'created_at')
    search_fields = ('name', 'title_profession', 'bio')
    list_filter = ('created_at',)

    def avatar_preview(self, obj):
        url = obj.display_avatar
        return format_html('<img src="{}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />', url)
    avatar_preview.short_description = "Avatar"


@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = (
        'season_ep_code',
        'title',
        'category_badge',
        'air_date',
        'duration',
        'is_featured_badge',
        'view_count',
        'thumbnail_preview',
    )
    list_filter = ('category', 'is_featured', 'season_number', 'air_date')
    search_fields = ('title', 'description', 'synopsis', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('guests',)
    readonly_fields = ('view_count', 'created_at', 'updated_at', 'thumbnail_preview')
    ordering = ('-season_number', '-episode_number', '-air_date')

    def season_ep_code(self, obj):
        return f"S{obj.season_number:02d}E{obj.episode_number:02d}"
    season_ep_code.short_description = "Episode"

    def category_badge(self, obj):
        colors = {
            'mental_health': '#2C3E35',
            'relationships': '#C85A32',
            'culture_family': '#D4AF37',
            'diaspora_voice': '#3B5998',
            'youth_wellness': '#6B46C1',
        }
        color = colors.get(obj.category, '#4A5568')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">{}</span>',
            color,
            obj.get_category_display()
        )
    category_badge.short_description = "Category"

    def is_featured_badge(self, obj):
        if obj.is_featured:
            return format_html('<span style="color: #D4AF37; font-weight: bold;">⭐ FEATURED HERO</span>')
        return format_html('<span style="color: #9CA3AF;">Standard</span>')
    is_featured_badge.short_description = "Featured"

    def thumbnail_preview(self, obj):
        url = obj.display_thumbnail
        return format_html('<img src="{}" style="width: 64px; height: 36px; border-radius: 4px; object-fit: cover;" />', url)
    thumbnail_preview.short_description = "Preview"


@admin.register(TopicSubmission)
class TopicSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'author_display',
        'country_location',
        'topic_category',
        'status_badge',
        'consent_to_broadcast',
        'created_at',
    )
    list_filter = ('topic_category', 'status', 'is_anonymous', 'consent_to_broadcast', 'created_at')
    search_fields = ('name', 'email', 'country_location', 'question_body')
    readonly_fields = ('created_at',)

    def author_display(self, obj):
        if obj.is_anonymous or not obj.name:
            return format_html('<span style="color: #9CA3AF; font-style: italic;">🔒 Anonymous Viewer</span>')
        return obj.name
    author_display.short_description = "Submitted By"

    def status_badge(self, obj):
        status_colors = {
            'pending': '#EAB308',
            'reviewed': '#3B82F6',
            'selected_for_show': '#10B981',
            'archived': '#6B7280',
        }
        color = status_colors.get(obj.status, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 7px; border-radius: 10px; font-size: 11px;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = "Status"


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at', 'is_active')
    search_fields = ('email',)
    list_filter = ('is_active', 'subscribed_at')


@admin.register(BookingInquiry)
class BookingInquiryAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'email',
        'organization',
        'inquiry_type',
        'status',
        'created_at',
    )
    list_filter = ('inquiry_type', 'status', 'created_at')
    search_fields = ('full_name', 'email', 'organization', 'message')
    readonly_fields = ('created_at',)
