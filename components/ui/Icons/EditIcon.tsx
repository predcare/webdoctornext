import { IIconProps } from '@/typescripts/interfaces/common.interfaces';

const EditIcon = ({ IconHeight = '24', IconWidth = '24' }: IIconProps) => {
    return (
        <svg
            width={IconWidth}
            height={IconHeight}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 5-9 18-7-3.996 11.997"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default EditIcon;
