import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LyricsInput = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasContent = value.length > 0;

    useEffect(() => {
        if (hasContent && !isOpen) setIsOpen(true);
    }, [value]);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-faint)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="mono" style={{
                        fontSize: '11px',
                        color: 'var(--text-ghost)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Lyrics
                    </span>
                    {hasContent && <span className="badge">Active</span>}
                </div>
                <span style={{ color: 'var(--text-ghost)' }}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <textarea
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={"[Verse 1]\n...\n\n[Chorus]\n..."}
                            className="input-field mono"
                            style={{
                                marginTop: '12px',
                                minHeight: '180px',
                                fontSize: '13px'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LyricsInput;
