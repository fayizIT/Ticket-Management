import { toast } from 'react-hot-toast';

export const successAlert = async (message: string): Promise<void> => {
    toast.success(message, {
        position: 'top-center',
        style: {
            zIndex: 9999,
        },
    });
};

export const errorAlert = async (message: string): Promise<void> => {
    toast.error(message, {
        position: 'top-center',
    });
};
