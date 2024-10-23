declare module 'react-flatpickr' {
    import * as React from 'react';

    interface FlatpickrProps {
        options?: any; 
        onChange?: (selectedDates: Date[], dateStr: string) => void;
    }

    const Flatpickr: React.FC<FlatpickrProps>;

    export default Flatpickr;
}
