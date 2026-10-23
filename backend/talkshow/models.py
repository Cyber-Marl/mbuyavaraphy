from django.db import models
from django.utils.text import slugify


class Guest(models.Model):
    name = models.CharField(max_length=200, help_text="Full name of guest expert or speaker")
    title_profession = models.CharField(max_length=255, help_text="e.g. Mental Health & Forensic Clinician")
    bio = models.TextField(help_text="Guest biography and professional background")
    avatar = models.ImageField(upload_to="guests/avatars/", blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True, help_text="Fallback external avatar image URL")
    social_links = models.JSONField(default=dict, blank=True, help_text="Links to LinkedIn, Instagram, etc.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        verbose_name = "Guest Speaker"
        verbose_name_plural = "Guest Speakers"

    def __str__(self):
        return f"{self.name} - {self.title_profession}"

    @property
    def display_avatar(self):
        if self.avatar:
            return self.avatar.url
        return self.avatar_url or "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"


class Episode(models.Model):
    CATEGORY_CHOICES = [
        ('mental_health', 'Mental Health & Wellness'),
        ('relationships', 'Marriage & Family Dynamics'),
        ('culture_family', 'Culture, Faith & Heritage'),
        ('diaspora_voice', 'Diaspora Lived Experience'),
        ('youth_wellness', 'Youth & Neurodiversity'),
    ]

    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=320, unique=True, blank=True)
    season_number = models.PositiveIntegerField(default=1)
    episode_number = models.PositiveIntegerField(default=1)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='mental_health')
    
    description = models.TextField(help_text="Short engaging overview for cards and listings")
    synopsis = models.TextField(help_text="Comprehensive broadcast breakdown, core takeaways, and discussion points")
    
    video_url = models.URLField(help_text="YouTube or Vimeo watch/embed URL")
    audio_podcast_url = models.URLField(blank=True, null=True, help_text="Spotify, Apple Podcasts, or MP3 URL")
    
    duration = models.CharField(max_length=50, default="45 mins", help_text="e.g., '48 mins' or '1h 12m'")
    air_date = models.DateField(help_text="Date when episode premiered or broadcasted")
    
    is_featured = models.BooleanField(default=False, help_text="Highlight as Hero premiere episode")
    thumbnail = models.ImageField(upload_to="episodes/thumbnails/", blank=True, null=True)
    thumbnail_url = models.URLField(blank=True, null=True, help_text="Fallback external high-res thumbnail URL")
    
    view_count = models.PositiveIntegerField(default=0)
    guests = models.ManyToManyField(Guest, related_name='episodes', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-season_number', '-episode_number', '-air_date']
        verbose_name = "Episode"
        verbose_name_plural = "Episodes"

    def __str__(self):
        return f"S{self.season_number:02d}E{self.episode_number:02d}: {self.title}"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            unique_slug = base_slug
            counter = 1
            while Episode.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)

    @property
    def display_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        return self.thumbnail_url or "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80"


class TopicSubmission(models.Model):
    CATEGORY_CHOICES = [
        ('mental_health', 'Mental Health & Anxiety'),
        ('marriage', 'Marriage & In-laws'),
        ('parenting', 'Parenting & Neurodiversity'),
        ('diaspora', 'Diaspora Isolation & Grief'),
        ('faith_culture', 'Faith, Culture & Stigma'),
        ('general', 'General Life Dilemma'),
    ]

    STATUS_CHOICES = [
        ('pending', 'New & Unreviewed'),
        ('reviewed', 'Reviewed by Mbuya Va Raphy Team'),
        ('selected_for_show', 'Selected for Broadcast Q&A'),
        ('archived', 'Archived / Confidential Record'),
    ]

    name = models.CharField(max_length=150, blank=True, help_text="Leave blank if viewer requests full anonymity")
    is_anonymous = models.BooleanField(default=False, help_text="Viewer chose to keep name and private details hidden")
    email = models.EmailField(blank=True, help_text="Confidential contact for potential follow-up or resource sharing")
    country_location = models.CharField(max_length=150, help_text="e.g. Melbourne (AUS), Harare (ZW), Birmingham (UK), Dallas (USA)")
    topic_category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='mental_health')
    question_body = models.TextField(help_text="Viewer's dilemma, question, or story")
    consent_to_broadcast = models.BooleanField(default=True, help_text="Consent to read question on air with names altered")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Viewer Question / Advice Request"
        verbose_name_plural = "Viewer Questions / Advice Requests"

    def __str__(self):
        display_author = "Anonymous Viewer" if self.is_anonymous or not self.name else self.name
        return f"[{self.get_topic_category_display()}] {display_author} ({self.country_location})"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-subscribed_at']
        verbose_name = "Newsletter Subscriber"
        verbose_name_plural = "Newsletter Subscribers"

    def __str__(self):
        return self.email


class BookingInquiry(models.Model):
    INQUIRY_CHOICES = [
        ('sponsorship', 'Corporate Sponsorship & Broadcast Advertising'),
        ('media_speaking', 'Keynote Speaking / Media Appearance'),
        ('therapy_coaching', 'Therapy, Counseling & Coaching Consultation'),
        ('guest_appearance', 'Guest Panelist / Expert Pitch'),
        ('other', 'General Organizational Inquiry'),
    ]

    STATUS_CHOICES = [
        ('new', 'New Inquiry'),
        ('in_review', 'In Review'),
        ('contacted', 'Contacted / Meeting Scheduled'),
        ('closed', 'Closed'),
    ]

    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    organization = models.CharField(max_length=200, blank=True, help_text="Company, Institution, or Church")
    inquiry_type = models.CharField(max_length=50, choices=INQUIRY_CHOICES, default='sponsorship')
    message = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Booking / Sponsorship Inquiry"
        verbose_name_plural = "Booking / Sponsorship Inquiries"

    def __str__(self):
        return f"{self.full_name} ({self.get_inquiry_type_display()}) - {self.email}"
