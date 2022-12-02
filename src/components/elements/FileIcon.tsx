import { FileEarmarkImage, FileEarmarkSpreadsheet, FileEarmarkWord, FileEarmarkText } from 'react-bootstrap-icons'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<any> {
    type: string
}

const icons: any = {
    'image/jpeg': FileEarmarkImage,
    'image/png': FileEarmarkImage,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileEarmarkWord,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileEarmarkSpreadsheet,
    'application/pdf': FileEarmarkText,
}

const FileIcon = ({ type, ...props }: Props) => {
    const Icon = icons[type]

    return <Icon {...props} />
}

export default FileIcon

FileIcon.defaultProps = {
    type: 'image/jpeg',
}
