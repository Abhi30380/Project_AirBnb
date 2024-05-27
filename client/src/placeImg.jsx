export default function PlaceImg({place,index=0,className=null}){
    if(!place.addedPhotos?.length){
        return '';
    }
    if(!className){
        className = 'object-cover w-full h-full'
    }
    return(
        <img className={className} src={'http://localhost:3000/uploads/'+place.addedPhotos[index]} alt="" />
    )
}