"use client";

import { GridImgList } from "@/components/GridImg/GridImg";
import { GridVideoList } from "@/components/GridVideo/GridVideo";
import { animeTransferImages, faceSwapImages, realisticTransferImages, charactersPictureImages } from "../../config/images/index";
import { faceSwapVideo } from "../../config/video/index";


const Creator = () => {
    const temp = [...faceSwapVideo]

    return (
        <>
            <div className="w-full">
                <GridVideoList
                    title="Image to Video"
                    modelNames="face-swap"
                    items={temp}
                    viewAllLink="/browse/anime-transfer"
                />
                <GridImgList
                    title="Image-to-Image Translation"
                    modelNames="anime-transfer"
                    items={animeTransferImages}
                    viewAllLink="/browse/anime-transfer"
                />

                <GridImgList
                    title="Text to Image"
                    modelNames="characters-picture"
                    items={charactersPictureImages}
                    viewAllLink="/browse/anime-transfer"
                />
                <GridImgList
                    title="FaceSwapping"
                    modelNames="face-swap-img"
                    items={faceSwapImages}
                    viewAllLink="/browse/anime-transfer"
                />
            </div>

        </>
    );
};

export default Creator;
