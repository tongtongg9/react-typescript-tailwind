import { ChangeEvent, useRef, useState } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { CloudUpload } from 'react-bootstrap-icons'
import FileIcon from '../components/elements/FileIcon'
export default function UploadFiles() {
    const [fileUploaded, setFileUploaded] = useState<any[]>([])
    const [isValid, setIsValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const uploadRef = useRef(null)

    const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles)
    }

    const handleUploadFiles = async (file: any) => {
        const uploaded = [...fileUploaded]
        let errors = [...errorMessage]
        file.some((f: any) => {
            if (validateFileSize(f.size)) {
                uploaded.push(f)
            } else {
                errors.push(`File "${f.name}" is too large`)
            }
        })
        setErrorMessage(errors)
        setFileUploaded(uploaded)
    }

    const validateFileSize = (size: number) => {
        const MAX_FILE_SIZE = 2048 // 2MB
        const fileSizeKiloBytes = size / 1024

        return fileSizeKiloBytes > MAX_FILE_SIZE ? false : true
    }

    const handleUpload = async () => {
        let formData = new FormData()
        fileUploaded.forEach((f) => {
            formData.append('files', f)
        })
        // uploadFile(formData)

        for (const i of fileUploaded) {
            console.log(i)
        }
    }

    const uploadFile = async (file: any) => {
        try {
            const response = await axios.post('http://localhost:3040/uploads', file)
            console.log({ response })
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="h-full flex flex-col items-center border pt-28 gap-8">
            <h1 className="text-3xl font-bold italic">UploadFiles 📄</h1>

            <div className="max-w-3xl flex flex-col gap-2 bg-gray-100 p-4 rounded-xl shadow-lg text-gray-900 font-semibold">
                <div className="flex flex-col justify-center gap-2">
                    <div className="mb-3 w-96">
                        <label
                            htmlFor="upload-file"
                            className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 "
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <CloudUpload aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" />

                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Max allowed file size is 2.5MB per file
                                </p>
                            </div>
                            <input
                                className="sr-only"
                                type="file"
                                id="upload-file"
                                multiple
                                accept="image/jpeg,image/png,.pdf,.docx,.xlsx"
                                onChange={handleFileEvent}
                            />
                        </label>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => handleUpload()}
                        >
                            Upload
                        </button>
                    </div>
                    {!_.isEmpty(errorMessage) && (
                        <div className="text-red-500">
                            <ul className="list-disc list-inside">
                                {errorMessage.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {fileUploaded.map((file, index) => (
                    <div key={index} className="flex flex-col gap-2 border border-red-500">
                        <FileIcon type={file.type} className="w-20 h-20" />
                    </div>
                ))}
            </div>
        </div>
    )
}
