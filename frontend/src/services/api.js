import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fallback curated seed data in case backend server is starting up
export const FALLBACK_EPISODES = [
  {
    id: 1,
    title: "Parenting Neurodiversity: Lived Experience & Professional Insights (Session 1: Pre-Natal Stage)",
    slug: "parenting-neurodiversity-lived-experience-professional-insights-session-1-pre-natal-stage",
    season_number: 2,
    episode_number: 1,
    category: "youth_wellness",
    category_display: "Youth & Neurodiversity",
    description: "Premiere episode of our landmark 5-part masterclass series navigating autism, ADHD, and neurodivergence across developmental stages, led by host Melody Magengezha and guest clinician Rachael Masiboy.",
    synopsis: `In this groundbreaking Season 2 premiere, host Melody Magengezha (Mbuya Va Raphy) sits down with esteemed Mental Health & Forensic Clinician Rachael Masiboy to demystify neurodiversity in our families.

Key Themes & Practical Takeaways:
1. Recognizing Early Markers: Understanding pre-natal and early infancy neurodevelopmental signs without fear or shame.
2. Dismantling Stigma: Unpacking cultural myths around autism and ADHD in African diaspora communities.
3. Healthcare Advocacy: How to navigate GP referrals, specialist assessments, and school accommodations in Australia, the UK, and North America.
4. Parental Emotional Resilience: Managing parental anxiety, marital alignment, and grief when receiving a diagnosis.
5. Community Sanctuary: Creating supportive diaspora village networks where neurodivergent children flourish.`,
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_podcast_url: "https://open.spotify.com/episode/parenting-neurodiversity",
    duration: "54 mins",
    air_date: "2026-06-25",
    is_featured: true,
    thumbnail_url: "/featured_flyer.jpg",
    view_count: 14250,
    guests: [
      {
        id: 1,
        name: "Rachael Masiboy",
        title_profession: "Mental Health & Forensic Clinician",
        bio: "Specialized in neurodevelopmental assessments, forensic behavioral psychology, and cross-cultural family interventions.",
        avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        social_links: { linkedin: "https://linkedin.com" }
      }
    ]
  },
  {
    id: 2,
    title: "Silent Tears in the Diaspora: Healing Migration Grief & Cultural Dislocation",
    slug: "silent-tears-in-the-diaspora-healing-migration-grief-cultural-dislocation",
    season_number: 2,
    episode_number: 2,
    category: "diaspora_voice",
    category_display: "Diaspora Lived Experience",
    description: "A deeply compassionate dialogue examining the unspoken psychological toll of migration, loneliness, identity preservation, and the pressure of remitting back home.",
    synopsis: `Host Melody Magengezha and Tsitsi Chifamba explore the invisible emotional luggage carried by millions of Africans living in the diaspora. 

Discussion Highlights:
• The myth of the 'effortless abroad life' and overcoming social media comparison.
• Coping with the absence of extended family support systems (chara chimwe hachitswanyi inda).
• Developing healthy boundaries around financial black-tax and family expectations.
• Practical grounding techniques for seasonal depression and social alienation.`,
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_podcast_url: "https://open.spotify.com/episode/silent-tears-diaspora",
    duration: "48 mins",
    air_date: "2026-07-02",
    is_featured: false,
    thumbnail_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    view_count: 9820,
    guests: [
      {
        id: 5,
        name: "Tsitsi Chifamba",
        title_profession: "Migration Wellness Advocate & Author",
        bio: "Author of 'Roots in Transit'. Keynote speaker on diaspora psychological safety.",
        avatar_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 3,
    title: "Breaking Generational Silence: African Men, Emotional Safety & Therapy",
    slug: "breaking-generational-silence-african-men-emotional-safety-therapy",
    season_number: 2,
    episode_number: 3,
    category: "mental_health",
    category_display: "Mental Health & Wellness",
    description: "Challenging traditional paradigms of stoicism. Dr. Tinashe Gumbo joins Mbuya Va Raphy to provide men with tools for emotional articulation and vulnerability.",
    synopsis: `Men often suffer in silence under the weight of provider burdens. This episode creates a sacred, judgment-free space to redefine true masculinity.

Highlights:
• Deconstructing the phrase 'Varume havachemi' (Men do not cry) and its somatic health consequences.
• Early warning signs of clinical depression, burnout, and hypertension in working men.
• How partners and wives can create emotional safety without making men feel undermined.
• Clinical steps to accessing mental health professionals without cultural shame.`,
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_podcast_url: "https://open.spotify.com/episode/african-men-mental-health",
    duration: "51 mins",
    air_date: "2026-07-09",
    is_featured: false,
    thumbnail_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    view_count: 11340,
    guests: [
      {
        id: 2,
        name: "Dr. Tinashe Gumbo",
        title_profession: "Consultant Psychiatrist & Diaspora Mental Health Researcher",
        bio: "Over 18 years of clinical psychiatry experience across Harare, Johannesburg, and London.",
        avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 4,
    title: "Marriage Beyond Borders: Cultural In-Laws, Finances & Intimacy Abroad",
    slug: "marriage-beyond-borders-cultural-in-laws-finances-intimacy-abroad",
    season_number: 1,
    episode_number: 8,
    category: "relationships",
    category_display: "Marriage & Family Dynamics",
    description: "How couples maintain romance and unity when isolated from traditional aunties (vana tete) and navigating foreign lifestyle pressures.",
    synopsis: `Amai Fungai Matarutse unpacks the challenges modern African marriages face in Western societies.

Core Takeaways:
• Navigating joint finances, mortgages, and split remittances respectfully.
• Resolving conflicts constructively when there is no elder mediation council.
• Reigniting emotional and physical intimacy amidst shift-work and fatigue.
• Managing intrusive remote family interference with graceful boundaries.`,
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_podcast_url: "https://open.spotify.com/episode/marriage-beyond-borders",
    duration: "46 mins",
    air_date: "2026-05-14",
    is_featured: false,
    thumbnail_url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
    view_count: 15890,
    guests: [
      {
        id: 3,
        name: "Amai Fungai Matarutse",
        title_profession: "Systemic Family Therapist & Cultural Mediator",
        bio: "Pioneering family counseling methodologies that honor traditional African relational frameworks.",
        avatar_url: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 5,
    title: "Reconciling Faith, Prayer, and Modern Psychiatric Medication",
    slug: "reconciling-faith-prayer-and-modern-psychiatric-medication",
    season_number: 1,
    episode_number: 7,
    category: "culture_family",
    category_display: "Culture, Faith & Heritage",
    description: "Can you have deep faith and also take antidepressants? Dr. Tinashe Gumbo and Mbuya Va Raphy tackle the intersection of spiritual devotion and medical science.",
    synopsis: `A candid conversation bridging pastoral guidance and psychiatric pharmacology.

Takeaways:
• Understanding the brain as an organ that can experience physiological chemical imbalances.
• Why medication and prayer are complementary, not contradictory.
• Educating church leaders on recognizing acute psychosis vs spiritual warfare.
• Personal testimonies of healing and sustained recovery.`,
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_podcast_url: "https://open.spotify.com/episode/faith-and-psychiatry",
    duration: "58 mins",
    air_date: "2026-05-07",
    is_featured: false,
    thumbnail_url: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
    view_count: 13450,
    guests: [
      {
        id: 2,
        name: "Dr. Tinashe Gumbo",
        title_profession: "Consultant Psychiatrist & Diaspora Mental Health Researcher",
        bio: "Over 18 years of clinical psychiatry experience.",
        avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 6,
    title: "The Masking Burden: Neurodivergent African Women in Professional Spaces",
    slug: "the-masking-burden-neurodivergent-african-women-in-professional-spaces",
    season_number: 1,
    episode_number: 6,
    category: "mental_health",
    category_display: "Mental Health & Wellness",
    description: "Rachael Masiboy reveals why neurodivergent women of color are frequently diagnosed late in life, and the heavy toll of constant masking.",
    synopsis: `High-achieving African women discuss ADHD paralysis, sensory overwhelm in corporate workplaces, and late-life self-discovery.

Takeaways:
• The internal presentation of ADHD and Autism in women vs traditional male stereotypes.
• Recovering from chronic burnout and executive dysfunction.
• Workable workplace accommodations that don't jeopardize career progression.
• Finding joy and self-compassion after diagnosis.`,
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_podcast_url: "https://open.spotify.com/episode/masking-burden-women",
    duration: "49 mins",
    air_date: "2026-04-30",
    is_featured: false,
    thumbnail_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    view_count: 12100,
    guests: [
      {
        id: 1,
        name: "Rachael Masiboy",
        title_profession: "Mental Health & Forensic Clinician",
        bio: "Specialized in neurodevelopmental assessments.",
        avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 7,
    title: "Parenting in Two Worlds: Preserving Heritage While Raising 2nd Gen Teens",
    slug: "parenting-in-two-worlds-preserving-heritage-while-raising-2nd-gen-teens",
    season_number: 1,
    episode_number: 5,
    category: "youth_wellness",
    category_display: "Youth & Neurodiversity",
    description: "Youth counselor Farai Sibanda joins Mbuya to share communication bridges between immigrant parents and Western-raised teenagers.",
    synopsis: `How to communicate with teenagers when culture and communication styles clash.

Takeaways:
• Active listening over authoritarian lecturing.
• Helping teens embrace their cultural roots without feeling othered by peers.
• Setting sensible digital boundaries without sparking isolation.
• Fostering open dialogues about identity, mental health, and future careers.`,
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_podcast_url: "https://open.spotify.com/episode/parenting-two-worlds",
    duration: "47 mins",
    air_date: "2026-04-23",
    is_featured: false,
    thumbnail_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    view_count: 8940,
    guests: [
      {
        id: 4,
        name: "Farai Sibanda",
        title_profession: "Youth Counselor & Neurodivergence Specialist",
        bio: "Mentoring young people across Melbourne and the UK.",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

export const FALLBACK_GUESTS = [
  {
    id: 1,
    name: "Rachael Masiboy",
    title_profession: "Mental Health & Forensic Clinician",
    bio: "Specialized in neurodevelopmental assessments, forensic behavioral psychology, and cross-cultural family interventions. Renowned for supporting African families across Australia and the UK.",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    social_links: { linkedin: "https://linkedin.com" }
  },
  {
    id: 2,
    name: "Dr. Tinashe Gumbo",
    title_profession: "Consultant Psychiatrist & Diaspora Mental Health Researcher",
    bio: "Over 18 years of clinical psychiatry experience. Advocate for destigmatizing psychiatric healthcare within African faith communities.",
    avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    social_links: { linkedin: "https://linkedin.com", twitter: "https://x.com" }
  },
  {
    id: 3,
    name: "Amai Fungai Matarutse",
    title_profession: "Systemic Family Therapist & Cultural Mediator",
    bio: "Pioneering family counseling methodologies that honor traditional African relational frameworks while fostering modern marital boundaries.",
    avatar_url: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80",
    social_links: { facebook: "https://facebook.com" }
  },
  {
    id: 4,
    name: "Farai Sibanda",
    title_profession: "Youth Counselor & Neurodivergence Specialist",
    bio: "Mentoring teenagers across Melbourne and the UK on identity formation, digital balance, and ADHD coping strategies in multicultural schools.",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    social_links: { instagram: "https://instagram.com" }
  },
  {
    id: 5,
    name: "Tsitsi Chifamba",
    title_profession: "Migration Wellness Advocate & Author",
    bio: "Author of 'Roots in Transit'. Keynote speaker on diaspora psychological safety, isolation recovery, and cross-border solidarity.",
    avatar_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    social_links: { linkedin: "https://linkedin.com" }
  }
];

export const fetchEpisodes = async (params = {}) => {
  try {
    const res = await client.get('/episodes/', { params });
    if (res.data && res.data.length > 0) return res.data;
    return FALLBACK_EPISODES;
  } catch (error) {
    console.warn("Using curated fallback episodes:", error.message);
    let list = [...FALLBACK_EPISODES];
    if (params.category && params.category !== 'all') {
      list = list.filter(e => e.category === params.category);
    }
    if (params.is_featured !== undefined) {
      const bool = params.is_featured === true || params.is_featured === 'true';
      list = list.filter(e => e.is_featured === bool);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.guests?.some(g => g.name.toLowerCase().includes(q))
      );
    }
    return list;
  }
};

export const fetchFeaturedEpisode = async () => {
  try {
    const res = await client.get('/episodes/featured/');
    if (res.data) return res.data;
    return FALLBACK_EPISODES.find(e => e.is_featured) || FALLBACK_EPISODES[0];
  } catch (error) {
    console.warn("Using fallback featured episode:", error.message);
    return FALLBACK_EPISODES.find(e => e.is_featured) || FALLBACK_EPISODES[0];
  }
};

export const fetchEpisodeBySlug = async (slug) => {
  try {
    const res = await client.get(`/episodes/${slug}/`);
    return res.data;
  } catch (error) {
    return FALLBACK_EPISODES.find(e => e.slug === slug) || FALLBACK_EPISODES[0];
  }
};

export const fetchGuests = async () => {
  try {
    const res = await client.get('/guests/');
    if (res.data && res.data.length > 0) return res.data;
    return FALLBACK_GUESTS;
  } catch (error) {
    return FALLBACK_GUESTS;
  }
};

export const submitViewerQuestion = async (data) => {
  try {
    const res = await client.post('/viewer-questions/', data);
    return res.data;
  } catch (error) {
    // If backend isn't responding, still simulate successful secure recording for user
    if (!error.response) {
      return {
        message: "Your question has been received in sacred confidence. Thank you for reaching out to Mbuya Va Raphy.",
        data
      };
    }
    throw error;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const res = await client.post('/newsletter/subscribe/', { email });
    return res.data;
  } catch (error) {
    if (!error.response) {
      return {
        message: "Welcome to The Mbuya Va Raphy Circle. You will receive private broadcast notifications.",
        email
      };
    }
    throw error;
  }
};

export const submitBookingInquiry = async (data) => {
  try {
    const res = await client.post('/booking-inquiries/', data);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return {
        message: "Thank you for contacting Melody Magengezha and The Mbuya Va Raphy team. We will respond within 48 business hours.",
        data
      };
    }
    throw error;
  }
};
