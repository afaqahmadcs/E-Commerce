import os
import cv2

video_path = os.path.join("reference-video", "reference-video.mp4")
output_dir = "reference_frames"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print(f"Error opening video file {video_path}")
    exit(1)

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total_frames / fps
print(f"Video stats: FPS={fps}, Total Frames={total_frames}, Duration={duration:.2f}s")

# Extract at 0.5 second intervals
interval_secs = 0.5
num_samples = int(duration / interval_secs) + 1

extracted = []
for i in range(num_samples):
    sec = i * interval_secs
    frame_idx = int(sec * fps)
    if frame_idx >= total_frames:
        break
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        frame_name = f"frame_{sec:04.1f}s.jpg"
        out_path = os.path.join(output_dir, frame_name)
        cv2.imwrite(out_path, frame)
        extracted.append((sec, out_path))

cap.release()
print(f"Extracted {len(extracted)} frames to {output_dir}")

