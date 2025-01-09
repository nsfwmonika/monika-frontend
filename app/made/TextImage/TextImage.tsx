import { FC, useState, useEffect } from 'react';
import { TextField, Button, Modal, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import CreationType from '@/components/CreationType';
import GenerateButton from '@/components/GenerateButton';
import request from '../../../utils/api';
import Notification from '@/components/Notification';

type SeverityType = 'success' | 'info' | 'warning' | 'error';
interface TextToImageParams {
    op: string;
    params: object;
    code: number;
    msg: string;
}

const TextImage: FC = () => {
    const [selectedCreationType, setSelectedCreationType] = useState("1871452980321562624");
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
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
        setLoading(true);
        setResultImage("");

        let textToImageData = {
            op: "textToImage",
            params: {
                pid: selectedCreationType,
                prompt: inputValue
            }
        }
        const createdImage = await request<TextToImageParams>('post', '/v1', textToImageData);

        if (createdImage.code === 200) {
            taskState(createdImage.msg)
        } else {
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

            request<TextToImageParams>('post', '/v1', dataCheck)
                .then((createdCheck) => {
                    if (createdCheck.code === 200) {

                        if (createdCheck.msg !== 'pending') {
                            clearInterval(intervalId);
                            setResultImage(createdCheck.msg)
                            setTimeout(() => {
                                setLoading(false)
                            }, 3000);
                        }
                    } else {
                        handleNotificationOpen('transaction', createdCheck.msg, 'error');
                        setLoading(false);
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

    const handleDownload = () => {
        if (resultImage) {
            const link = document.createElement('a');
            link.href = resultImage;
            link.download = 'generated_image.png';
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

    const typeList = [{
        id: "1871452980321562624",
        name: "Portrait(Europe)"
    }, {
        id: "1871453063616245760",
        name: "Portrait(Asia)"
    }, {
        id: "1871453288946839552",
        name: "Pixel"
    }];

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
        <div className="flex flex-col md:flex-row md:justify-between w-full mx-auto h-full overflow-y-auto" style={{
        }}>
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
                    <div className="mt-4 opacity-80" style={{ color: "#ebf8ff" }}>
                        Describe your image
                    </div>
                    <div className="mt-2 h-[100px]">
                        <TextField
                            id="outlined-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            placeholder="Please enter the prompt word"
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
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className='foot-main pb-4'>

                    <div className="mt-4">
                        <GenerateButton
                            text="Generate"
                            loading={loading}
                            onClick={handleGenerate}
                            isDisabled={!inputValue}
                        />
                    </div>

                </div>
            </div>

            <div className="w-full md:w-4/5 p-2 md:p-4 rounded-[14px] min-h-[300px]" style={{
                background: "#1d2129"
            }}>
                <div className="mb-2 opacity-80">
                    Generated Image
                </div>
                <div className="result relative flex flex-col justify-center items-center rounded-lg p-4">
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
                                strokeWidth="48"
                                height="48"
                            >
                                <path
                                    d="M64 512a448 448 0 1 0 448-448 32 32 0 0 0 0 64 384 384 0 1 1-384 384 32 32 0 0 0-64 0z"
                                    fill="#ff842d"
                                    p-id="4481"
                                ></path>
                            </svg>
                            <p>Please wait while generating the image...</p>
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
                            Please enter the prompt word and click the generate button to create the image.
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
                            src={resultImage}
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

export default TextImage;

