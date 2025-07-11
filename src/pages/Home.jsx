import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import RepoCard from "../components/RepoCard.jsx";
import ToggleTheme from "../components/ToggleTheme.jsx";
import Pagination from "../components/Pagination.jsx";
import Spinner from "../components/Spinner.jsx";
import { getUser, getUserRepos } from "../services/githubApi.js";
import useDebounce from "../hooks/useDebounce.js";

const REPOS_PER_PAGE = 5;

function getErrorMessage(err) {
  if (!err?.message) return "Something went wrong. Please try again.";
  if (err.message.includes("API rate limit exceeded")) {
    return "GitHub API rate limit exceeded. Please try again later";
  }
  if (err.message === "User not found") {
    return "User not found. Please check the username and try again.";
  }
  return err.message;
}

function ReposSection({
  repos,
  reposLoading,
  error,
  profile,
  totalRepos,
  page,
  totalPages,
  setPage,
}) {
  const startIdx = (page - 1) * REPOS_PER_PAGE + 1;
  const endIdx = Math.min(page * REPOS_PER_PAGE, totalRepos);
  if (error || !profile) return null;
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 mt-6">Top Repositories</h2>
      {reposLoading ? (
        <div className="flex justify-center my-6">
          <Spinner />
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center text-gray-500 my-6">
          No repositories found for this user.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
          {totalRepos > REPOS_PER_PAGE && (
            <div className="flex flex-col items-center gap-2 mt-6">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Showing {startIdx} to {endIdx} of {totalRepos}
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                loading={reposLoading}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reposLoading, setReposLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);

  const debouncedSearchText = useDebounce(searchText, 500);
  const totalPages = totalRepos ? Math.ceil(totalRepos / REPOS_PER_PAGE) : 0;

  // Fetch user details and first page of repos
  async function fetchUserDetails(name) {
    setLoading(true);
    setError("");
    setProfile(null);
    setRepos([]);
    setTotalRepos(0);
    setPage(1);
    try {
      const user = await getUser(name);
      setProfile(user);
      setTotalRepos(user.public_repos);
      // Fetch all repos (up to 100) and sort by stars
      const allRepos = await getUserRepos(name, 1, 100);
      const sorted = allRepos.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      setRepos(sorted.slice(0, REPOS_PER_PAGE));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // Fetch repos for pagination
  async function fetchRepos(name, pageNum) {
    setReposLoading(true);
    setError("");
    try {
      // Fetch all repos (up to 100) and sort by stars
      const allRepos = await getUserRepos(name, 1, 100);
      const sorted = allRepos.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      const start = (pageNum - 1) * REPOS_PER_PAGE;
      setRepos(sorted.slice(start, start + REPOS_PER_PAGE));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setReposLoading(false);
    }
  }

  useEffect(() => {
    if (!debouncedSearchText) {
      setUsername("");
      setProfile(null);
      setRepos([]);
      setTotalRepos(0);
      setError("");
      setPage(1);
      setLoading(false);
      setReposLoading(false);
      return;
    }
    setUsername(debouncedSearchText.trim());
    fetchUserDetails(debouncedSearchText.trim());
  }, [debouncedSearchText]);

  useEffect(() => {
    if (!username || page < 1) return;
    fetchRepos(username, page);
  }, [page, username]);

  function handleSearch(value) {
    setSearchText(value);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white pb-10">
      <ToggleTheme />
      <div className="max-w-xl mx-auto pt-12 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          GitHub User Search
        </h1>
        <SearchForm
          value={searchText}
          onChange={handleSearch}
          loading={loading}
        />
        {loading ? (
          <div className="flex justify-center my-6">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 my-6">{error}</div>
        ) : profile ? (
          <>
            <ProfileCard profile={profile} />
            <ReposSection
              repos={repos}
              reposLoading={reposLoading}
              error={error}
              profile={profile}
              totalRepos={totalRepos}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
