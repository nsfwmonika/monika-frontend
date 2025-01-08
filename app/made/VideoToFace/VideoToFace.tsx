import { FC, useState, ChangeEvent } from 'react';
import { Button, TextField, Modal, IconButton } from '@mui/material';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import GenerateButton from '@/components/GenerateButton';

interface Character {
    id: number;
    name: string;
    avatar: string;
}

const VideoToFace: FC = () => {
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [faceImage, setFaceImage] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [resultVideo, setResultVideo] = useState<string | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [promptText, setPromptText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            setResultVideo('/path/to/result/video.mp4');
            setLoading(false);
        }, 3000);
    };

    const handleFaceImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFaceImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleDownload = () => {
        if (resultVideo) {
            const link = document.createElement('a');
            link.href = resultVideo;
            link.download = 'face-swap-result.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const UploadArea = ({ file, onUpload, label, accept }: { file: string | File | null, onUpload: (event: ChangeEvent<HTMLInputElement>) => void, label: string, accept: string }) => (
        <div className="w-full mb-4">
            <div className="opacity-80 mb-2">
                {label}
            </div>
            <div className="relative h-40 border-1 rounded-lg overflow-hidden">
                {file ? (
                    <>
                        {typeof file === 'string' ? (
                            <img src={file} alt={label} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">
                                <VideoFileIcon fontSize="large" />
                                <span className="ml-2">{file.name}</span>
                            </div>
                        )}
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                background: 'rgba(30, 112, 255, 0.8)',
                                '&:hover': {
                                    background: 'rgba(26, 98, 224, 0.8)',
                                },
                            }}
                        >
                            Re-upload
                            <input
                                type="file"
                                hidden
                                accept={accept}
                                onChange={onUpload}
                            />
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            width: '100%',
                            height: '100%',
                            color: '#cdd9e1',
                            textTransform: "none",
                            background: "#323a45",
                            border: "none",
                            '&:hover': {
                                background: '#424b5a',
                            },
                        }}
                    >
                        Upload {accept === 'image/*' ? 'Image' : 'Video'}
                        <input
                            type="file"
                            hidden
                            accept={accept}
                            onChange={onUpload}
                        />
                    </Button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row justify-between w-full mx-auto h-full">
            <div className="w-full md:w-1/5 md:p-4 mr-4 mb-8 md:mb-0 flex flex-col h-full overflow-y-auto rounded-[14px] aside-left" style={{
                background: "#1d2129"
            }}>
                <div className='aside-config'>
                    {/* <div className="mt-4 opacity-80">
                        Describe your video
                    </div>
                    <div className="mt-2 mb-6">
                        <TextField
                            id="outlined-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            placeholder="Please enter the prompt word"
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            sx={{
                                width: "100%",
                                background: "#25262b",
                                borderRadius: "6px",
                                border: "1px solid rgb(55, 58, 64)",
                                '& .MuiInputBase-input': {
                                    color: '#ffffff',
                                    borderColor: "#434756",
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    opacity: 1,
                                    borderColor: "#434756",
                                },
                            }}
                        />
                    </div> */}
                    <UploadArea
                        file={faceImage}
                        onUpload={handleFaceImageUpload}
                        label="Please upload your face"
                        accept="image/*"
                    />
                    <UploadArea
                        file={videoFile}
                        onUpload={handleVideoUpload}
                        label="Please upload the video to be replaced"
                        accept="video/*"
                    />
                </div>
                <div className='foot-main pb-4'>
                    <div className="mt-4">
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            disabled={!resultVideo}
                            fullWidth
                        >
                            Download Video
                        </Button>
                    </div>
                    <div className="mt-4">
                        <GenerateButton
                            text="Generate"
                            loading={loading}
                            onClick={handleGenerate}
                            isDisabled={isDisabled || !faceImage || !videoFile}
                        />
                    </div>

                </div>
            </div>

            <div className="w-full md:w-4/5 md:p-4  rounded-[14px] aside-left" style={{
                background: "#1d2129"
            }}>
                <div className="mb-2 opacity-80">
                    Generated Video
                </div>
                <div className="result flex flex-col justify-center items-center h-full rounded-lg p-4">
                    {loading ? (
                        <div className="flex flex-col items-center">
                            <svg
                                style={{
                                    animation: "rotate 1s linear infinite",
                                }}
                                className="icon mb-4"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="4480"
                                width="48"
                                height="48"
                            >
                                <path
                                    d="M64 512a448 448 0 1 0 448-448 32 32 0 0 0 0 64 384 384 0 1 1-384 384 32 32 0 0 0-64 0z"
                                    fill="#ff842d"
                                    p-id="4481"
                                ></path>
                            </svg>
                            <p>Generating video, please wait...</p>
                        </div>
                    ) : resultVideo ? (
                        <video
                            src={resultVideo}
                            controls
                            className="max-w-full max-h-[70vh] rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        />
                    ) : (
                        <div className="text-gray-500">
                            Please upload a face image and a video, then click generate to create a new video
                        </div>
                    )}
                </div>
            </div>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="video-modal"
                aria-describedby="fullscreen-video-modal"
            >
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <video
                            src={resultVideo || ''}
                            controls
                            className="max-w-full max-h-full"
                        />
                        <IconButton
                            aria-label="close"
                            onClick={() => setIsModalOpen(false)}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'white',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default VideoToFace;

