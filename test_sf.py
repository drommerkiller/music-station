import soundfile
import numpy as np
print(f"Soundfile version: {soundfile.__version__}")
try:
    data = np.zeros((16000, 1))
    soundfile.write("test_sf.wav", data, 16000)
    print("Soundfile write successful")
except Exception as e:
    print(f"Soundfile write failed: {e}")
