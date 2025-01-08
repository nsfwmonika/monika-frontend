"use client";

import { useState, useEffect } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';

import TextImage from './TextImage/TextImage';
import ImageToImage from './ImageToImage/ImageToImage';
import ImageToFace from './ImageToFace/ImageToFace';
import Replacement from './Replacement/Replacement';
import VideoToFace from './VideoToFace/VideoToFace';

import "./made.scss";

interface MenuItem {
    id: string;
    name: string;
}

interface Character {
    id: string;
    name: string;
}

const menuList: MenuItem[] = [
    {
        id: "1",
        name: "Text to Image"
    },
    {
        id: "2",
        name: "Image To Image"
    },
    {
        id: "3",
        name: "Picture Face Swap"
    },
    {
        id: "4",
        name: "Replacement"
    }
];

const MadeContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState('1');
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

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
            const currentParams = new URLSearchParams(searchParams?.toString());
            currentParams.set('type', newValue);
            router.push(`/made?${currentParams.toString()}`);
        } catch (error) {
            console.error('Error updating URL parameters:', error);
        }
    };

    const handleSelectCharacter = (character: Character) => {
        setSelectedCharacter(character);
    };

    return (
        <div className="mx-auto px-4 sm:px-6 pb-4 w-full deepfake-page">
            <TabContext value={value}>
                <div 
                    className="flex justify-between relative items-center py-4 md:py-10 px-4 sm:px-6 lg:px-8 header-mob"
                    style={{ background: "#111114" }}
                >
                    <div>
                        <Link
                            href="/"
                            aria-label="Monika Al"
                            className="flex items-center space-x-1 font-bold text-2xl"
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
                            {menuList.map((item, i) => (
                                <Tab key={i} label={item.name} value={item.id} />
                            ))}
                        </TabList>
                    </div>
                    <div></div>
                </div>

                <div className="flex justify-start menu-app md:hidden">
                    {menuList.map((item, i) => (
                        <div
                            key={i}
                            className={value === item.id ? "menu-active" : ""}
                            onClick={() => setValue(item.id)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                <div className="w-full mx-auto create-main h-full md:pt-1">
                    <TabPanel value="1" sx={{ padding: 0 }} className="h-full create-content">
                        <TextImage />
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0 }} className="h-full create-content">
                        <ImageToImage />
                    </TabPanel>
                    <TabPanel value="3" sx={{ padding: 0 }} className="h-full create-content">
                        <ImageToFace 
                            maxSizeInMB={0} 
                            onImageUpload={(file: File) => {
                                console.log("Image uploaded:", file);
                            }} 
                        />
                    </TabPanel>
                    <TabPanel value="4" sx={{ padding: 0 }} className="h-full create-content">
                        <Replacement />
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    );
};

export default MadeContent;

