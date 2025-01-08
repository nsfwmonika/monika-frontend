import { FC, useState, ChangeEvent } from 'react';
import { styled, Button, TextField, Dialog, DialogContent, useMediaQuery, useTheme, IconButton, Modal } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import GenerateButton from '@/components/GenerateButton';

import Notification from '@/components/Notification';
import EditImage from './EditImage';
import request from '../../../utils/api';

type SeverityType = 'success' | 'info' | 'warning' | 'error';
interface ImageParams {
    code: number;
    msg: string;
}

const Replacement: FC = () => {
    const [loading, setLoading] = useState(false);
    const [baseImage, setBaseImage] = useState<string | null>(null);
    const [editImage, setEditImage] = useState<string | null>(null);

    const [resultImage, setResultImage] = useState<string | null>(null);
    const [promptText, setPromptText] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [promptId, setPromptId] = useState("");
    const [maskImage, setMaskImage] = useState("");

    const [severityType, setSeverity] = useState<SeverityType>('info');
    const [messages, setMessages] = useState('');
    const [notificationOpen, setNotificationOpen] = useState({
        transaction: false,
        second: false,
        third: false,
    });

    const handleGenerate = async () => {
        setLoading(true);

        let imageData = {
            op: "imageToImage",
            params: {
                pid: "1876830728178225152",
                images: [baseImage, maskImage],
                prompt: promptText
            }
        };

        try {
            const createdImage = await request<ImageParams>('post', '/v1', imageData);
            if (createdImage.code === 200 && createdImage.msg) {

                setPromptId(createdImage.msg);
                checkImageStatus(createdImage.msg);

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
                    pid: "1876830728178225152",
                    prompt_id: id
                }
            };

            try {
                const response = await request<ImageParams>('post', '/v1', dataCheck);
                if (response.code === 200 && response.msg !== "pending") {
                    clearInterval(statusCheck);
                    setResultImage(response.msg);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }
            } catch (error) {
                console.error("Error checking image status:", error);
            }
            attempts++;
        };
        const statusCheck = setInterval(checkStatus, interval);
        await checkStatus(); // Check immediately before starting interval
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, setImage: (image: string | null) => void) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        if (resultImage) {
            const link = document.createElement('a');
            link.href = resultImage;
            link.download = 'replacement-result.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const ImageUploadArea = ({ image, onUpload, label, isBtn }: { image: string | null, onUpload: (event: ChangeEvent<HTMLInputElement>) => void, label: string, isBtn: boolean }) => (
        <div className="w-full mb-4">
            <div className="flex items-center justify-between opacity-80 mb-2">
                {label}
                {
                    isBtn && (
                        <div className="mr-1">
                            <Button
                                variant="contained"
                                onClick={() => setIsDialogOpen(true)}
                                fullWidth
                                sx={{
                                    padding: "2px 4px !important",
                                    background: "#2260cd"
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    )
                }

            </div>
            <div className="relative h-40 border-1 border-dashed rounded-lg overflow-hidden" style={{
                borderColor: "#3b414e",
                height: "100px"

            }}>
                {image ? (
                    <>
                        <img src={image} alt={label} className="w-full h-full object-contain" style={{
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
                                background: 'rgba(30, 112, 255, 0.8)',
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

    const StyledDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialog-paper': {
            backgroundColor: theme.palette.background.default,
            width: '100vw',
            height: '100vh',
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 0,
            borderRadius: 0,
        },
    }));

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
    const onSave = () => {

    }

    return (
        <div className="flex flex-col md:flex-row md:justify-between w-full mx-auto h-full">
            <div className="w-full md:w-1/5 p-2 md:p-4 mr-4 mb-8 md:mb-0 flex flex-col md:h-full overflow-y-auto rounded-[14px] aside-left" style={{
                background: "#1d2129"
            }}>
                <div className='aside-config'>
                    <div className="mt-4 opacity-80">
                        Describe your image
                    </div>
                    <div className="mt-2 mb-6 h-[100px]">
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
                                height: "100%",
                                background: "#282e37",
                                borderRadius: "6px",
                                border: "1px solid rgba(184,221,255,.12)",
                                '& .MuiInputBase-root': {
                                    height: "100%",
                                },
                                '& .MuiInputBase-input': {
                                    color: 'rgba(224,245,255,.85)',
                                    borderColor: "#434756",
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(224,245,255,.85)',
                                    opacity: 1,
                                    borderColor: "#434756",
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        border: "1px solid rgba(184,221,255,.12)",
                                    },
                                },
                            }}
                        />
                    </div>

                    <ImageUploadArea
                        image={editImage || baseImage}
                        isBtn={true}
                        onUpload={(e) => handleImageUpload(e, setBaseImage)}
                        label="Picture to be changed"
                    />
                </div>
                <div className='foot-main pb-4'>
                    <div className="mt-4">
                        <GenerateButton
                            text="Generate"
                            loading={loading}
                            onClick={handleGenerate}
                            isDisabled={!baseImage}
                        />
                    </div>
                </div>

            </div>

            <div className="w-full md:w-4/5 p-2 md:p-4 rounded-[14px] aside-left min-h-[200px]" style={{
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
                                    // disabled={!resultImage}
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
                            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        />
                    ) : (
                        <div className="text-gray-500">
                            Please upload an image and click generate to create a new image
                        </div>
                    )}
                </div>
            </div>

            <StyledDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxWidth="lg"
                fullWidth
                fullScreen={isMobile}
            >
                <DialogContent>
                    <IconButton
                        aria-label="close"
                        onClick={() => setIsDialogOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <EditImage
                        base64Image={baseImage || ""}
                        onSave={(editedImage) => {
                            setEditImage(editedImage[0])
                            setMaskImage(editedImage[1])
                            setIsDialogOpen(false)
                        }}
                    />
                </DialogContent>
            </StyledDialog>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
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

export default Replacement;

