import { createContext, useContext } from 'react';

export const MusicContext = createContext({
  isMusicOn: false,
  setIsMusicOn: () => {},
});

export const useMusic = () => useContext(MusicContext);