import { FC, useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    google: any;
    __googleOneTapScript__?: boolean;
  }
}

const scriptFlag = '__googleOneTapScript__';

interface GoogleCallbackResponse {
  clientId: string;
  credential: string;
  select_by: string;
}

interface GoogleSignButtonProps {
  label: 'signin_with' | 'signup_with';
  callback: (data: GoogleCallbackResponse) => void;
}

const GoogleSignButton: FC<GoogleSignButtonProps> = ({ label, callback }) => {
  useEffect(() => {
    if (!window?.[scriptFlag] && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
        cancel_on_tap_outside: false,
        callback,
      });

      const button = document.querySelector('.g-button');

      window.google.accounts.id.renderButton(button, {
        text: label,
      });

      window.google.accounts.id.prompt();

      window[scriptFlag] = true;
    }

    if (window?.[scriptFlag] && window.google) {
      return () => {
        window[scriptFlag] = false;
        window.google.accounts.id.cancel();
      };
    }

    return () => {};
  }, [label, callback]);

  return (
    <div className="flex justify-center">
      <Script src="https://accounts.google.com/gsi/client" />
      <div className="g-button" />
    </div>
  );
};

export default GoogleSignButton;
