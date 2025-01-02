export * from './types';
export * from './face-swap';

import { VideoItem } from './types';
import { faceSwapVideo } from './face-swap';

export const allVideo: VideoItem[] = [
    ...faceSwapVideo,
];

export default allVideo;

