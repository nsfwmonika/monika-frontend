import { Button } from "@/components/ui/button";
import LoadingButton from '@mui/lab/LoadingButton';
import Link from "next/link";


interface GenerateButtonProps {
  isDisabled?: boolean;
  text?: string;
  loading?: boolean;
  onClick?: () => void;
  
}

const GenerateButton = ({ isDisabled, text, loading, onClick  }: GenerateButtonProps) => {
  const styleBtn = {
    backgroundImage: "linear-gradient(135deg,#926aff 0%,#ff77b0 50%,#ffb367 100%)"
  }

  const handleGenerate = () =>{
    console.log('handleGenerate---')
  }

  return (
    <LoadingButton
      disabled={isDisabled}
      loading={loading}
      variant="contained"
      onClick={onClick || handleGenerate}
      sx={{
        // background: "#1971c2",
        width:"100%",
        height:"38px",
        color: "#000000",
        fontWeight:"700",
        textTransform: 'none',
        background: "radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)",
        '&:hover': {
          // background: "#1a62e0",
          opacity:"0.85"
        },
        '&:disabled': {
          // background: "#4a4a4f",
          background: "radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)",
          color: "#626365",
          opacity:"0.7"
        },
        '&.MuiLoadingButton-loading': {
          // background: "#1971c2",
          background: "radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)",
          opacity: 0.8,
        },
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-brush "><path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path></svg>
      <span className='ml-2'>{text || "Generate"}</span>
    </LoadingButton>
  );
};

export default GenerateButton;
