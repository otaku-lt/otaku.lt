'use client';

import { BandMember } from '@/app/korniha-band/types/member';
import Image from 'next/image';

interface MembersSectionProps {
  members: BandMember[];
  className?: string;
}

export function MembersSection({ members, className = '' }: MembersSectionProps) {
  if (!members || members.length === 0) {
    return (
      <div className={`bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl ${className}`}>
        <p className="text-gray-600 dark:text-gray-300">No band members information available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`grid md:grid-cols-2 gap-6 ${className}`}>
      {members.map((member, index) => (
        <div key={index} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {['Holms', 'Korniha'].includes(member.name) ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400">
                  <Image 
                    src={`/images/band/${member.name.toLowerCase()}.${member.name === 'Holms' ? 'png' : 'jpg'}`}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {member.name[0]}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium">{member.role}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
            <div className="bg-purple-50 dark:bg-gray-700/50 rounded-lg p-3">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Favorite: </span>
              <span className="text-sm text-gray-700 dark:text-gray-200">{member.favorite}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MembersSection;
