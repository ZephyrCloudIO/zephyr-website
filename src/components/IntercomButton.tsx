import { INTERCOM_BOOT_PROPS } from '@/lib/intercom';
import { MessageCircle } from 'lucide-react';
import React from 'react';
import { useIntercom } from 'react-use-intercom';

export const IntercomButton: React.FC = () => {
  const { boot } = useIntercom();

  return (
    <button
      id="intercom-launcher"
      onClick={() => boot(INTERCOM_BOOT_PROPS)}
      className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg transition-colors duration-200 flex items-center justify-center group"
      aria-label="Open chat support"
    >
      <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-200" />
    </button>
  );
};
