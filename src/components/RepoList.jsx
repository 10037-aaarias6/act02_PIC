import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RepoList = ({ username, filter }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        let sortedRepos;
        switch (filter) {
          case "stars":
            sortedRepos = response.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
            break;
          case "created":
            sortedRepos = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
          case "language":
            // Esto agrupa los repos por idioma, pero quizá quieras filtrar o clasificarlos de otra manera
            sortedRepos = response.data.filter(repo => repo.language != null).sort((a, b) => a.language.localeCompare(b.language));
            break;
          default:
            sortedRepos = response.data;
            break;
        }
        const topRepos = sortedRepos.slice(0, 5);
        setRepos(topRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username, filter]); // Añade `filter` como dependencia

  return (
    <div>
      <h2>Top 5 repositorios de {username} filtrados por {filter}</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Estrellas: {repo.stargazers_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

export default RepoList;
