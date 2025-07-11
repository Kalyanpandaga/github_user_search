import { MdStar } from "react-icons/md";

export default function RepoCard({ repo }) {
  return (
    <div className="min-w-full md:min-w-[260px] max-w-[400px] bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition border border-gray-200 dark:border-gray-700">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400 mb-1 truncate max-w-full block"
        title={repo.name}
      >
        {repo.name}
      </a>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 line-clamp-2">
        {repo.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
        <span className="flex items-center gap-1">
          <MdStar className="w-4 h-4" />
          {repo.stargazers_count}
        </span>
        {repo.language && <span>{repo.language}</span>}
      </div>
    </div>
  );
}
