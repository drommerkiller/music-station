import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const EditorTab = () => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const {
        history,
        selectedEditorTrack,
        setSelectedEditorTrack,
        editorIframeKey
    } = useAppStore();

    // Build iframe URL with audio param
    const getEditorUrl = () => {
        if (!selectedEditorTrack) return '/editor/index.html';
        const url = new URL('/editor/index.html', window.location.origin);
        url.searchParams.set('audio', selectedEditorTrack.url);
        return url.toString();
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Toolbar */}
            <div
                style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid var(--border-faint)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: 'var(--surface-deep)',
                    flexShrink: 0
                }}
            >
                <span
                    className="mono"
                    style={{
                        fontSize: '11px',
                        color: 'var(--text-ghost)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}
                >
                    Load Track:
                </span>

                {/* Track Selector Dropdown */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 14px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            color: selectedEditorTrack ? 'var(--text)' : 'var(--text-ghost)',
                            fontSize: '13px',
                            cursor: 'pointer',
                            minWidth: '200px',
                            justifyContent: 'space-between'
                        }}
                    >
                        <span style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '160px'
                        }}>
                            {selectedEditorTrack ? selectedEditorTrack.tags.slice(0, 25) + '...' : 'Select a track...'}
                        </span>
                        <ChevronDown size={14} />
                    </button>

                    {isDropdownOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                marginTop: '4px',
                                width: '320px',
                                maxHeight: '300px',
                                overflow: 'auto',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                zIndex: 100,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                            }}
                        >
                            {history.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-ghost)', fontSize: '13px' }}>
                                    No tracks generated yet.<br />
                                    <span style={{ fontSize: '11px' }}>Generate some tracks first.</span>
                                </div>
                            ) : (
                                history.map((track) => (
                                    <button
                                        key={track.id}
                                        onClick={() => {
                                            setSelectedEditorTrack(track);
                                            setIsDropdownOpen(false);
                                        }}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '12px 16px',
                                            background: selectedEditorTrack?.id === track.id ? 'var(--surface-raised)' : 'transparent',
                                            border: 'none',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid var(--border-faint)'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (selectedEditorTrack?.id !== track.id) {
                                                e.currentTarget.style.background = 'var(--surface-raised)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedEditorTrack?.id !== track.id) {
                                                e.currentTarget.style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '13px',
                                            color: 'var(--text)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {track.tags}
                                        </p>
                                        <p className="mono" style={{ fontSize: '10px', color: 'var(--text-ghost)', marginTop: '4px' }}>
                                            {track.duration}s • {new Date(track.timestamp).toLocaleTimeString()}
                                        </p>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {selectedEditorTrack && (
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--amber)' }}>
                        ✓ Loaded
                    </span>
                )}
            </div>

            {/* Editor iframe - always render, use key to force reload */}
            <div style={{ flex: 1, position: 'relative' }}>
                <iframe
                    key={editorIframeKey}
                    src={getEditorUrl()}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#0a0908'
                    }}
                    title="Audio Editor"
                />

                {/* Overlay when no track selected */}
                {!selectedEditorTrack && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: '16px',
                            color: 'var(--text-ghost)',
                            background: 'rgba(10, 9, 8, 0.8)',
                            pointerEvents: 'none'
                        }}
                    >
                        <p style={{ fontSize: '16px' }}>Select a track to edit</p>
                        <p style={{ fontSize: '13px' }}>Generated tracks will appear in the dropdown above</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditorTab;
