"use client";
import { useState, useEffect } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import TextImage from './TextImage/TextImage';
import ImageToImage from './ImageToImage/ImageToImage';
import ImageToFace from './ImageToFace/ImageToFace';
import Replacement from './Replacement/Replacement';
import VideoToFace from './VideoToFace/VideoToFace';

import CharacterSelector from '@/components/CharacterSelector';
import "./made.scss"


const Made = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState('1');
    const [selectedCharacter, setSelectedCharacter] = useState(null);


    const theme = createTheme({
        palette: {
            primary: {
                main: '#ffffff',
            },
        },
        components: {
            MuiTab: {
                styleOverrides: {
                    root: {
                        color: '#ffffff',
                        opacity: 0.9,

                        '&.Mui-selected': {
                            color: '#ffffff',
                            opacity: 1,
                            backgroundColor: '#343a40',
                            borderRadius: '8px',
                        },
                        '&:hover': {
                            opacity: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                        },
                        minHeight: '40px',
                        padding: '2px 16px',
                        transition: 'all 0.3s',
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        display: 'none',
                    },
                },
            },
        },
    });

    useEffect(() => {
        if (searchParams) {
            const type = searchParams.get('type');
            if (type && menuList.some(item => item.id === type)) {
                setValue(type);
            }
        }
    }, [searchParams]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        try {
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set('type', newValue);
            router.push(`/made?${currentParams.toString()}`, undefined);
        } catch (error) {
            console.error('Error updating URL parameters:', error);
            setValue(newValue);
        }
    };
    const handleSelectCharacter = (character: any) => {
        setSelectedCharacter(character);
    };

    let menuList = [
        {
            id: "1",
            name: "Text to Image"
        }, {
            id: "2",
            name: "Image To Image"
        }, {
            id: "3",
            name: "Picture Face Swap"
        },
        {
            id: "4",
            name: "Replacement"
        },
        //  {
        //     id: "5",
        //     name: "Video Face Swap"
        // },

    ]

    return (
        <ThemeProvider theme={theme}>
            {/* max-w-6xl */}
            <div className="mx-auto px-4 sm:px-6 pb-4 w-full deepfake-page">
                <TabContext value={value}>
                    <div style={{
                        background: "#111114",
                    }} className="flex justify-between relative items-center py-4 md:py-10 px-4 sm:px-6 lg:px-8 header-mob">
                        <div>
                            <Link
                                href="/"
                                aria-label="Monika Al"
                                className="flex items-center space-x-1 font-bold text-2xl "
                            >
                                Monika Al
                            </Link>
                        </div>
                        <div className="hidden md:flex">
                            <TabList
                                onChange={handleChange}
                                aria-label="deepfake tabs"
                                centered
                                sx={{
                                    overflow: "auto",
                                    '& .MuiTab-root': {
                                        fontSize: '1rem',
                                        marginX: 1,
                                    },
                                }}
                            >
                                {
                                    menuList.map((item, i) => (
                                        <Tab key={i} label={item.name} value={item.id} />
                                    ))
                                }
                            </TabList>
                        </div>
                        <div style={{
                        }}>
                            {/* <CharacterSelector onSelectCharacter={handleSelectCharacter} /> */}
                        </div>
                    </div>
                    <div className="flex justify-start menu-app md:hidden">
                        {
                            menuList.map((item, i) => (
                                <div key={i} className={
                                    value === item.id ? "menu-active" : ""
                                } onClick={() => setValue(item.id)}>
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-full mx-auto create-main h-full md:pt-1">
                        <TabPanel value="1" sx={{ padding: 0 }} className="h-full create-content" >
                            <TextImage />
                        </TabPanel>
                        <TabPanel value="2" sx={{ padding: 0 }} className="h-full create-content">
                            <ImageToImage></ImageToImage>
                        </TabPanel>
                        <TabPanel value="3" sx={{ padding: 0 }} className="h-full create-content">
                            <ImageToFace maxSizeInMB={0} onImageUpload={function (file: File): void {
                                throw new Error("Function not implemented.");
                            }}></ImageToFace>
                        </TabPanel>
                        <TabPanel value="4" sx={{ padding: 0 }} className="h-full create-content">
                            <Replacement></Replacement>
                        </TabPanel>
                        <TabPanel value="5" sx={{ padding: 0 }} className="h-full create-content">
                            <VideoToFace></VideoToFace>
                        </TabPanel>
                    </div>

                </TabContext>
            </div>
        </ThemeProvider>
    );
};

export default Made;

