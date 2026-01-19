import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_Base = "http://localhost:8000";
const MAX_QUEUE_SIZE = 4;

/**
 * Main application store with persistence
 */
export const useAppStore = create(
    persist(
        (set, get) => ({
            // === HISTORY (persisted) ===
            history: [],

            addToHistory: (track) => {
                set(state => ({
                    history: [track, ...state.history].slice(0, 50) // Keep last 50
                }));
            },

            clearHistory: () => set({ history: [] }),

            // === CURRENT AUDIO (not persisted - handled separately) ===
            currentAudioUrl: null,

            setCurrentAudio: (url) => set({ currentAudioUrl: url }),

            // === QUEUE STATE ===
            queue: [],
            currentJob: null,
            isProcessing: false,

            // Add to queue (max 4 pending)
            addToQueue: (item) => {
                const state = get();
                if (state.queue.length >= MAX_QUEUE_SIZE) {
                    console.warn("Queue is full");
                    return false;
                }

                const newItem = {
                    ...item,
                    id: Date.now() + Math.random(),
                    addedAt: new Date().toISOString(),
                    status: 'pending'
                };

                set(state => ({ queue: [...state.queue, newItem] }));

                // Start processing if not already
                if (!state.isProcessing) {
                    get().processQueue();
                }

                return true;
            },

            // Remove from queue
            removeFromQueue: (id) => {
                set(state => ({
                    queue: state.queue.filter(item => item.id !== id)
                }));
            },

            // Process the queue
            processQueue: async () => {
                const state = get();

                if (state.isProcessing || state.queue.length === 0) {
                    return;
                }

                // Get and remove the first item
                const [job, ...remaining] = state.queue;

                set({
                    isProcessing: true,
                    currentJob: job,
                    queue: remaining
                });

                try {
                    const response = await axios.post(`${API_Base}/generate`, {
                        lyrics: job.lyrics,
                        tags: job.tags,
                        ...job.params
                    });

                    const audioUrl = `${API_Base}${response.data.url}`;

                    const completedTrack = {
                        id: job.id,
                        tags: job.tags,
                        lyrics: job.lyrics,
                        duration: job.params.duration_s,
                        url: audioUrl,
                        timestamp: new Date().toISOString()
                    };

                    // Add to history and set as current
                    get().addToHistory(completedTrack);
                    set({ currentAudioUrl: audioUrl });

                } catch (error) {
                    console.error("Generation failed:", error);
                } finally {
                    set({ isProcessing: false, currentJob: null });

                    // Process next if queue has more
                    if (get().queue.length > 0) {
                        setTimeout(() => get().processQueue(), 100);
                    }
                }
            },

            // === FORM STATE (not persisted) ===
            tags: '',
            lyrics: '',
            params: {
                duration_s: 60,
                temperature: 1.0,
                topk: 50,
                cfg_scale: 1.5,
                seed: null,  // null = random, number = fixed seed
            },

            setTags: (tags) => set({ tags }),
            setLyrics: (lyrics) => set({ lyrics }),
            setParams: (params) => set({ params }),
            updateParam: (key, value) => set(state => ({
                params: { ...state.params, [key]: value }
            })),

            // === UI STATE ===
            activeTab: 'generate',
            isDrawerOpen: false,

            setActiveTab: (tab) => set({ activeTab: tab }),
            setDrawerOpen: (open) => set({ isDrawerOpen: open }),

            // === EDITOR STATE ===
            selectedEditorTrack: null,
            editorIframeKey: 0, // Used to force iframe refresh

            setSelectedEditorTrack: (track) => set({
                selectedEditorTrack: track,
                editorIframeKey: Date.now() // Force iframe refresh
            }),

            // === HELPERS ===
            canAddToQueue: () => {
                const state = get();
                return state.queue.length < MAX_QUEUE_SIZE;
            },

            getQueueCount: () => {
                const state = get();
                return state.queue.length + (state.currentJob ? 1 : 0);
            }
        }),
        {
            name: 'heartlib-storage',
            partialize: (state) => ({
                // Only persist these fields
                history: state.history,
                params: state.params,
            }),
        }
    )
);
