export * from './types';
export * from './anime-transfer';
export * from './face-swap';
export * from './realistic-transfer';
export * from './characters-picture';

import { ImageItem } from './types';
import { animeTransferImages } from './anime-transfer';
import { faceSwapImages } from './face-swap';
import { realisticTransferImages } from './realistic-transfer';
import { charactersPictureImages } from './characters-picture';

export const allImages: ImageItem[] = [
    ...animeTransferImages,
    ...faceSwapImages,
    ...realisticTransferImages,
    ...charactersPictureImages
];

export default allImages;

