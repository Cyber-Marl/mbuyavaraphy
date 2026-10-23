import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBroadcast from './components/HeroBroadcast';
import EpisodeHub from './components/EpisodeHub';
import VideoPlayerModal from './components/VideoPlayerModal';
import AskMbuyaCorner from './components/AskMbuyaCorner';
import HostSpotlight from './components/HostSpotlight';
import GuestCarousel from './components/GuestCarousel';
import PartnershipSection from './components/PartnershipSection';
import CrisisHotlineBanner from './components/CrisisHotlineBanner';
import Footer from './components/Footer';
import { WatchlistProvider } from './context/WatchlistContext';
import { fetchEpisodes, fetchFeaturedEpisode, fetchGuests } from './services/api';
import { Toaster } from 'sonner';

export default function App() {
  const [episodes, setEpisodes] = useState([]);
  const [featuredEpisode, setFeaturedEpisode] = useState(null);
  const [guests, setGuests] = useState([]);
  const [selectedEpisodeForModal, setSelectedEpisodeForModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [episodesData, featuredData, guestsData] = await Promise.all([
          fetchEpisodes(),
          fetchFeaturedEpisode(),
          fetchGuests(),
        ]);
        setEpisodes(episodesData);
        setFeaturedEpisode(featuredData);
        setGuests(guestsData);
      } catch (err) {
        console.error("Error loading broadcast data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleWatchLatest = () => {
    if (featuredEpisode) {
      setSelectedEpisodeForModal(featuredEpisode);
    } else if (episodes.length > 0) {
      setSelectedEpisodeForModal(episodes[0]);
    }
  };

  const handleSelectWatchlistTab = () => {
    setActiveCategory('watchlist');
    const el = document.getElementById('episodes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <WatchlistProvider>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-brand-cream text-brand-charcoal flex flex-col font-sans selection:bg-brand-terracotta selection:text-white">
        
        {/* Sticky Header */}
        <Navbar
          onWatchLatest={handleWatchLatest}
          onSelectWatchlistTab={handleSelectWatchlistTab}
        />

        {/* Hero Section */}
        <HeroBroadcast
          episode={featuredEpisode || episodes[0]}
          onPlayVideo={(ep) => setSelectedEpisodeForModal(ep)}
        />

        {/* Episode Catalog Hub */}
        <EpisodeHub
          episodes={episodes}
          onPlayEpisode={(ep) => setSelectedEpisodeForModal(ep)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Confidential Advice Corner */}
        <AskMbuyaCorner />

        {/* Host Spotlight: Melody Magengezha */}
        <HostSpotlight
          onRequestBooking={() => setIsPartnershipModalOpen(true)}
        />

        {/* Distinguished Guest Faculty */}
        <GuestCarousel guests={guests} />

        {/* Sponsorship & Media Kit */}
        <PartnershipSection
          isModalOpen={isPartnershipModalOpen}
          setIsModalOpen={setIsPartnershipModalOpen}
        />

        {/* 24/7 Crisis Helplines */}
        <CrisisHotlineBanner />

        {/* Global Broadcast Footer */}
        <Footer />

        {/* Video / Audio Player Modal */}
        {selectedEpisodeForModal && (
          <VideoPlayerModal
            episode={selectedEpisodeForModal}
            onClose={() => setSelectedEpisodeForModal(null)}
          />
        )}

      </div>
    </WatchlistProvider>
  );
}
