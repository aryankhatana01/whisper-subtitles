# Subtitle Generator using OpenAI Whisper

Steps to run the code:

- Clone the repository
- Install the requirements / Anaconda environment
- Install the `ffmpeg` package using `sudo apt install ffmpeg` if you're using Linux or `brew install ffmpeg` if using MacOS.
- Create a `saved_videos` directory in the `root` of the project and `result` directory in `api/`.
- Download The model using the following command:
    - `python3 download_model.py`
- In One terminal run the following command to start the server:
    - `chmod +x start_server.sh`
    - `./start_server.sh`
- In another terminal run the following command to start the client:
    - `npm install`
    - `npm start`
