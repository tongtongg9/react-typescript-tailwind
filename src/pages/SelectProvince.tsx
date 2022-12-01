import { useState } from 'react'
import _ from 'lodash'

import AddressSelector from '../components/AddressSelector'
import { Address } from '../types'

export default function SelectProvince() {
    const [address, setAddress] = useState<Address>({ province: '', amphure: '', tambon: '', zip_code: 0 || null })
    return (
        <div className="h-full flex flex-col items-center border pt-28 gap-8">
            <h1 className="text-3xl font-bold italic">Demo Trash 🗑️ </h1>
            <div className="max-w-xs w-full flex flex-col gap-2 bg-gray-100 p-4 rounded-xl shadow-lg text-gray-900 font-semibold">
                <p>Province: {address.province}</p>
                <p>Amphure: {address.amphure}</p>
                <p>Tambon: {address.tambon}</p>
                <p>Zip Code: {address.zip_code}</p>
            </div>
            <AddressSelector values={address} setAddress={setAddress} />
        </div>
    )
}
