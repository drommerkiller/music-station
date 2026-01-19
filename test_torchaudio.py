import torch
import torchaudio
import soundfile

print(f"Torchaudio version: {torchaudio.__version__}")
try:
    print(f"Available backends: {torchaudio.list_audio_backends()}")
except:
    print("list_audio_backends not available")

try:
    print(f"Soundfile version: {soundfile.__version__}")
except:
    print("Soundfile not imported correctly")

try:
    x = torch.zeros(1, 16000)
    torchaudio.save("test.wav", x, 16000)
    print("Save .wav successful")
except Exception as e:
    print(f"Save .wav failed: {e}")

try:
    x = torch.zeros(1, 16000)
    torchaudio.save("test.mp3", x, 16000)
    print("Save .mp3 successful")
except Exception as e:
    print(f"Save .mp3 failed: {e}")
