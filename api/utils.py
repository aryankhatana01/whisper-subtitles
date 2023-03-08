import os
from pathlib import Path

import ffmpeg
import torch
import whisper
from whisper.utils import get_writer
import ffpb

def execute(stream, desc=None):
    if desc: 
        print(desc)
    args = ffmpeg.get_args(stream)
    ffpb.main(args)


def set_workdir(folder):
    folder = os.path.abspath(folder)
    if not os.path.exists(folder):
        os.mkdir(folder)
    os.chdir(folder)
    assert os.getcwd() == folder
    return folder


def transcribe(video_in, output_dir, model="small", model_dir="../model/"):
    video_in = Path(video_in).absolute()
    output_dir = set_workdir(output_dir)
    audio_file = video_in.stem + ".aac"
    stream = (
        ffmpeg
        .input(video_in)
        .output(audio_file, vn=None, acodec='copy')
        .overwrite_output()
    )
    execute(stream, desc=f"Converting {video_in.name} to {audio_file}...")

    gpu = torch.cuda.is_available()
    model = whisper.load_model(model, download_root=model_dir)
    result = model.transcribe(
        audio_file, 
        task="transcribe", 
        language=None, 
        verbose=True, 
        fp16=gpu
    )
    writer = get_writer("srt", ".")

    writer(result, video_in.stem)
    srt_file = video_in.stem + ".srt"

    assert os.path.exists(srt_file), f"SRT file not generated?"

    for file in os.listdir():
        if file.endswith('.ass') or file.endswith('.aac'):
            os.remove(file)
    print(f"Output -> {output_dir}")


if __name__=="__main__":
    transcribe("api/test.mp4", "result/")
