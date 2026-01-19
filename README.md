# 🎵 Music Station

**The ultimate AI-powered Analog Audio Lab.** 

Music Station combines state-of-the-art music foundation models with a professional, warm-analog editing environment. Generate, queue, and edit your tracks in one seamless workflow.

---

## ✨ Features

### 🎹 Pro AI Generation
- **Intelligent Prompting**: Condition music on lyrics and tags with multilingual support (English, Chinese, Japanese, Korean, Spanish).
- **Sequential Queue**: Queue up to 4 tracks at once. Our sequential processor handles them one by one while you work.
- **Concurrent Playback**: Never stop the music. Listen to your library while new generations are processing in the background.

### ✂️ Integrated Audio Editor
- **Studio-Grade Editing**: Trim, normalize, gain control, fades, and reverse effects.
- **Live Visualizers**: High-performance waveform and spectrum analyzers with a curated warm-analog color scheme.
- **Seamless Loading**: One-click track importing from your generation history directly into the editor.

### 📁 Smart Library
- **Persistent History**: Your generations are automatically saved to your local session history.
- **One-Click Recall**: Instantly load any previous track into the player or editor.
- **Waveform Previews**: Visual representation of all your historical tracks.

---

## 🎨 Aesthetics: The Analog Audio Lab
Music Station is designed with a **"Void-Amber"** aesthetic—a curated dark mode inspired by vintage rack gear and analog meters:
- **Primary Accent**: Analog Amber (`#ff9f1c`)
- **Background**: Deep Void (`#0a0908`)
- **Texture**: Subtle grain and micro-animations for a premium studio feel.

---

## 🚀 Roadmap

### 🏁 Phase 1: Stem Separation (Next)
- **AI Stem Extraction**: Isolate Vocals, Drums, Bass, and Piano using **Demucs v4**.
- **Multitrack Editing**: Mix and edit individual stems per track.

### 🎛️ Phase 2: Professional FX
- **Web Audio FX (Tuna.js)**: Integrated Parametric EQ, Compression, Reverb, and Delay.
- **Master Bus**: Finalize your tracks with stereo width and LUFS metering.

---

## 🛠️ Local Deployment

### ⚙️ Environment Setup
We recommend using `python=3.10`.

1. **Clone and Install**:
```bash
git clone https://github.com/HeartMuLa/heartlib.git
cd heartlib
pip install -e .
```

2. **Download Models**:
```bash
# Hugging Face
hf download --local-dir './ckpt' 'HeartMuLa/HeartMuLaGen'
hf download --local-dir './ckpt/HeartMuLa-oss-3B' 'HeartMuLa/HeartMuLa-oss-3B'
hf download --local-dir './ckpt/HeartCodec-oss' 'HeartMuLa/HeartCodec-oss'
```

3. **Start the Station**:
```bash
# Start Backend
python app.py

# Start Frontend
cd web
npm install
npm run dev
```

---

## 🙏 Acknowledgements
Based on the **HeartMuLa** family of music foundation models. Special thanks to the researchers behind:
- **HeartCodec**: High-reconstruction fidelity music codec.
- **HeartTranscriptor**: Whisper-tuned lyrics transcription.
- **HeartCLAP**: Audio-text alignment for cross-modal retrieval.

---

## ⚖️ License
Licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). Non-commercial use only.

---

## � Contact
Encountering issues or want to collaborate? Reach out at `heartmula.ai@gmail.com`