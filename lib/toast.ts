import { toast } from 'sonner';

// Fashion-themed toast notifications for OOTD app
export const fashionToast = {
  // Success notifications
  success: (message: string, description?: string) => {
    return toast.success(message, {
      description,
      duration: 4000,
    });
  },

  // Error notifications
  error: (message: string, description?: string) => {
    return toast.error(message, {
      description,
      duration: 5000,
    });
  },

  // Warning notifications
  warning: (message: string, description?: string) => {
    return toast.warning(message, {
      description,
      duration: 4500,
    });
  },

  // Info notifications
  info: (message: string, description?: string) => {
    return toast.info(message, {
      description,
      duration: 4000,
    });
  },

  // Fashion-specific notifications
  outfit: {
    saved: (title?: string) => {
      return toast.success('Outfit Saved Successfully! ✨', {
        description: title ? `"${title}" has been added to your collection` : 'Your outfit has been added to your collection',
        duration: 4000,
      });
    },

    deleted: (title?: string) => {
      return toast.success('Outfit Deleted', {
        description: title ? `"${title}" has been removed from your collection` : 'Outfit has been removed from your collection',
        duration: 3000,
      });
    },

    analyzed: () => {
      return toast.success('Image Analyzed Successfully! 🎯', {
        description: 'AI has analyzed your outfit and provided style insights',
        duration: 4000,
      });
    },

    generated: () => {
      return toast.success('Outfit Generated! 👗', {
        description: 'Your AI-generated outfit recommendations are ready',
        duration: 4000,
      });
    },

    favorited: (title?: string) => {
      return toast.success('Added to Favorites! ❤️', {
        description: title ? `"${title}" has been added to your favorites` : 'Outfit has been added to your favorites',
        duration: 3000,
      });
    },

    unfavorited: (title?: string) => {
      return toast.info('Removed from Favorites', {
        description: title ? `"${title}" has been removed from your favorites` : 'Outfit has been removed from your favorites',
        duration: 3000,
      });
    },
  },

  // Upload notifications
  upload: {
    success: () => {
      return toast.success('Image Uploaded Successfully! 📸', {
        description: 'Your image is ready for analysis',
        duration: 3000,
      });
    },

    error: (reason?: string) => {
      return toast.error('Upload Failed', {
        description: reason || 'Please try again with a different image',
        duration: 5000,
      });
    },

    invalidFile: () => {
      return toast.warning('Invalid File Type', {
        description: 'Please select an image file (JPG, PNG, GIF)',
        duration: 4000,
      });
    },

    fileTooLarge: () => {
      return toast.warning('File Too Large', {
        description: 'Please select an image smaller than 10MB',
        duration: 4000,
      });
    },
  },

  // API and loading notifications
  api: {
    error: (operation: string, details?: string) => {
      return toast.error(`${operation} Failed`, {
        description: details || 'Please try again later',
        duration: 5000,
      });
    },

    loading: (message: string) => {
      return toast.loading(message);
    },

    success: (operation: string, details?: string) => {
      return toast.success(`${operation} Successful`, {
        description: details,
        duration: 3000,
      });
    },
  },

  // Form notifications
  form: {
    submitted: (formType: string) => {
      return toast.success('Form Submitted Successfully! 📝', {
        description: `Your ${formType} has been sent successfully`,
        duration: 4000,
      });
    },

    error: (formType: string, details?: string) => {
      return toast.error('Form Submission Failed', {
        description: details || `There was an error submitting your ${formType}. Please try again.`,
        duration: 5000,
      });
    },

    validation: (message: string) => {
      return toast.warning('Please Check Your Input', {
        description: message,
        duration: 4000,
      });
    },
  },

  // Authentication notifications
  auth: {
    signedIn: () => {
      return toast.success('Welcome Back! 👋', {
        description: 'You have been signed in successfully',
        duration: 3000,
      });
    },

    signedOut: () => {
      return toast.info('Signed Out Successfully', {
        description: 'See you next time!',
        duration: 3000,
      });
    },

    error: (message: string) => {
      return toast.error('Authentication Error', {
        description: message,
        duration: 5000,
      });
    },
  },

  // Custom toast with action
  withAction: (
    message: string,
    actionLabel: string,
    actionFn: () => void,
    description?: string
  ) => {
    return toast(message, {
      description,
      action: {
        label: actionLabel,
        onClick: actionFn,
      },
      duration: 6000,
    });
  },

  // Promise-based toast for async operations
  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading: loading,
      success: (data) => (typeof success === 'function' ? success(data) : success),
      error: (error) => (typeof error === 'function' ? error(error) : error),
    });
  },
};

// Confirmation dialog replacement using toast
export const confirmAction = (
  message: string,
  onConfirm: () => void,
  {
    title = 'Are you sure?',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    description,
  }: {
    title?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    description?: string;
  } = {}
) => {
  return toast(title, {
    description: description || message,
    duration: 10000,
    action: {
      label: confirmLabel,
      onClick: onConfirm,
    },
    cancel: {
      label: cancelLabel,
      onClick: () => {}, // Do nothing on cancel
    },
  });
};

// Export the original toast for backward compatibility
export { toast };
