import { useState, useCallback, useEffect } from 'react';

type HandlerFunction = () => void;

let handlers: HandlerFunction[] = [];
const xSmallMedia = window.matchMedia('(max-width: 599.98px)');
const smallMedia = window.matchMedia('(min-width: 600px) and (max-width: 959.98px)');
const mediumMedia = window.matchMedia('(min-width: 960px) and (max-width: 1279.98px)');
const largeMedia = window.matchMedia('(min-width: 1280px)');

[xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach((media) => {
  media.addListener((e) => {
    if (e.matches) {
      handlers.forEach((handler) => handler());
    }
  });
});

function subscribe(handler: HandlerFunction): void {
  handlers.push(handler);
}

function unsubscribe(handler: HandlerFunction): void {
  handlers = handlers.filter((item) => item !== handler);
}

function getScreenSize(): { isScreenSmall: boolean } {
  return {
    isScreenSmall: smallMedia.matches || xSmallMedia.matches,
  };
}

export function useScreenSize(): { isScreenSmall: boolean } {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const onSizeChanged = useCallback(() => {
    setScreenSize(getScreenSize());
  }, []);

  useEffect(() => {
    subscribe(onSizeChanged);

    return (): void => {
      unsubscribe(onSizeChanged);
    };
  }, [onSizeChanged]);

  return screenSize;
}
