"use client";
import React, { useRef, useState } from "react";

const ScreenRecorder: React.FC = () => {
  const screenRecording = useRef<HTMLVideoElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [displayMedia, setDisplayMedia] = useState<MediaStreamTrack | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);

  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
      });

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      setDisplayMedia(stream.getVideoTracks()[0]);

      const screenRecordingChunks: Blob[] = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          screenRecordingChunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(screenRecordingChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        if (screenRecording.current) {
          screenRecording.current.src = url;
        }

        if (displayMedia) {
          displayMedia.stop();
        }
      };

      recorder.start();
      setIsRecording(true); // Indicate recording started
    } catch (error) {
      console.error("Error starting screen recording:", error);
    }
  };

  const stopScreenRecording = () => {
    if (recorderRef.current && isRecording) {
      recorderRef.current.stop();
      setIsRecording(false); // Reset the recording state
    }
  };

  const ButtonStyle = {
    backgroundColor: "green",
    color: "white",
    fontSize: "2em",
    margin: "10px",
  };

  return (
    <>
      <button
        style={ButtonStyle}
        onClick={startScreenRecording}
        disabled={isRecording}
      >
        Start Recording
      </button>
      <button
        style={ButtonStyle}
        onClick={stopScreenRecording}
        disabled={!isRecording}
      >
        Stop Recording
      </button>
      <br />
      <br />
      <br />
      <video ref={screenRecording} height={300} width={600} controls />
    </>
  );
};

export default ScreenRecorder;
