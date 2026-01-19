import React from 'react';
import { Settings2, Zap, Music, Scissors, Plus } from 'lucide-react';
import { useAppStore } from './store/useAppStore';
import AudioPromptInput from './components/AudioPromptInput';
import LyricsInput from './components/LyricsInput';
import AdvancedDrawer from './components/AdvancedDrawer';
import MusicPlayer from './components/MusicPlayer';
import HistorySidebar from './components/HistorySidebar';
import QueuePanel from './components/QueuePanel';
import EditorTab from './components/EditorTab';

function App() {
  const {
    tags,
    setTags,
    lyrics,
    setLyrics,
    params,
    currentAudioUrl,
    setCurrentAudio,
    activeTab,
    setActiveTab,
    isDrawerOpen,
    setDrawerOpen,
    history,
    queue,
    currentJob,
    isProcessing,
    addToQueue,
    removeFromQueue,
    canAddToQueue
  } = useAppStore();

  const handleGenerate = () => {
    if (!tags.trim()) return;
    if (!canAddToQueue()) return;

    addToQueue({
      tags,
      lyrics,
      params: { ...params }
    });
  };

  const handleSelectHistory = (item) => {
    setCurrentAudio(item.url);
    setTags(item.tags);
  };

  const queueSlots = 4 - queue.length - (currentJob ? 1 : 0);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--void)' }}>
      {/* Sidebar - only show in generate tab */}
      {activeTab === 'generate' && (
        <HistorySidebar history={history} onSelect={handleSelectHistory} />
      )}

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Tab Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '56px',
            borderBottom: '1px solid var(--border-faint)',
            background: 'var(--surface-deep)',
            flexShrink: 0
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('generate')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: activeTab === 'generate' ? 'var(--surface)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: activeTab === 'generate' ? 'var(--text-bright)' : 'var(--text-dim)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Music size={16} />
              Generate
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: activeTab === 'editor' ? 'var(--surface)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: activeTab === 'editor' ? 'var(--text-bright)' : 'var(--text-dim)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Scissors size={16} />
              Editor
            </button>
          </div>

          {/* Settings button */}
          {activeTab === 'generate' && (
            <button onClick={() => setDrawerOpen(true)} className="btn-icon">
              <Settings2 size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === 'generate' ? (
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
            <div style={{ width: '100%', maxWidth: '640px' }}>

              {/* Inputs */}
              <div className="animate-fadeUp">
                <AudioPromptInput value={tags} onChange={setTags} />
              </div>
              <div className="animate-fadeUp delay-1" style={{ marginTop: '24px' }}>
                <LyricsInput value={lyrics} onChange={setLyrics} />
              </div>

              {/* Generate / Add to Queue */}
              <div className="animate-fadeUp delay-2" style={{ marginTop: '40px' }}>
                <button
                  onClick={handleGenerate}
                  disabled={!tags.trim() || !canAddToQueue()}
                  className="btn-generate"
                  style={{ opacity: canAddToQueue() ? 1 : 0.5 }}
                >
                  {isProcessing ? (
                    <>
                      <Plus size={18} />
                      Add to Queue ({queueSlots} slots left)
                    </>
                  ) : (
                    <>
                      <Zap size={18} />
                      Generate
                    </>
                  )}
                </button>

                <div
                  className="mono"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '32px',
                    marginTop: '20px',
                    fontSize: '11px',
                    color: 'var(--text-ghost)'
                  }}
                >
                  <span>{params.duration_s}s</span>
                  <span>temp {params.temperature}</span>
                  <span>cfg {params.cfg_scale}</span>
                </div>
              </div>

              {/* Output */}
              <div className="animate-fadeUp delay-3" style={{ marginTop: '64px' }}>
                <span className="field-label">Output</span>
                <MusicPlayer audioUrl={currentAudioUrl} />
              </div>

            </div>
          </div>
        ) : (
          <EditorTab />
        )}

        <AdvancedDrawer
          isOpen={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </main>

      {/* Queue Panel - floating */}
      <QueuePanel
        queue={queue}
        currentJob={currentJob}
        onRemove={removeFromQueue}
      />
    </div>
  );
}

export default App;
