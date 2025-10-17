import { useState, useCallback, useEffect } from 'react';

type HandlerFunction = () => void;

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const onSizeChanged = useCallback(() => {
    setScreenSize(getScreenSize());
  }, []);

  useEffect(() => {
    subscribe(onSizeChanged);

    return () => {
      unsubscribe(onSizeChanged);
    };
  }, [onSizeChanged]);

  return screenSize;
};

let handlers: HandlerFunction[] = [];
const xSmallMedia = window.matchMedia('(max-width: 599.98px)');
const smallMedia = window.matchMedia('(min-width: 600px) and (max-width: 959.98px)');
const mediumMedia = window.matchMedia('(min-width: 960px) and (max-width: 1279.98px)');
const largeMedia = window.matchMedia('(min-width: 1280px)');

[xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach(media => {
  media.addListener((e) => {
    if(e.matches) {
      handlers.forEach(handler => handler())
    }
  });
});

const subscribe = (handler: HandlerFunction) => handlers.push(handler);

const unsubscribe = (handler: HandlerFunction) => {
  handlers = handlers.filter(item => item !== handler);
};

function getScreenSize() {
  return {
    isScreenSmall: smallMedia.matches || xSmallMedia.matches,
  };
}
