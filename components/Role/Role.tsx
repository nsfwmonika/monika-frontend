"use client"

import React, { FC, useState, useCallback, useMemo, ChangeEvent, useRef, useEffect } from 'react'
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, DialogActions, Dialog, DialogContent, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CloseIcon from '@mui/icons-material/Close';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import MicIcon from '@mui/icons-material/Mic';
import { styled } from '@mui/material/styles';
import "./Role.scss"

interface Role {
  id: number
  name: string
  head: string
  voice: string
  age: number | null
  gender: 'male' | 'female' | 'other' | null
  interest: string
  hobby: string
  skill: string
  system: boolean
}

interface RoleProps {
  roleId: number;
  onRoleSelect: (role: Role) => void;
}

export const Role: FC<RoleProps> = ({ roleId, onRoleSelect }) => {
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [currentRole, setCurrentRole] = useState<Role>({
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
  })

  const [newRole, setNewRole] = useState<Role>({
    id: 0,
    name: '',
    head: '',
    voice: '',
    age: null,
    gender: null,
    interest: "",
    hobby: "",
    skill: "",
    system: false
  })

  const [roleList, setRoleList] = useState<Role[]>([
    {
      id: 0,
      name: 'Luna',
      head: '/role/role_1.png',
      voice: '',
      age: null,
      gender: null,
      interest: "",
      hobby: "",
      skill: "",
      system: true,
    },
    {
      id: 1,
      name: 'Aurora',
      head: '/role/role_2.png',
      voice: '',
      age: null,
      gender: null,
      interest: "",
      hobby: "",
      skill: "",
      system: true
    },
    {
      id: 2,
      name: 'Sakura',
      head: '/role/role_3.png',
      voice: '',
      age: null,
      gender: null,
      interest: "",
      hobby: "",
      skill: "",
      system: true
    }
  ])

  const handleClickOpen = (item: Role) => {
    setCurrentRole(item);
    // onRoleSelect(item);
  };

  const handleClose = () => {
    setOpen(false)
    setEditId(null)
    setNewRole({
      id: 0,
      name: '',
      head: '',
      voice: '',
      age: null,
      gender: null,
      interest: "",
      hobby: "",
      skill: "",
      system: false
    })
  }

  const handleOpen = () => {
    setEditId(null)
    setNewRole({
      id: roleList.length,
      name: '',
      head: '',
      voice: '',
      age: null,
      gender: null,
      interest: "",
      hobby: "",
      skill: "",
      system: false
    })
    setOpen(true)
  }

  const editRole = () => {
    if (currentRole.system) return
    setEditId(currentRole.id)
    setNewRole({ ...currentRole })
    setOpen(true)
  }

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>, fileType: 'head' | 'voice') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setNewRole(prev => ({
        ...prev,
        [fileType]: fileUrl
      }));
    }
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setNewRole(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = () => {
    if (!newRole.name || !newRole.head) return

    if (editId !== null) {
      setRoleList(prev => prev.map(role => role.id === editId ? newRole : role))
    } else {
      setRoleList(prev => [...prev, newRole])
    }

    setCurrentRole(newRole)
    handleClose()
  }

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        setNewRole(prev => ({
          ...prev,
          voice: audioUrl
        }));
        setIsRecording(false);
        setRecordingTime(0);
      };

      recorder.start();
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (err) {
      console.error('录音失败:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, []);

  useEffect(() => {
    const initialRole = roleList.find(role => role.id === roleId) || roleList[0];
    setCurrentRole(initialRole);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [roleId, roleList]);

  const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
    },
  }));

  const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    '& .MuiSelect-icon': {
      color: theme.palette.text.secondary,
    },
  }));

  const MemoizedStyledTextField = useMemo(() => React.memo(StyledTextField), []);

  return (
    <Box className="role-main p-4" sx={{ color: "#ffffff" }}>
      <Box className="mb-4">
        <Button
          onClick={handleOpen}
          variant="contained"
          className="w-full sm:w-auto"
        >
          <AddIcon sx={{ fontSize: "20px", marginRight: "3px" }} />
          New Role
        </Button>

        <Button
          onClick={editRole}
          variant="contained"
          className="w-full sm:w-auto"
          disabled={currentRole.system}
          sx={{
            marginLeft: "24px",
            color: "#ffffff",
            "&.Mui-disabled": {
              backgroundColor: "#303030",
              color: "rgba(255, 255, 255, 0.8)"
            }
          }}
        >
          <CreateIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
          Edit Role
        </Button>
      </Box>

      <Box className="space-y-6">
        <Box>
          <h2 className="text-xl font-semibold mb-4">Role</h2>
          <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {roleList.map((item) => (
              <Box
                key={item.id}
                onClick={() => handleClickOpen(item)}
                className="role-item p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md"
                sx={{
                  background: currentRole?.id === item.id ? "linear-gradient(90deg, #8f41e9, #578aef)" : ""
                }}
              >
                {item.system && (
                  <div className="system-icon">
                    <SettingsSuggestIcon />
                  </div>
                )}
                <Box className="img-top aspect-square relative mb-2">
                  <img
                    src={item.head}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                    style={{
                      width: "150px",
                      objectFit: 'cover',
                      borderRadius: "10px"
                    }}
                  />
                </Box>
                <Box className="text-center font-medium name">
                  {item.name}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{
          margin: "auto",
          marginTop: "32px",
          display: "flex",
          justifyContent: "end"
        }}>
          <Button
            onClick={() => onRoleSelect(currentRole)}
            sx={{
              margin: 'auto',
              width: '260px',
              height: "50px",
              borderRadius: '24px',
              color: '#000000',
              fontWeight: '700',
              fontSize: "18px",
              background: 'radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)'
            }}
          >
            <span style={{ marginLeft: "10px" }}>Confirm</span>
          </Button>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            paddingBottom: '24px',
          }
        }}
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box className="space-y-4 mt-4">
            <MemoizedStyledTextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              type="text"
              value={newRole.name}
              onChange={handleInputChange}
            />
            <Box>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'head')}
                className="hidden btn-up flex"
                id="role-image"
              />
              <label htmlFor="role-image">
                <Button
                  component="span"
                  variant="contained"
                  sx={{
                    margin: "12px 0",
                    textTransform: "none"
                  }}
                >
                  Upload profile picture
                </Button>
              </label>
              {newRole.head && (
                <Box className="mt-2">
                  <img
                    src={newRole.head}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                    style={{
                      width: "80px"
                    }}
                  />
                </Box>
              )}
            </Box>

            {/* <Box className="flex items-center space-x-2">
              <IconButton
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording}
                color={isRecording ? "secondary" : "primary"}
              >
                <MicIcon />
              </IconButton>
              {isRecording && <span>In the recording: {recordingTime}s</span>}
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(e, 'voice')}
                className="hidden btn-up flex"
                id="role-voice"
              />
              <label htmlFor="role-voice">
                <Button
                  component="span"
                  variant="contained"
                  startIcon={<AudioFileIcon />}
                  sx={{
                    margin: "12px 0",
                    textTransform: "none"
                  }}
                >
                  Select voice file
                </Button>
              </label>
              {newRole.voice && (
                <Box className="mt-2 flex items-center">
                  <AudioFileIcon sx={{ marginRight: 1 }} />
                  <span>Selected voice file</span>
                </Box>
              )}
            </Box> */}

            <MemoizedStyledTextField
              fullWidth
              margin="normal"
              name="age"
              label="Age"
              type="number"
              value={newRole.age || ''}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ color: 'text.secondary' }}>Gender</InputLabel>
              <StyledSelect
                value={newRole.gender || ''}
                onChange={(e) => handleInputChange(e as any)}
                label="Gender"
                name="gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </StyledSelect>
            </FormControl>

            <MemoizedStyledTextField
              fullWidth
              margin="normal"
              name="interest"
              label="Interest"
              value={newRole.interest}
              onChange={handleInputChange}
            />
            <MemoizedStyledTextField
              fullWidth
              margin="normal"
              name="hobby"
              label="Hobby"
              value={newRole.hobby}
              onChange={handleInputChange}
            />
            <MemoizedStyledTextField
              fullWidth
              margin="normal"
              name="skill"
              label="Skill"
              value={newRole.skill}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            disabled={!newRole.name || !newRole.head}
            sx={{
              margin: 'auto',
              width: '200px',
              borderRadius: '24px',
              color: '#000000',
              fontWeight: '700',
              background: 'radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)'
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default React.memo(Role);

