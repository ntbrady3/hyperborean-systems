import { useEffect, useState, useRef, useContext } from 'react';
import { cn } from '@/lib/utils';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import { MusicContext } from './MusicContext';

export const ThemeToggle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#28947b');
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);
  const { isMusicOn, setIsMusicOn } = useContext(MusicContext);

  const colorOptions = [
    { name: 'Teal', value: '#28947b' },
    { name: 'Blue', value: '#1e40af' },
    { name: 'Purple', value: '#7e22ce' },
    { name: 'Red', value: '#b91c1c' },
    { name: 'Green', value: '#15803d' },
  ];

  // Load settings and initialize audio
  useEffect(() => {
    const storedColor = localStorage.getItem('primaryColor');
    const storedMusic = localStorage.getItem('music');

    if (storedColor) {
      setPrimaryColor(storedColor);
      document.documentElement.style.setProperty('--primary', storedColor);
    } else {
      document.documentElement.style.setProperty('--primary', primaryColor);
    }

    if (storedMusic) {
      setIsMusicOn(storedMusic === 'on');
    }

    try {
      audioRef.current = new Audio('/music/background-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    } catch (error) {
      setAudioError('Failed to initialize audio.');
      console.error('Audio initialization error:', error);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Handle music playback
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.play().catch((error) => {
          setAudioError('Playback failed. Ensure user interaction occurred.');
          console.error('Audio playback failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicOn]);

  const togglePopup = (e) => {
    e.preventDefault();
    setIsPopupOpen((prev) => !prev);
  };

  const toggleMusic = (e) => {
    e.preventDefault();
    const newMusicState = !isMusicOn;
    setIsMusicOn(newMusicState);
    localStorage.setItem('music', newMusicState ? 'on' : 'off');
  };

  const handleColorChange = (color, e) => {
    e.preventDefault();
    setPrimaryColor(color);
    document.documentElement.style.setProperty('--primary', color);
    localStorage.setItem('primaryColor', color);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className={cn(
          'cursor-pointer fixed top-4 right-4 z-[60] p-2 rounded-full bg-primary text-primary-foreground cosmic-button',
          'focus:outline-none hover:bg-primary/90 w-10 h-10 flex items-center justify-center'
        )}
        aria-label={isPopupOpen ? 'Close settings' : 'Open settings'}
      >
        {isPopupOpen ? (
          <CloseIcon sx={{ fontSize: 20 }} />
        ) : (
          <SettingsIcon sx={{ fontSize: 20 }} />
        )}
      </button>

      <div
        className={cn(
          'fixed inset-0 z-50 transition-all duration-300',
          isPopupOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={togglePopup}
        ></div>
        <div
          className={cn(
            'fixed top-16 right-4 w-3/4 max-w-xs bg-background/95 rounded-md p-6 shadow-lg',
            'transition-all duration-300',
            isPopupOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isMusicOn ? (
                  <MusicNoteIcon sx={{ fontSize: 24 }} className="text-primary" />
                ) : (
                  <MusicOffIcon sx={{ fontSize: 24 }} className="text-muted-foreground" />
                )}
                <span className="font-electrolize text-base">Music</span>
              </div>
              <button
                onClick={toggleMusic}
                className={cn(
                  'p-2 rounded-full transition-colors duration-300',
                  isMusicOn ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {isMusicOn ? 'On' : 'Off'}
              </button>
            </div>
            {audioError && (
              <p className="text-red-500 text-sm text-center">{audioError}</p>
            )}
            <div>
              <label className="block font-electrolize text-base mb-2">Primary Color</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={(e) => handleColorChange(color.value, e)}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all duration-300',
                      primaryColor === color.value
                        ? 'border-primary scale-110'
                        : 'border-transparent hover:border-primary/50'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};