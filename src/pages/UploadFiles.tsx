import { ChangeEvent, useState } from 'react'

export default function UploadFiles() {
    const [fileSelected, setFileSelected] = useState<any[]>([])

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        // console.log(files)

        if (files) {
            for (const i of files) {
                console.log(i.type)
            }
            // const image = await getBase64Image(files[0])
        }
        // const fileArray = Array.from(files).map((file: any) => URL.createObjectURL(file))
        // setFiles(fileArray)
    }

    //create function to filter file type image pdf docx xlsx

    const getBase64Image = (file: any) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        return new Promise((resolve, reject) => {
            reader.onload = (e: any) => {
                resolve(e.target.result)
            }
            reader.onerror = (e) => {
                reject('oops, something went wrong with the file reader.')
            }
        })
    }

    return (
        <div className="h-full flex flex-col items-center border pt-28 gap-8">
            <h1 className="text-3xl font-bold italic">UploadFiles 📄</h1>

            <div className="max-w-3xl flex flex-col gap-2 bg-gray-100 p-4 rounded-xl shadow-lg text-gray-900 font-semibold">
                <div className="flex flex-col justify-center">
                    <div className="mb-3 w-96">
                        <input
                            className="form-control block w-full text-base font-normal text-gray-700 bg-white rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="file"
                            id="formFileMultiple"
                            multiple
                            accept="image/*,.pdf,.docx,.xlsx"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <p>{JSON.stringify(fileSelected)}</p>
            </div>
        </div>
    )
}
