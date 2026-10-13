import { IIconProps } from "@/typescripts/interfaces/common.interfaces"

const NoFoundIcon = ({ }: IIconProps) => {
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50ZM25 2C12.3122 2 2 12.3122 2 25C2 37.6878 12.3122 48 25 48C37.6878 48 48 37.6878 48 25C48 12.3122 37.6878 2 25 2ZM25 22C26.6569 22 28 23.3431 28 25C28 26.6569 26.6569 28 25 28C23.3431 28 22 26.6569 22 25C22 23.3431 23.3431 22 25 22ZM23 34H27V27H23V34ZM23 20H27V15H23V20Z" fill="black" />
        </svg>
    )
}

export default NoFoundIcon