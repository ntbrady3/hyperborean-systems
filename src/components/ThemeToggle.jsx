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
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const { isMusicOn, setIsMusicOn } = useContext(MusicContext);
  const isPlayingRef = useRef(false);

  const colorSchemes = [
    { 
      name: 'Teal', 
      primary: '#28947b',
      secondary: 'rgba(0, 255, 255, 0.7)',
      tertiary: 'rgba(255, 0, 255, 0.7)',
    },
    { 
      name: 'Blue', 
      primary: '#15728a', 
      secondary: '#8ffbff', 
      tertiary: '#ff1c1c' 
    },
    { 
      name: 'Red', 
      primary: '#b91c1c', 
      secondary: '#c4c4c4', 
      tertiary: '#f59e0b' 
    },
    { 
      name: 'Green', 
      primary: '#138540', 
      secondary: '#adffd5', 
      tertiary: '#9effc6' 
    },
  ];

  useEffect(() => {
    const storedPrimary = localStorage.getItem('primaryColor');
    const storedSecondary = localStorage.getItem('secondaryColor');
    const storedTertiary = localStorage.getItem('tertiaryColor');
    const storedMusic = localStorage.getItem('music');
    const storedVolume = localStorage.getItem('musicVolume');

    if (storedPrimary) {
      setPrimaryColor(storedPrimary);
      document.documentElement.style.setProperty('--primary', storedPrimary);
    } else {
      document.documentElement.style.setProperty('--primary', primaryColor);
    }

    if (storedSecondary) {
      document.documentElement.style.setProperty('--secondary', storedSecondary);
    } else {
      document.documentElement.style.setProperty('--secondary', colorSchemes[0].secondary);
    }

    if (storedTertiary) {
      document.documentElement.style.setProperty('--tertiary', storedTertiary);
    } else {
      document.documentElement.style.setProperty('--tertiary', colorSchemes[0].tertiary);
    }

    if (storedMusic) {
      setIsMusicOn(storedMusic === 'on');
    }

    let initialVolume = 0.5;
    if (storedVolume) {
      const parsedVolume = parseFloat(storedVolume);
      if (!isNaN(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1) {
        initialVolume = parsedVolume;
      } else {
        console.warn('Invalid stored volume:', storedVolume, 'Defaulting to:', initialVolume);
        localStorage.setItem('musicVolume', initialVolume.toString());
      }
    }
    setVolume(initialVolume);

    if (!audioRef.current) {
      try {
        audioRef.current = new Audio('/music/background-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = initialVolume;
        audioRef.current.muted = initialVolume === 0;
        audioRef.current.addEventListener('error', () => {
          setAudioError('Failed to load audio file. Please check the file path.');
          console.error('Audio load error:', audioRef.current.error);
        });
        audioRef.current.addEventListener('canplaythrough', () => {
          setAudioError(null);
          console.log('Audio ready, volume:', audioRef.current.volume, 'Muted:', audioRef.current.muted);
        });
      } catch (error) {
        setAudioError('Failed to initialize audio.');
        console.error('Audio initialization error:', error);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
        isPlayingRef.current = false;
      }
    };
  }, [setIsMusicOn]);

  useEffect(() => {
    if (audioRef.current) {
      const isMuted = volume === 0;
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      localStorage.setItem('musicVolume', volume.toString());
      console.log('Volume updated to:', volume, 'Muted:', isMuted);
    }
  }, [volume]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const clampedVolume = Math.min(Math.max(newVolume, 0), 1);
    setVolume(clampedVolume);

    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
      audioRef.current.muted = clampedVolume === 0;
    }

    localStorage.setItem('musicVolume', clampedVolume.toString());
    console.log('Slider changed, raw value:', e.target.value, 'Clamped volume:', clampedVolume);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log('isPopupOpen toggled to:', !isPopupOpen);
  };

  const toggleMusic = (e) => {
    e.preventDefault();
    const newMusicState = !isMusicOn;
    setIsMusicOn(newMusicState);
    localStorage.setItem('music', newMusicState ? 'on' : 'off');

    if (audioRef.current && newMusicState) {
      try {
        audioRef.current.play();
        console.log('Audio playback started');
      } catch (error) {
        console.error('Error starting playback:', error);
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      console.log('Audio playback paused');
    }
  };

  const handleColorChange = (scheme, e) => {
    e.preventDefault();
    setPrimaryColor(scheme.primary);
    document.documentElement.style.setProperty('--primary', scheme.primary);
    document.documentElement.style.setProperty('--secondary', scheme.secondary);
    document.documentElement.style.setProperty('--tertiary', scheme.tertiary);
    localStorage.setItem('primaryColor', scheme.primary);
    localStorage.setItem('secondaryColor', scheme.secondary);
    localStorage.setItem('tertiaryColor', scheme.tertiary);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className={cn(
          'cursor-pointer fixed bottom-4 left-4 z-[50] p-2 rounded-full transition-opacity duration-300',
          'w-10 h-10 flex items-center justify-center',
          'md:top-4 md:right-4 md:bottom-auto md:left-auto',
          'opacity-100 pointer-events-auto'
        )}
        aria-label="Open settings"
      >
        <SettingsIcon 
          sx={{ 
            fontSize: 28, 
            color: 'var(--primary-foreground)',
            display: 'block'
          }} 
        />
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
            'fixed bottom-4 left-4 w-3/4 max-w-xs bg-background/95 rounded-md shadow-lg',
            'transition-all duration-300',
            isPopupOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            'sm:top-4 sm:right-4 sm:bottom-auto sm:left-auto'
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-center">Settings</h3>
            <button
              onClick={togglePopup}
              className="p-1 rounded-full transition-colors duration-300 cursor-pointer"
              aria-label="Close settings"
            >
              <CloseIcon 
                sx={{ 
                  fontSize: 24, 
                  color: 'var(--primary-foreground)',
                  display: 'block'
                }} 
              />
            </button>
          </div>
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
            <div className="flex items-center space-y-2 flex-col">
              <label className="block font-electrolize text-base">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider w-full h-2 bg-card rounded-full appearance-none cursor-pointer"
                disabled={!isMusicOn || audioError}
                aria-label="Adjust music volume"
              />
            </div>
            {audioError && (
              <p className="text-red-500 text-sm text-center">{audioError}</p>
            )}
            <div>
              <label className="block font-electrolize text-base mb-2 text-center">Color Scheme</label>
              <div className="flex flex-wrap gap-2 justify-center">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.primary}
                    onClick={(e) => handleColorChange(scheme, e)}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all duration-300',
                      primaryColor === scheme.primary
                        ? 'border-primary scale-110'
                        : 'border-transparent hover:border-primary/50'
                    )}
                    style={{ backgroundColor: scheme.primary }}
                    title={scheme.name}
                    aria-label={`Select ${scheme.name} color scheme`}
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