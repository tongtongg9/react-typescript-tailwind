import { Address, Province, Amphure, Tambon } from '../types'
import Selector from './forms/Selector'

import province_amphure_tambon from '../data/json/province_amphure_tambon.json'
import { ChangeEvent, useLayoutEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { amphures, provinces, tambons } from '../data'

type Props = {
    values: Address
    setAddress: (address: Address) => void
}

const AddressSelector = ({ values, setAddress }: Props) => {
    const [selected, setSelected] = useState({ province: 0, amphure: 0, tambon: 0 })

    // option
    const provinceOptions = useMemo(() => provinces, [provinces])

    const amphureOptions = useMemo(() => {
        if (selected.province === 0) return []
        return amphures.filter((a) => a.province_id === selected.province)
    }, [selected.province])

    const tambonOptions = useMemo(() => {
        if (selected.amphure === 0) return []
        return tambons.filter((t) => t.amphure_id === selected.amphure)
    }, [selected.amphure])

    // values from props
    const province = useMemo(() => {
        if (!values.province) return 0
        else return provinces.find((p: Province) => p.name_th === values.province)?.id
    }, [values])

    const amphure = useMemo(() => {
        if (!values.amphure) return 0
        else return amphures.find((a: Amphure) => a.name_th === values.amphure)?.id
    }, [values])

    const tambon = useMemo(() => {
        if (!values.tambon) return 0
        else return tambons.find((t: Tambon) => t.name_th === values.tambon)?.id
    }, [values])

    // handle selected
    const onSelectedProvince = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected({ ...selected, province: parseInt(e.target.value) })
        const province = provinces.find((p: Province) => p.id === parseInt(e.target.value))
        setAddress({ ...values, province: province?.name_th })
    }

    const onSelectedAmphure = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected({ ...selected, amphure: parseInt(e.target.value) })
        const amphure = amphures.find((a: Amphure) => a.id === parseInt(e.target.value))
        setAddress({ ...values, amphure: amphure?.name_th })
    }

    const onSelectedTambon = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected({ ...selected, tambon: parseInt(e.target.value) })
        const tambon = tambons.find((t: Tambon) => t.id === parseInt(e.target.value))
        setAddress({ ...values, tambon: tambon?.name_th, zip_code: tambon?.zip_code })
    }

    return (
        <>
            <div className="flex justify-center gap-4">
                <div className="w-72">
                    <select
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                        onChange={onSelectedProvince}
                        value={province}
                        name="province"
                    >
                        <option value={0} disabled>
                            --เลือกจังหวัด--
                        </option>
                        {provinceOptions.map((item: Province) => (
                            <option key={item.id} value={item.id}>
                                {item.name_th}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-72">
                    <select
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                        onChange={onSelectedAmphure}
                        value={amphure}
                        name="province"
                    >
                        <option value={0} disabled>
                            --เลือกอำเภอ--
                        </option>
                        {amphureOptions.map((item: Amphure) => (
                            <option key={item.id} value={item.id}>
                                {item.name_th}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-72">
                    <select
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                        onChange={onSelectedTambon}
                        value={tambon}
                        name="province"
                    >
                        <option value={0} disabled>
                            --เลือกตำบล--
                        </option>
                        {tambonOptions.map((item: Tambon) => (
                            <option key={item.id} value={item.id}>
                                {item.name_th}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default AddressSelector
