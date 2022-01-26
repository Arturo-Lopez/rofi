import Image from 'next/image';
import { MdPerson } from 'react-icons/md';

interface AvatarProps {
  src: string | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  if (!src) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center" style={{ borderRadius: '50%' }}>
        <MdPerson className="h-3/6 w-6/12 text-gray-600" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Image src={src} alt="user-avatar" layout="fill" objectFit="cover" />
    </div>
  );
};

export default Avatar;
