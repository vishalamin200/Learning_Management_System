import { CiCircleRemove } from "react-icons/ci";



const DrawerCloseButton = () => {
  return (
    <div className="flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-full bg-slate-400">
      <CiCircleRemove size={48} className="absolute inline-block border-none" />
    </div>
  )
}

export default DrawerCloseButton