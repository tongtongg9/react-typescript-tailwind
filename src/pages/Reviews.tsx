import { ChangeEvent, useState } from 'react'
import emoji from '../assets/images/emoji'
import { classNames } from '../utils'

const scores = [
    { value: 1, label: '1', icon: emoji.starOne },
    { value: 2, label: '2', icon: emoji.starTwo },
    { value: 3, label: '3', icon: emoji.starThree },
    { value: 4, label: '4', icon: emoji.starFour },
    { value: 5, label: '5', icon: emoji.starFive },
]

export default function Reviews() {
    const [score, setScore] = useState(0)

    const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setScore(parseInt(e.target.value))
    }
    return (
        <div className="h-full flex flex-col items-center pt-28 gap-8 p-16">
            <h1 className="text-3xl font-bold italic">Review 🍻</h1>
            <div className="max-w-3xl flex flex-col gap-2 bg-gray-100 p-4 rounded-xl shadow-lg text-gray-900 font-semibold">
                <div className="flex gap-4">
                    {scores.map((s) => (
                        <label key={s.value} className="flex flex-row gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="score"
                                value={s.value}
                                className="hidden"
                                onChange={handleChanges}
                            />
                            <img
                                src={s.icon}
                                alt={s.label}
                                className={classNames(
                                    'grayscale hover:grayscale-0 hover:shadow-lg transition rounded-full',
                                    s.value === score ? 'grayscale-0 shadow-lg' : ''
                                )}
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="review" className="text-gray-900 font-semibold">
                    score : {score}
                </label>
            </div>
        </div>
    )
}
