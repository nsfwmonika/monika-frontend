import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface CreationType {
    id: string;
    name: string;
}

interface CreationTypeProps {
    selectedType: string | number;
    onCreationTypeSelect: (type: CreationType) => void;
    disabled: boolean;
    typeList: CreationType[];
}

const CreationType: React.FC<CreationTypeProps> = ({ selectedType, onCreationTypeSelect, disabled, typeList }) => {

    return (
        <ButtonGroup variant="contained"
            className="custom-button-group mt-1 md:mt-2"
            sx={{
                display: "flex",
                justifyContent: 'flex-start',
                flexWrap: "wrap",
                boxShadow: "none",
                width: "100%",
                overflowX: "auto"
            }}>
            {typeList.map((item) => (
                <Button
                    key={item.id}
                    onClick={() => onCreationTypeSelect(item)}
                    disabled={disabled}
                    className='text-1xl'
                    sx={{
                        marginRight: "10px",
                        marginBottom: "8px",
                        padding: '4px 10px',
                        border: "none !important",
                        borderRadius: '4px !important',
                        color: selectedType === item.id ? '#8ce99a' : '#ffffff',
                        textTransform: 'none',
                        whiteSpace: "nowrap",
                        backgroundColor: selectedType === item.id ? "rgba(140, 233, 154, 0.1)" : "#272829",
                        backgroundImage: "linear-gradient(90deg, rgba(105, 219, 124, 0), rgba(105, 219, 124, 0.1), rgba(105, 219, 124, 0))",

                        '&:hover': {
                            backgroundColor: selectedType === item.id ? 'rgba(140, 233, 154, 0.1)' : '#757575',
                            color: "#8ce99a",

                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e',
                        },
                    }}
                >
                    {item.name}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default CreationType;

