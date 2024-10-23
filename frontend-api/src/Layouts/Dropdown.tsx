import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

const Dropdown = (props: any, forwardedRef: any) => {
    const [visibility, setVisibility] = useState<boolean>(false);
    const referenceRef = useRef<any>();
    const popperRef = useRef<any>();

    const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
        placement: props.placement || 'bottom-start', 
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: props.offset || [0, 8], 
                },
            },
        ],
    });

    const handleDocumentClick = (event: MouseEvent) => {
        if (referenceRef.current?.contains(event.target) || popperRef.current?.contains(event.target)) {
            return;
        }
        setVisibility(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    useImperativeHandle(forwardedRef, () => ({
        close() {
            setVisibility(false);
        },
    }));

    return (
        <>
            <button
                ref={referenceRef}
                type="button"
                className={props.btnClassName}
                onClick={() => setVisibility(!visibility)}
            >
                {props.button}
            </button>

            {visibility && (
                <div
                    ref={popperRef}
                    style={styles.popper}
                    {...attributes.popper}
                    className="absolute z-50 mt-2 w-48 bg-white rounded-md shadow-lg"
                >
                    <div className="py-2">
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
};

export default forwardRef(Dropdown);
