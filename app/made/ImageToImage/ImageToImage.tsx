import { FC, useState, ChangeEvent } from 'react';
import { Button, Modal, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CreationType from '@/components/CreationType';
import GenerateButton from '@/components/GenerateButton';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '@/components/Notification';

import request from '../../../utils/api';
type SeverityType = 'success' | 'info' | 'warning' | 'error';

interface ImageToImageParams {
    op: string;
    params: object;
    code: number;
    msg: string
}

const ImageToImage: FC = () => {
    const [selectedCreationType, setSelectedCreationType] = useState("1871453605469990912");
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [promptId, setPromptId] = useState("");
    const [resultImage, setResultImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [severityType, setSeverity] = useState<SeverityType>('info');
    const [messages, setMessages] = useState('');
    const [notificationOpen, setNotificationOpen] = useState({
        transaction: false,
        second: false,
        third: false,
    });

    const handleUnitSelect = async (item: CreationType) => {
        setSelectedCreationType(item.id);
    };

    const handleGenerate = async () => {
        let imageToImageData = {
            op: "imageToImage",
            params: {
                pid: selectedCreationType,
                images: [uploadedImage]
            }
        }
        setLoading(true);
        const createdImage = await request<ImageToImageParams>('post', '/v1', imageToImageData);
        if (createdImage.code === 200) {
            setPromptId(createdImage.msg)
            taskState(createdImage.msg)
        }else {
            handleNotificationOpen('transaction', createdImage.msg, 'error');
            setLoading(false);
        }
    };

    const taskState = async (id: any) => {
        let count = 0;
        const maxAttempts = 50;

        const checkStatus = () => {
            if (count >= maxAttempts) {
                setLoading(false)
                clearInterval(intervalId);
                return;
            }

            let dataCheck = {
                op: "check",
                params: {
                    pid: selectedCreationType,
                    prompt_id: id
                }
            };

            request<ImageToImageParams>('post', '/v1', dataCheck)
                .then((createdCheck) => {
                    if (createdCheck.code === 200) {
                        if (createdCheck.msg !== 'pending') {
                            setResultImage(createdCheck.msg)
                            clearInterval(intervalId);
                            setTimeout(() => {
                                setLoading(false)
                            }, 2000);
                        }
                    }else {
                        clearInterval(intervalId);
                        setLoading(false)
                        handleNotificationOpen('transaction', 'Generate exceptions!', 'warning');
                    }
                    count++;
                })
                .catch((error) => {
                    setLoading(false)
                    clearInterval(intervalId);
                });
        };
        const intervalId = setInterval(checkStatus, 4000);
    }

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                console.log(file.size)
                handleNotificationOpen('transaction', 'The file size cannot exceed 2MB!', 'warning');
                event.target.value = '';
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setUploadedImage(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleDownload = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = 'generated-image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const typeList = [{
        id: "1871453605469990912",
        name: "Convert to Anime"
    }, {
        id: "1871453732637093888",
        name: "Convert to Portrait"
    }, {
        id: "1871453397243768832",
        name: "Pixel"
    }, {
        id: "1871461542242398208",
        name: "Imitation Photo"
    }];
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
        <div className="flex flex-col md:flex-row md:justify-between w-full mx-auto h-full">
            <div className="w-full md:w-1/5 p-2 md:px-4 mr-4 mb-8 md:mb-0 flex flex-col md:h-full overflow-y-auto rounded-[14px] aside-left" style={{
                background: "#1d2129"
            }}>
                <div className='aside-config'>
                    <div>
                        <CreationType
                            typeList={typeList}
                            selectedType={selectedCreationType}
                            onCreationTypeSelect={handleUnitSelect}
                            disabled={false}
                        />
                    </div>
                    <div className="mt-4 opacity-80">
                        Upload your image (Max Size 2M)
                    </div>
                    <div className="mt-2 h-[150px] relative border-1 border-dashed rounded-lg overflow-hidden" style={{
                        borderColor: "#3b414e"
                    }}>
                        {uploadedImage ? (
                            <>
                                <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain" />
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
                                            background: '#00cae0',
                                        },
                                    }}
                                >
                                    Re-upload
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageUpload}
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
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        )}
                    </div>
                </div>
                <div className='foot-main pb-4'>
                    <div className="mt-4">
                        <GenerateButton
                            text="Generate"
                            loading={loading}
                            onClick={handleGenerate}
                            isDisabled={isDisabled || !uploadedImage}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-4/5 p-2 md:p-4  rounded-[14px] aside-left  min-h-[300px]" style={{
                background: "#1d2129"
            }}>
                <div className="mb-2 opacity-80">
                    Generated Image
                </div>
                <div className="result relative flex flex-col justify-center items-center h-full rounded-lg p-4">
                    {/* {
                        resultImage && (
                            <div className="absolute right-1 top-1">
                                <Button
                                    variant="contained"
                                    startIcon={<DownloadIcon />}
                                    onClick={handleDownload}
                                    fullWidth
                                    sx={{
                                        background: "#00cae0"
                                    }}
                                >
                                    Download
                                </Button>
                            </div>
                        )
                    } */}

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
                            className="max-w-full max-h-[100%] object-contain rounded-lg shadow-lg cursor-pointer"
                            onClick={handleOpenModal}
                        />
                    ) : (
                        <div className="text-gray-500">
                            Please upload an image and click generate to create a new image
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
                autoHideDuration={2500}
            />
        </div>
    );
};

export default ImageToImage;

