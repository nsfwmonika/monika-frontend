import React, { useState } from 'react';
import { Dialog, DialogContent, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import { Role } from '@/components/Role/Role';

interface RoleType {
  id: number;
  name: string;
  head: string;
  voice: string;
  age: number | null;
  gender: 'male' | 'female' | 'other' | null;
  interest: string;
  hobby: string;
  skill: string;
  system: boolean;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1b25',
      paper: '#23243a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    primary: {
      main: '#6366f1',
    },
  },
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
      maxHeight: '100%',
    },
  },
}));

interface CharacterSelectorProps {
  onSelectCharacter: (character: RoleType) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelectCharacter }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    onSelectCharacter(role);
    handleCloseDialog();
  };

  const initialRole: RoleType = {
    id: 0,
    name: 'Luna',
    head: '/role/role_1.png',
    voice: '',
    age: null,
    gender: null,
    interest: "",
    hobby: "",
    skill: "",
    system: true
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <img
        onClick={handleOpenDialog}
        src={selectedRole?.head || initialRole.head}
        alt={selectedRole?.name || initialRole.name}
        className="w-full h-full object-cover rounded-md"
        style={{
          objectFit: 'cover',
          borderRadius: "10px",
          width: 60, 
          height: 60, 
          cursor: 'pointer'
        }}
      />

      <StyledDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Role 
            roleId={selectedRole?.id || initialRole.id} 
            onRoleSelect={handleRoleSelect}
          />
        </DialogContent>
      </StyledDialog>
    </ThemeProvider>
  );
};

export default CharacterSelector;

