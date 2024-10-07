"use client";

import React, { useRef, useState } from "react";

import { Button } from "./ui/button";

interface ScreenRecorderProps {
  onRecordingComplete: (src: string) => void;
}

const ScreenRecorder: React.FC<ScreenRecorderProps> = ({
  onRecordingComplete,
}) => {
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

        onRecordingComplete(url);
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
      recorderRef.current.stream?.getTracks().forEach((track) => track.stop()); // Stop all tracks
      setIsRecording(false); // Reset the recording state
    }
  };

  return (
    <div className="flex flex-row gap-2">
      {!isRecording && (
        <Button
          onClick={startScreenRecording}
          disabled={isRecording}
          className="bg-green-600"
        >
          Start Recording
        </Button>
      )}

      {isRecording && (
        <Button
          onClick={stopScreenRecording}
          disabled={!isRecording}
          className="bg-red-800"
        >
          Stop Recording
        </Button>
      )}
    </div>
  );
};

export default ScreenRecorder;
