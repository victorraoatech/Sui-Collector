import React from 'react';
import { MOCK_CLUBS } from '../constants';
import { Club } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { Page } from '../types';
import { ClubIcon } from '../components/icons/Icons';

const ClubCard: React.FC<{ club: Club }> = ({ club }) => {
    const { setCurrentPage, setClubId } = useAppContext();

    const handleViewClub = () => {
        setClubId(club.id);
        setCurrentPage(Page.ClubDetail);
    }

    return (
        <div className="bg-surface rounded-lg overflow-hidden group cursor-pointer" onClick={handleViewClub}>
            <div className="aspect-video overflow-hidden">
                <img src={club.imageUrl} alt={club.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-text-primary">{club.name}</h3>
                <p className="text-sm text-text-secondary mt-1 h-10">{club.description}</p>
                <div className="flex items-center text-sm text-text-secondary mt-4">
                    <ClubIcon className="w-4 h-4 mr-2" />
                    <span>{club.memberCount.toLocaleString()} Members</span>
                </div>
            </div>
        </div>
    );
};

export const ClubsListPage: React.FC = () => {
    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold">Clubs & Galleries</h1>
                <p className="text-lg text-text-secondary mt-2">Explore communities and curated collections from creators.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {MOCK_CLUBS.map(club => (
                        <ClubCard key={club.id} club={club} />
                    ))}
                </div>
            </div>
        </div>
    );
};
