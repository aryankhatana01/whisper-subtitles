import whisper

def download_whisper(model="small", output_dir="model/"):
    model = whisper.load_model(model, download_root=output_dir)

if __name__ == "__main__":
    output_dir = "model/"
    model = "small"
    download_whisper(model=model, output_dir=output_dir)
