'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      expand={true}
      richColors={false}
      closeButton={true}
      duration={4000}
      toastOptions={{
        classNames: {
          toast:
            'group toast bg-white text-gray-900 border border-gray-200 shadow-lg backdrop-blur-sm rounded-lg',
          description: 'text-gray-600',
          actionButton:
            'bg-purple-600 text-white hover:bg-purple-700 px-3 py-1.5 rounded-md text-sm font-medium',
          cancelButton:
            'bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm font-medium',
          closeButton: 'bg-white text-gray-400 hover:text-gray-600 border-0',
          success: 'bg-white text-green-800 border-green-200',
          error: 'bg-white text-red-800 border-red-200',
          warning: 'bg-white text-amber-800 border-amber-200',
          info: 'bg-white text-blue-800 border-blue-200',
          loading: 'bg-white text-gray-800 border-gray-200',
        },
        style: {
          background: 'white',
          color: '#1f2937',
          border: '1px solid #e5e7eb',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
