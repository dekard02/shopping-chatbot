from transformers import pipeline

# Initialize once
tts = pipeline("text-to-speech", model="facebook/fastspeech2-en-ljspeech")

def text_to_speech(text):
    """Convert text to audio (returns path or raw audio bytes)."""
    speech = tts(text)
    audio = speech["audio"]
    return audio  # could save to file or return bytes
