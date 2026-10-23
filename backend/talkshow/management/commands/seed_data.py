import os
import shutil
from datetime import date, timedelta
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from talkshow.models import Guest, Episode, TopicSubmission, NewsletterSubscriber, BookingInquiry


class Command(BaseCommand):
    help = "Seeds database with authentic broadcast episodes, guests, advice questions, and inquiries."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Initiating database seeding for The Mbuya VaRaphy Talk Show..."))

        # Setup media directories
        media_root = Path(settings.MEDIA_ROOT)
        media_episodes = media_root / "episodes" / "thumbnails"
        media_guests = media_root / "guests" / "avatars"
        media_episodes.mkdir(parents=True, exist_ok=True)
        media_guests.mkdir(parents=True, exist_ok=True)

        # Copy authentic assets from brain artifact directory if available
        brain_media_dir = Path("C:/Users/marlv/.gemini/antigravity-ide/brain/d20566b7-f9df-4af0-b94d-4d55623b871d")
        flyer_src = brain_media_dir / "featured_flyer.jpg"
        portrait_src = brain_media_dir / "host_portrait.jpg"
        outdoor_src = brain_media_dir / "host_outdoor.jpg"

        flyer_dest = media_episodes / "parenting_neurodiversity_flyer.jpg"
        portrait_dest = media_guests / "melody_magengezha.jpg"
        outdoor_dest = media_guests / "melody_outdoor.jpg"

        try:
            if flyer_src.exists() and not flyer_dest.exists():
                shutil.copy(flyer_src, flyer_dest)
            if portrait_src.exists() and not portrait_dest.exists():
                shutil.copy(portrait_src, portrait_dest)
            if outdoor_src.exists() and not outdoor_dest.exists():
                shutil.copy(outdoor_src, outdoor_dest)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"Media file copy notice: {e}"))

        # 1. Seed Guests
        guests_data = [
            {
                "name": "Rachael Masiboy",
                "title_profession": "Mental Health & Forensic Clinician",
                "bio": "Specialized in neurodevelopmental assessments, forensic behavioral psychology, and cross-cultural family interventions. Renowned for her clinical work supporting African migrant families navigating ASD, ADHD, and dual-diagnosis challenges.",
                "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
                "social_links": {
                    "linkedin": "https://linkedin.com",
                    "youtube": "https://youtube.com",
                }
            },
            {
                "name": "Dr. Tinashe Gumbo",
                "title_profession": "Consultant Psychiatrist & Diaspora Mental Health Researcher",
                "bio": "Over 18 years of clinical psychiatry experience across Harare, Johannesburg, and London. Advocate for destigmatizing psychiatric healthcare within African faith communities.",
                "avatar_url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
                "social_links": {
                    "linkedin": "https://linkedin.com",
                    "twitter": "https://x.com",
                }
            },
            {
                "name": "Amai Fungai Matarutse",
                "title_profession": "Systemic Family Therapist & Cultural Mediator",
                "bio": "Pioneering family counseling methodologies that honor traditional African relational frameworks while fostering healthy communication boundaries in modern marriages.",
                "avatar_url": "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80",
                "social_links": {
                    "facebook": "https://facebook.com",
                }
            },
            {
                "name": "Farai Sibanda",
                "title_profession": "Youth Counselor & Neurodivergence Specialist",
                "bio": "Mentoring young people across Melbourne and the UK. Focuses on identity formation, digital addiction, and supporting teenagers with ADHD in multicultural school settings.",
                "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                "social_links": {
                    "instagram": "https://instagram.com",
                }
            },
            {
                "name": "Tsitsi Chifamba",
                "title_profession": "Migration Wellness Advocate & Author",
                "bio": "Author of 'Roots in Transit'. Keynote speaker on diaspora psychological safety, combating prolonged separation grief, and creating supportive African community hubs abroad.",
                "avatar_url": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
                "social_links": {
                    "linkedin": "https://linkedin.com",
                }
            },
        ]

        guest_objs = {}
        for g_data in guests_data:
            guest, _ = Guest.objects.update_or_create(
                name=g_data["name"],
                defaults=g_data
            )
            guest_objs[guest.name] = guest
            self.stdout.write(f"  [OK] Guest ready: {guest.name}")

        # 2. Seed Episodes
        episodes_data = [
            {
                "title": "Parenting Neurodiversity: Lived Experience & Professional Insights (Session 1: Pre-Natal Stage)",
                "season_number": 2,
                "episode_number": 1,
                "category": "youth_wellness",
                "description": "Premiere episode of our landmark 5-part masterclass series navigating neurodivergence across developmental stages, led by host Melody Magengezha and guest clinician Rachael Masiboy.",
                "synopsis": """In this groundbreaking Season 2 premiere, host Melody Magengezha (Mbuya Va Raphy) sits down with esteemed Mental Health & Forensic Clinician Rachael Masiboy to demystify neurodiversity in our families.

Key Themes & Practical Takeaways:
1. Recognizing Early Markers: Understanding pre-natal and early infancy neurodevelopmental signs without fear or shame.
2. Dismantling Stigma: Unpacking the cultural myths around autism and ADHD in African diaspora communities.
3. Healthcare Advocacy: How to navigate GP referrals, specialist pediatric assessments, and school accommodations in Australia, the UK, and North America.
4. Parental Emotional Resilience: Managing parental anxiety, marital alignment, and grief when receiving a diagnosis.
5. Community Sanctuary: Creating supportive diaspora village networks where neurodivergent children flourish.""",
                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "audio_podcast_url": "https://open.spotify.com/episode/parenting-neurodiversity",
                "duration": "54 mins",
                "air_date": date(2026, 6, 25),
                "is_featured": True,
                "thumbnail_url": "/media/episodes/thumbnails/parenting_neurodiversity_flyer.jpg" if flyer_dest.exists() else "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
                "view_count": 14250,
                "guests": ["Rachael Masiboy"],
            },
            {
                "title": "Silent Tears in the Diaspora: Healing Migration Grief & Cultural Dislocation",
                "season_number": 2,
                "episode_number": 2,
                "category": "diaspora_voice",
                "description": "A deeply compassionate dialogue examining the unspoken psychological toll of migration, loneliness, identity preservation, and the pressure of remitting back home.",
                "synopsis": """Host Melody Magengezha and Tsitsi Chifamba explore the invisible emotional luggage carried by millions of Africans living in the diaspora. 

Discussion Highlights:
• The myth of the 'effortless abroad life' and overcoming social media comparison.
• Coping with the absence of extended family support systems (chara chimwe hachitswanyi inda).
• Developing healthy boundaries around financial black-tax and family expectations.
• Practical grounding techniques for seasonal depression and social alienation.""",
                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "audio_podcast_url": "https://open.spotify.com/episode/silent-tears-diaspora",
                "duration": "48 mins",
                "air_date": date(2026, 7, 2),
                "is_featured": False,
                "thumbnail_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
                "view_count": 9820,
                "guests": ["Tsitsi Chifamba"],
            },
            {
                "title": "Breaking Generational Silence: African Men, Emotional Safety & Therapy",
                "season_number": 2,
                "episode_number": 3,
                "category": "mental_health",
                "description": "Challenging traditional paradigms of stoicism. Dr. Tinashe Gumbo joins Mbuya Va Raphy to provide men with tools for emotional articulation and vulnerability.",
                "synopsis": """Men often suffer in silence under the weight of provider burdens. This episode creates a sacred, judgment-free space to redefine true masculinity.

Highlights:
• Deconstructing the phrase 'Varume havachemi' (Men do not cry) and its somatic health consequences.
• Early warning signs of clinical depression, burnout, and hypertension in working men.
• How partners and wives can create emotional safety without making men feel undermined.
• Clinical steps to accessing mental health professionals without cultural shame.""",
                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "audio_podcast_url": "https://open.spotify.com/episode/african-men-mental-health",
                "duration": "51 mins",
                "air_date": date(2026, 7, 9),
                "is_featured": False,
                "thumbnail_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
                "view_count": 11340,
                "guests": ["Dr. Tinashe Gumbo"],
            },
            {
                "title": "Marriage Beyond Borders: Cultural In-Laws, Finances & Intimacy Abroad",
                "season_number": 1,
                "episode_number": 8,
                "category": "relationships",
                "description": "How couples maintain romance and unity when isolated from traditional aunties (vana tete) and navigating foreign lifestyle pressures.",
                "synopsis": """Amai Fungai Matarutse unpacks the challenges modern African marriages face in Western societies.

Core Takeaways:
• Navigating joint finances, mortgages, and split remittances respectfully.
• Resolving conflicts constructively when there is no elder mediation council.
• Reigniting emotional and physical intimacy amidst shift-work and fatigue.
• Managing intrusive remote family interference with graceful boundaries.""",
                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "audio_podcast_url": "https://open.spotify.com/episode/marriage-beyond-borders",
                "duration": "46 mins",
                "air_date": date(2026, 5, 14),
                "is_featured": False,
                "thumbnail_url": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
                "view_count": 15890,
                "guests": ["Amai Fungai Matarutse"],
            },
            {
                "title": "Reconciling Faith, Prayer, and Modern Psychiatric Medication",
                "season_number": 1,
                "episode_number": 7,
                "category": "culture_family",
                "description": "Can you have deep faith and also take antidepressants? Dr. Tinashe Gumbo and Mbuya Va Raphy tackle the intersection of spiritual devotion and medical science.",
                "synopsis": """A candid conversation bridging pastoral guidance and psychiatric pharmacology.

Takeaways:
• Understanding the brain as an organ that can experience physiological chemical imbalances.
• Why medication and prayer are complementary, not contradictory.
• Educating church leaders on recognizing acute psychosis vs spiritual warfare.
• Personal testimonies of healing and sustained recovery.""",
                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "audio_podcast_url": "https://open.spotify.com/episode/faith-and-psychiatry",
                "duration": "58 mins",
                "air_date": date(2026, 5, 7),
                "is_featured": False,
                "thumbnail_url": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
                "view_count": 13450,
                "guests": ["Dr. Tinashe Gumbo"],
            },
            {
                "title": "The Masking Burden: Neurodivergent African Women in Professional Spaces",
                "season_number": 1,
                "episode_number": 6,
                "category": "mental_health",
                "description": "Rachael Masiboy reveals why neurodivergent women of color are frequently diagnosed late in life, and the heavy toll of constant masking.",
                "synopsis": """High-achieving African women discuss ADHD paralysis, sensory overwhelm in corporate workplaces, and late-life self-discovery.

Takeaways:
• The internal presentation of ADHD and Autism in women vs traditional male stereotypes.
• Recovering from chronic burnout and executive dysfunction.
• Workable workplace accommodations that don't jeopardize career progression.
• Finding joy and self-compassion after diagnosis.""",
                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "audio_podcast_url": "https://open.spotify.com/episode/masking-burden-women",
                "duration": "49 mins",
                "air_date": date(2026, 4, 30),
                "is_featured": False,
                "thumbnail_url": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
                "view_count": 12100,
                "guests": ["Rachael Masiboy"],
            },
            {
                "title": "Parenting in Two Worlds: Preserving Heritage While Raising 2nd Gen Teens",
                "season_number": 1,
                "episode_number": 5,
                "category": "youth_wellness",
                "description": "Youth counselor Farai Sibanda joins Mbuya to share communication bridges between immigrant parents and Western-raised teenagers.",
                "synopsis": """How to communicate with teenagers when culture and communication styles clash.

Takeaways:
• Active listening over authoritarian lecturing.
• Helping teens embrace their cultural roots without feeling othered by peers.
• Setting sensible digital boundaries without sparking isolation.
• Fostering open dialogues about identity, mental health, and future careers.""",
                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "audio_podcast_url": "https://open.spotify.com/episode/parenting-two-worlds",
                "duration": "47 mins",
                "air_date": date(2026, 4, 23),
                "is_featured": False,
                "thumbnail_url": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
                "view_count": 8940,
                "guests": ["Farai Sibanda"],
            },
        ]

        for ep_data in episodes_data:
            guest_names = ep_data.pop("guests", [])
            episode, created = Episode.objects.update_or_create(
                title=ep_data["title"],
                defaults=ep_data
            )
            for g_name in guest_names:
                if g_name in guest_objs:
                    episode.guests.add(guest_objs[g_name])
            self.stdout.write(f"  [OK] Episode ready: S{episode.season_number:02d}E{episode.episode_number:02d} - {episode.title[:40]}...")

        # 3. Seed Sample Viewer Questions
        questions_data = [
            {
                "name": "Tendai M.",
                "is_anonymous": False,
                "email": "tendai.m@example.com",
                "country_location": "Melbourne, Australia",
                "topic_category": "parenting",
                "question_body": "My 4-year-old son was recently assessed for speech delay and ADHD. My husband's family insists it is just a stubborn phase and refuses specialist support. How can I protect my son's early intervention without fracturing our marriage?",
                "consent_to_broadcast": True,
                "status": "selected_for_show",
            },
            {
                "name": "",
                "is_anonymous": True,
                "email": "",
                "country_location": "London, United Kingdom",
                "topic_category": "diaspora",
                "question_body": "I have lived in the UK for 9 years as a nurse. I send money every month to support my extended family, but whenever I try to express that I am drowning in loneliness and burnout, they dismiss it and say 'you are in Europe, you have no real problems'. How do I heal this guilt?",
                "consent_to_broadcast": True,
                "status": "reviewed",
            },
            {
                "name": "Kudzanai",
                "is_anonymous": False,
                "email": "kudzi@example.com",
                "country_location": "Harare, Zimbabwe",
                "topic_category": "marriage",
                "question_body": "Mbuya Va Raphy, my husband relocated to Australia 18 months ago on a skilled visa while we wait for family sponsorship. The time difference and emotional distance are straining our connection. What practical rituals can keep our intimacy alive?",
                "consent_to_broadcast": True,
                "status": "selected_for_show",
            },
        ]

        for q_data in questions_data:
            TopicSubmission.objects.get_or_create(
                country_location=q_data["country_location"],
                question_body=q_data["question_body"],
                defaults=q_data
            )
        self.stdout.write("  [OK] Sample viewer questions seeded.")

        # 4. Seed Newsletter Subscribers
        subscribers = [
            "wellness.circle@diasporainsights.com",
            "africanfamilies@wellbeinghub.org",
            "counseling@melbournezimcommunity.com.au"
        ]
        for sub_email in subscribers:
            NewsletterSubscriber.objects.get_or_create(email=sub_email)
        self.stdout.write("  [OK] Sample newsletter subscribers seeded.")

        # 5. Seed Sample Booking Inquiries
        inquiries = [
            {
                "full_name": "Farai Musarurwa",
                "email": "partnerships@diasporainsurance.com",
                "phone": "+44 20 1234 5678",
                "organization": "Diaspora Insurance",
                "inquiry_type": "sponsorship",
                "message": "We would love to discuss headline presenting sponsorship for Season 2 of The Mbuya VaRaphy Talk Show and align on community wellness initiatives.",
                "status": "contacted",
            },
            {
                "full_name": "Dr. Sarah Ndlovu",
                "email": "sarah.ndlovu@africawellnesssummit.org",
                "phone": "+61 412 345 678",
                "organization": "Melbourne African Healthcare Alliance",
                "inquiry_type": "media_speaking",
                "message": "Inviting Melody Magengezha to deliver the opening keynote on 'Mental Wellness in Diaspora Communities' at our annual summit in Melbourne.",
                "status": "new",
            }
        ]
        for inq in inquiries:
            BookingInquiry.objects.get_or_create(
                email=inq["email"],
                inquiry_type=inq["inquiry_type"],
                defaults=inq
            )
        self.stdout.write("  [OK] Sample booking inquiries seeded.")

        self.stdout.write(self.style.SUCCESS("[SUCCESS] Successfully seeded all data for The Mbuya VaRaphy Talk Show!"))
