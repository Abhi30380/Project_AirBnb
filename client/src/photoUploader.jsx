import axios from "axios";
import { useState } from "react";
export default function PhotoUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (const file of files) {
            data.append('photos', file);
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(res => {
            const { data: filenames } = res;
            onChange(prev => {
                return [...prev, ...filenames];
            })
        })
    }
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    function removePhoto(ev,filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }
    function selectAsMainPhoto(ev,filename){
        ev.preventDefault();
        const addedPhotosWithoutSelcted = [...addedPhotos.filter(photo => photo !== filename)];
        onChange([filename,...addedPhotosWithoutSelcted])
    }
    return (
        <>
            <div className="flex gap-2">
                <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder={'add using a link ....  img'} />
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add Photo</button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="flex h-32 relative" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={"http://localhost:3000/uploads/" + link} alt="this is a img" />
                        <button onClick={(ev) => removePhoto(ev,link)} className="absolute cursor-pointer bottom-1 right-1 text-white bg-black p-2 bg-opacity-40 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                            </svg>

                        </button>
                        <button onClick={(ev) => selectAsMainPhoto(ev,link)} className="absolute cursor-pointer bottom-1 left-1 text-white bg-black p-2 bg-opacity-40 rounded-xl">
                            {link === addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                </svg>

                            )}
                            {
                                link !== addedPhotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                )
                            }

                        </button>
                    </div>
                ))}
                <label className="flex h-32 cursor-pointer items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input type="file" className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path ap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>

                    Upload
                </label>
            </div>
        </>
    )
}