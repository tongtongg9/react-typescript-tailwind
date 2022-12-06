import { ChangeEvent, useRef, useState } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { CloudUpload, Trash3 } from 'react-bootstrap-icons'
import FileIcon from '../components/elements/FileIcon'

interface Files {
    name: string
    type: string
    size: number
}

export default function UploadFiles() {
    const [fileUploaded, setFileUploaded] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string[]>([])

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

        for (let i = 0; i < fileUploaded.length; i++) {
            const file = fileUploaded[i]
            console.log(file)
            formData.append('files', file)
        }

        await uploadFile(formData)
    }

    const uploadFile = async (file: any) => {
        setIsLoading(true)
        try {
            const response = await axios.post('http://localhost:5003/upload', file)
            console.log(response)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemoveFile = (index: number) => {
        const uploaded = [...fileUploaded]
        uploaded.splice(index, 1)
        setFileUploaded(uploaded)
    }

    const handleRemoveAll = () => {
        setFileUploaded([])
        setErrorMessage([])
    }

    return (
        <div className="h-full flex flex-col items-center pt-28 gap-8 p-16">
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
                    <div className="space-x-2">
                        <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={handleUpload}
                        >
                            {isLoading ? 'Loading ...' : 'Upload'}
                        </button>

                        <button
                            type="button"
                            className="inline-block px-6 py-2.5 border border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:text-white hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={handleRemoveAll}
                        >
                            Clear
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

            <div className="grid grid-cols-3 gap-4">
                {fileUploaded.map((file, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 rou"
                    >
                        <FileIcon type={file.type} className="w-10 h-10 text-gray-800" />
                        <p>{file.name}</p>
                        <p>{file.type}</p>
                        <div>
                            <button
                                type="button"
                                className="inline-block rounded-full bg-red-600 text-white leading-normal uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
                                onClick={() => handleRemoveFile(index)}
                            >
                                <Trash3 aria-hidden="true" className="w-3 mx-auto" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
