import React from 'react';
import { useAppStore } from '../store/useAppStore';

const AdvancedDrawer = ({ isOpen, onClose }) => {
    const { params, updateParam } = useAppStore();

    const handleChange = (key, value) => {
        updateParam(key, parseFloat(value));
    };

    const fmt = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return m > 0 ? `${m}:${sec.toString().padStart(2, '0')}` : `${s}s`;
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(10, 9, 8, 0.8)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 40
                }}
            />

            {/* Panel */}
            <div
                style={{
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    height: '100%',
                    width: '320px',
                    background: 'var(--surface-deep)',
                    borderLeft: '1px solid var(--border-faint)',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    borderBottom: '1px solid var(--border-faint)'
                }}>
                    <span
                        className="mono"
                        style={{
                            fontSize: '11px',
                            color: 'var(--text-ghost)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em'
                        }}
                    >
                        Settings
                    </span>
                    <button onClick={onClose} className="btn-icon" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflow: 'auto', padding: '32px 24px' }}>

                    {/* Duration */}
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text)' }}>Duration</span>
                            <span
                                className="mono"
                                style={{
                                    fontSize: '12px',
                                    padding: '4px 10px',
                                    background: 'var(--surface-raised)',
                                    borderRadius: '4px',
                                    color: 'var(--amber)'
                                }}
                            >
                                {fmt(params.duration_s)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="240"
                            step="5"
                            value={params.duration_s}
                            onChange={(e) => handleChange('duration_s', e.target.value)}
                        />
                        <div className="mono" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '10px',
                            color: 'var(--text-ghost)',
                            marginTop: '8px'
                        }}>
                            <span>10s</span>
                            <span>4:00</span>
                        </div>
                    </div>

                    <div className="divider" />

                    {/* Temperature */}
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text)' }}>Temperature</span>
                            <span className="mono" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                                {params.temperature.toFixed(1)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="2.0"
                            step="0.1"
                            value={params.temperature}
                            onChange={(e) => handleChange('temperature', e.target.value)}
                        />
                        <p style={{ fontSize: '11px', color: 'var(--text-ghost)', marginTop: '8px' }}>
                            Creativity level
                        </p>
                    </div>

                    <div className="divider" />

                    {/* CFG */}
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text)' }}>CFG Scale</span>
                            <span className="mono" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                                {params.cfg_scale.toFixed(1)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1.0"
                            max="5.0"
                            step="0.5"
                            value={params.cfg_scale}
                            onChange={(e) => handleChange('cfg_scale', e.target.value)}
                        />
                        <p style={{ fontSize: '11px', color: 'var(--text-ghost)', marginTop: '8px' }}>
                            Prompt adherence
                        </p>
                    </div>

                    <div className="divider" />

                    {/* Top K */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text)' }}>Top K</span>
                            <span className="mono" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                                {params.topk}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={params.topk}
                            onChange={(e) => handleChange('topk', e.target.value)}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default AdvancedDrawer;
