import os
import torch
import soundfile as sf
from transformers import VitsModel, AutoTokenizer
from config import config

# ---------------------------
# Initialize model (load once)
# ---------------------------

# You can change this to any supported language (e.g., "facebook/mms-tts-eng")
TTS_MODEL_NAME = config.TTS_MODEL or "facebook/mms-tts-eng"

print(f"[TTS] Loading model: {TTS_MODEL_NAME}")
tokenizer = AutoTokenizer.from_pretrained(TTS_MODEL_NAME)
model = VitsModel.from_pretrained(TTS_MODEL_NAME)

# ---------------------------
# TTS Function
# ---------------------------

def text_to_speech(text: str, filename: str = "tts_output.wav") -> str:
    """
    Convert text to speech and save as a WAV file.
    Returns the path to the generated audio file.
    """
    if not text.strip():
        raise ValueError("Text input is empty")

    inputs = tokenizer(text, return_tensors="pt")

    # Generate waveform
    with torch.no_grad():
        output = model(**inputs).waveform

    # Convert to numpy
    audio = output.squeeze().numpy()

    # Save audio
    output_path = os.path.join(config.TTS_OUTPUT_DIR, filename)
    os.path.exists(config.TTS_OUTPUT_DIR) or os.makedirs(config.TTS_OUTPUT_DIR)
    sf.write(output_path, audio, samplerate=model.config.sampling_rate)
    print(f"[TTS] Audio saved to: {output_path}")

    return output_path


# ---------------------------
# Standalone Test
# ---------------------------

if __name__ == "__main__":
    sample_text = "Hello! This is a test of the English text to speech system."
    audio_path = text_to_speech(sample_text, "test_tts.wav")
    print(f"✅ Generated audio file: {audio_path}")
