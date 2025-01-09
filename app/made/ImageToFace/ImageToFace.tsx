import { FC, useState, ChangeEvent } from 'react';
import { Button, Modal, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import CreationType from '@/components/CreationType';
import GenerateButton from '@/components/GenerateButton';
import request from '../../../utils/api';
import Notification from '@/components/Notification';

type SeverityType = 'success' | 'info' | 'warning' | 'error';
interface SwapFaceImageParams {
    code: number;
    msg: string;
}
interface ImageUploadProps {
    maxSizeInMB: number;
    onImageUpload: (file: File) => void;
}

const ImageToFace: FC<ImageUploadProps> = ({ maxSizeInMB, onImageUpload }) => {
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [baseImage, setBaseImage] = useState<string | null>(null);
    const [faceImage, setFaceImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [promptId, setPromptId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [severityType, setSeverity] = useState<SeverityType>('info');
    const [messages, setMessages] = useState('');
    const [notificationOpen, setNotificationOpen] = useState({
        transaction: false,
        second: false,
        third: false,
    });

    const handleGenerate = async () => {
        if (!baseImage || !faceImage) {
            handleNotificationOpen('transaction', 'Please upload both images before generating.', 'warning');
            return;
        }

        setLoading(true);
        setResultImage(null);

        let swapFaceImageData = {
            op: "swapFaceImage",
            params: {
                pid: "1866093222705504256",
                images: [baseImage, faceImage]
            }
        };

        try {
            const createdImage = await request<SwapFaceImageParams>('post', '/v1', swapFaceImageData);
            if (createdImage.code === 200 && createdImage.msg) {
                setPromptId(createdImage.msg);
                await checkImageStatus(createdImage.msg);
            } else {
                handleNotificationOpen('transaction', 'Creation failed!', 'error');
                setLoading(false);
            }
        } catch (error) {
            handleNotificationOpen('transaction', 'Creation failed!', 'error');
            setLoading(false);
        } finally {
        }
    };

    const checkImageStatus = async (id: string) => {
        let attempts = 0;
        const maxAttempts = 300;
        const interval = 4000;

        const checkStatus = async () => {
            if (attempts >= maxAttempts) {
                clearInterval(statusCheck);
                handleNotificationOpen('transaction', 'Image generation timed out. Please try again.', 'warning');
                return;
            }
            let dataCheck = {
                op: "check",
                params: {
                    pid: "1866093222705504256",
                    prompt_id: id
                }
            };

            try {
                const response = await request<SwapFaceImageParams>('post', '/v1', dataCheck);
                if (response.code === 200 && response.msg !== "pending") {
                    clearInterval(statusCheck);
                    setResultImage(response.msg);

                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);

                }
            } catch (error) {
                setLoading(false);
                console.error("Error checking image status:", error);
            }
            attempts++;
        };
        const statusCheck = setInterval(checkStatus, interval);
        await checkStatus();
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, setImage: (image: string | null) => void) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                handleNotificationOpen('transaction', 'The file size cannot exceed 2MB!', 'warning');
                event.target.value = '';
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImage(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleDownload = () => {
        if (resultImage) {
            const link = document.createElement('a');
            link.href = resultImage;
            link.download = 'face-swap-result.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const ImageUploadArea = ({ image, onUpload, label }: { image: string | null, onUpload: (event: ChangeEvent<HTMLInputElement>) => void, label: string }) => (
        <div className="w-full mb-4">
            <div className="opacity-80 mb-2 md:mb-2">
                {label}
            </div>
            <div className="relative h-[60px] md:h-[150px] border-1 border-dashed rounded-lg overflow-hidden" style={{
                borderColor: "#3b414e",
            }}>
                {image ? (
                    <>
                        <img src={image} alt={label} style={{
                            margin: "auto",
                            width: "auto",
                            height: "100%",
                            objectFit: "cover",
                        }} />
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                padding: "2px 12px",
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                background: '#00cae0',
                                textTransform: "none",
                                '&:hover': {
                                    background: 'rgba(26, 98, 224, 0.8)',
                                },
                            }}
                        >
                            Re-upload
                            <input
                                type="file"
                                hidden
                                accept="image/*"
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
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={onUpload}
                        />
                    </Button>
                )}
            </div>
        </div>
    );
    const handleNotificationClose = (key: string) => (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotificationOpen((prev) => ({ ...prev, [key]: false }));
    };
    const handleNotificationOpen = (key: string, message: string, type: 'success' | 'error' | 'warning') => {
        setMessages(message);
        setSeverity(type);
        setNotificationOpen((prev) => ({ ...prev, [key]: true }));
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between w-full mx-auto h-full overflow-y-auto">
            <div className="w-full md:w-1/5 p-2 md:px-4 md:mr-4 mb-8 md:mb-0 flex flex-col h-full overflow-y-auto rounded-[14px]  min-h-[288px] md:max-h-[100%] aside-left" style={{
                background: "#1d2129",
            }}>
                <div className='aside-config'>
                    <ImageUploadArea
                        image={baseImage}
                        onUpload={(e) => handleImageUpload(e, setBaseImage)}
                        label="Your face (Max Size 2M)"
                    />
                    <ImageUploadArea
                        image={faceImage}
                        onUpload={(e) => handleImageUpload(e, setFaceImage)}
                        label="Image to be replaced (Max Size 2M)"
                    />
                </div>

                <div className='foot-main md:pb-4'>
                    {/* <div className="mt-4">
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            disabled={!resultImage}
                            fullWidth
                        >
                            Download Image
                        </Button>
                    </div> */}
                    <div className="mt-4">
                        <GenerateButton
                            text="Generate"
                            loading={loading}
                            onClick={handleGenerate}
                            isDisabled={isDisabled || !baseImage || !faceImage}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-4/5 p-2 md:p-4  rounded-[14px]" style={{
                background: "#1d2129"
            }}>
                <div className="mb-2 opacity-80">
                    Generated Image
                </div>
                <div className="result flex flex-col justify-center items-center h-full rounded-lg p-4 min-h-[240px]">
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
                            <p>Generating image, please wait...</p>
                        </div>
                    ) : resultImage ? (
                        <img
                            src={resultImage}
                            alt="Generated Image"
                            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg cursor-pointer"
                            onClick={handleOpenModal}
                        />
                    ) : (
                        <div className="text-gray-500">
                            Please upload both images and click generate to create a face-swapped image
                        </div>
                    )}
                </div>
            </div>

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="image-modal"
                aria-describedby="fullscreen-image-modal"
            >
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <img
                            src={resultImage || ''}
                            alt="Generated Image Fullscreen"
                            className="max-w-full max-h-full object-contain"
                        />
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseModal}
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
            <Notification
                open={notificationOpen.transaction}
                onClose={handleNotificationClose('transaction')}
                message={messages}
                severity={severityType}
                autoHideDuration={2000}
            />
        </div>
    );
};

export default ImageToFace;

