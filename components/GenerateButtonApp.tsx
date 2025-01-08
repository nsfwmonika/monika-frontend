import LoadingButton from '@mui/lab/LoadingButton';

interface GenerateButtonAppProps {
  isDisabled?: boolean;
  text?: string;
  loading?: boolean;
  onClick?: () => void;
  
}

const GenerateButtonApp = ({ isDisabled, text, loading, onClick  }: GenerateButtonAppProps) => {
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
        background: "radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)",
        color: "#000000",
        fontWeight:"700",
        textTransform: 'none',
        '&:hover': {
          // background: "#1a62e0",
          background: "radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)",
        },
        '&:disabled': {
          // background: "#4a4a4f",
          background: "radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)",
          color: "#000000",
        },
        '&.MuiLoadingButton-loading': {
          // background: "#1971c2",
          background: "radial-gradient(85.89% 289.58% at 95.2978056426% 14.5833333333%, rgb(255, 216, 64) 0%, rgb(243, 172, 255) 55.86%, rgb(138, 236, 255) 100%)",
          opacity: 0.8,
        },
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="tabler-icon tabler-icon-brush "><path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path></svg>
      <span className='ml-2'>{text || "Generate"}</span>
    </LoadingButton>
  );
};

export default GenerateButtonApp;
