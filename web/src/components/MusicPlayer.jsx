import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Download } from 'lucide-react';

const MusicPlayer = ({ audioUrl }) => {
    const containerRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        // Destroy previous instance
        if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
            wavesurferRef.current = null;
        }

        // Reset state
        setIsReady(false);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);

        if (!audioUrl) {
            return;
        }

        wavesurferRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#5a544a',
            progressColor: '#ff9f1c',
            cursorColor: '#ff9f1c',
            barWidth: 2,
            barGap: 2,
            barRadius: 1,
            height: 64,
            normalize: true,
        });

        wavesurferRef.current.load(audioUrl);

        wavesurferRef.current.on('ready', () => {
            setDuration(wavesurferRef.current.getDuration());
            setIsReady(true);
        });

        wavesurferRef.current.on('finish', () => setIsPlaying(false));
        wavesurferRef.current.on('audioprocess', () => {
            setCurrentTime(wavesurferRef.current.getCurrentTime());
        });

        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
                wavesurferRef.current = null;
            }
        };
    }, [audioUrl]);

    const togglePlay = () => {
        if (wavesurferRef.current && isReady) {
            wavesurferRef.current.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

    // Empty state - no audio URL
    if (!audioUrl) {
        return (
            <div
                className="card"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '160px',
                    borderStyle: 'dashed'
                }}
            >
                <span style={{ color: 'var(--text-ghost)', fontSize: '14px' }}>
                    Audio will appear here
                </span>
            </div>
        );
    }

    // Player (loading or ready)
    return (
        <div className="card" key={audioUrl}>
            <div className="waveform-wrap" style={{ marginBottom: '20px', minHeight: '64px' }}>
                <div ref={containerRef} />
                {!isReady && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '64px',
                        color: 'var(--text-ghost)',
                        fontSize: '12px'
                    }}>
                        Loading waveform...
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={togglePlay}
                        className="btn-play"
                        disabled={!isReady}
                        style={{ opacity: isReady ? 1 : 0.5 }}
                    >
                        {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} style={{ marginLeft: '2px' }} />}
                    </button>
                    <span className="mono" style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                        {fmt(currentTime)} <span style={{ color: 'var(--text-ghost)' }}>/</span> {fmt(duration)}
                    </span>
                </div>

                <a href={audioUrl} download className="btn-ghost">
                    <Download size={14} />
                    Download
                </a>
            </div>
        </div>
    );
};

export default MusicPlayer;
