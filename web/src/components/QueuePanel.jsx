import React from 'react';
import { X, Loader2, Clock } from 'lucide-react';

const QueuePanel = ({ queue, currentJob, onRemove }) => {
    const totalInQueue = queue.length + (currentJob ? 1 : 0);

    if (totalInQueue === 0) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '320px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                zIndex: 30,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid var(--border-faint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--surface-raised)'
                }}
            >
                <span className="mono" style={{
                    fontSize: '11px',
                    color: 'var(--text-ghost)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    Generation Queue
                </span>
                <span className="mono" style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: 600 }}>
                    {totalInQueue}/4
                </span>
            </div>

            {/* Current job */}
            {currentJob && (
                <div
                    style={{
                        padding: '14px 18px',
                        background: 'var(--surface-deep)',
                        borderBottom: queue.length > 0 ? '1px solid var(--border-faint)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--amber)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <Loader2
                            size={16}
                            color="var(--void)"
                            style={{ animation: 'spin 1s linear infinite' }}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--text-bright)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {currentJob.tags.length > 35 ? currentJob.tags.slice(0, 35) + '...' : currentJob.tags}
                        </p>
                        <p className="mono" style={{ fontSize: '10px', color: 'var(--amber)', marginTop: '2px' }}>
                            Generating now...
                        </p>
                    </div>
                </div>
            )}

            {/* Pending items */}
            {queue.map((item, i) => (
                <div
                    key={item.id}
                    style={{
                        padding: '12px 18px',
                        borderBottom: i < queue.length - 1 ? '1px solid var(--border-faint)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                    }}
                >
                    <div
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'var(--surface-raised)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <Clock size={12} style={{ color: 'var(--text-ghost)' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                            fontSize: '12px',
                            color: 'var(--text)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {item.tags.length > 30 ? item.tags.slice(0, 30) + '...' : item.tags}
                        </p>
                        <p className="mono" style={{ fontSize: '9px', color: 'var(--text-ghost)', marginTop: '2px' }}>
                            Position {i + 1} in queue
                        </p>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        style={{
                            background: 'var(--surface-raised)',
                            border: 'none',
                            color: 'var(--text-ghost)',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '4px',
                            display: 'flex',
                            transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--surface-hover)';
                            e.currentTarget.style.color = 'var(--text)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--surface-raised)';
                            e.currentTarget.style.color = 'var(--text-ghost)';
                        }}
                    >
                        <X size={12} />
                    </button>
                </div>
            ))}

            {/* Spin animation */}
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default QueuePanel;
