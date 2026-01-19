import React from 'react';
import { Play } from 'lucide-react';

const HistorySidebar = ({ history, onSelect }) => {
    return (
        <aside
            className="hidden lg:flex flex-col"
            style={{
                width: '240px',
                height: '100%',
                background: 'var(--surface-deep)',
                borderRight: '1px solid var(--border-faint)',
                flexShrink: 0
            }}
        >
            {/* Header */}
            <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-faint)' }}>
                <span
                    className="mono"
                    style={{
                        fontSize: '11px',
                        color: 'var(--text-ghost)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em'
                    }}
                >
                    History ({history.length})
                </span>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
                {history.length === 0 ? (
                    <div style={{
                        padding: '40px 16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: 'var(--text-ghost)', fontSize: '13px' }}>
                            No tracks yet
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {history.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                    padding: '12px',
                                    background: 'transparent',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background 0.15s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: 'var(--radius-sm)',
                                        background: 'var(--surface-raised)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                >
                                    <Play size={12} fill="var(--text-ghost)" color="var(--text-ghost)" />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{
                                        fontSize: '13px',
                                        color: 'var(--text)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {item.tags.slice(0, 28)}...
                                    </p>
                                    <p
                                        className="mono"
                                        style={{ fontSize: '10px', color: 'var(--text-ghost)', marginTop: '2px' }}
                                    >
                                        {item.duration}s • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default HistorySidebar;
