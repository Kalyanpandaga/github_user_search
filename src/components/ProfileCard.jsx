import { MdLocationOn } from "react-icons/md";

export default function ProfileCard({ profile }) {
  if (!profile) return null;
  return (
    <div className="min-w-full md:min-w-[500px] max-w-[600px] bg-white dark:bg-gray-900 shadow rounded-lg p-6 flex flex-col items-center mb-6">
      <img
        src={profile.avatar_url}
        alt={profile.name || profile.login}
        className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
      />
      <h2 className="text-xl font-bold mb-1 dark:text-white">
        {profile.name || profile.login}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">@{profile.login}</p>
      {profile.bio && (
        <p className="mb-2 text-center text-gray-700 dark:text-gray-400">
          {profile.bio}
        </p>
      )}
      <div className="flex gap-4 text-gray-700 dark:text-gray-300 mt-2">
        {profile.location && (
          <span className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4" />
            {profile.location}
          </span>
        )}
        <span>Followers: {profile.followers}</span>
        <span>Following: {profile.following}</span>
      </div>
    </div>
  );
}
