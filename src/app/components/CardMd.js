import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CardMd = ({ imgSrc, title, source, link }) => {
  return (
    <Link href={link} legacyBehavior>
      <a className="block border border-gray-200 rounded-lg overflow-hidden group">
        <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imgSrc})` }}>
          {/* Eğer bir gradient veya opaklık eklemek isterseniz */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-4 h-full flex flex-col justify-end">
            <h3 className="text-lg font-semibold text-white group-hover:underline">{title}</h3>
            <p className="text-gray-200 text-sm">{source}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardMd;
