import SelectProvince from './pages/SelectProvince'
import UploadFiles from './pages/UploadFiles'
import Reviews from './pages/Reviews'

export default function App() {
    return (
        <div className="h-screen">
            <SelectProvince />
            <UploadFiles />
            <Reviews />
        </div>
    )
}
