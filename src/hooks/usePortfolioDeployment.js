import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { deletePortfolio as deleteInStore } from "@/store/slices/Portfolios";
import { useDispatch } from "react-redux";

export const usePortfolioDeployment = (portfolioId, existingPortfolioData) => {
  const [repoName, setRepoName] = useState(existingPortfolioData?.name || "");
  const [repoCreated, setRepoCreated] = useState(false);
  const user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  const createRepo = async (finalHtml) => {
    if (!repoName) {
      toast.error("Please enter a repository name.");
      return { error: true };
    }

    try {
      let formattedRepoName = repoName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-");
      const username = user.user.githubUsername || "Anonymous";

      let response = await fetch("/api/user/createRepo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ formattedRepoName, finalHtml, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Error: ${errorData.error || "Failed to create repository."}`
        );
        throw new Error(errorData.error || "Failed to create repository.");
      }

      const data = await response.json();
      if (data.isAlreadyCreated) {
        toast.info(`Repository already exists: ${data.repoName}`);
        return {
          isAlreadyCreated: true,
          repoName: data.repoName,
          error: false,
          isDeployed: data.isDeployed || false,
        };
      } else {
        toast.success(`Repository created successfully: ${data.repoName}`);
        setRepoName(data.repoName);
        setRepoCreated(true);
        return {
          isAlreadyCreated: false,
          repoName: data.repoName,
          error: false,
          isDeployed: data.isDeployed || false,
        };
      }
    } catch (error) {
      // console.error("Error creating repository:", error);
      toast.error(`Error: ${error.message || "Failed to create repository."}`);
      return { error: true };
    }
  };

  const commitToRepo = async (finalHtml, formattedRepoName) => {
    try {
      // console.log(finalHtml);

      const username = user.user.githubUsername || "Anonymous";
      const res = await fetch("/api/user/commitToRepo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ finalHtml, username, formattedRepoName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(
          `Error: ${errorData.error || "Failed to commit to repository."}`
        );
        throw new Error(errorData.error || "Failed to commit to repository.");
      }

      const data = await res.json();
      toast.success(`Committed to repository successfully: ${data.data.url}`);
      return {
        error: false,
        repoName: formattedRepoName,
        githubUsername: username,
      };
    } catch (error) {
      // console.error("Error committing to repository:", error);
      toast.error(
        `Error: ${error.message || "Failed to commit to repository."}`
      );
      return { error: true };
    }
  };

  const deployToGithub = async (formattedRepoName) => {
    const username = user.user.githubUsername || "Anonymous";
    let toastId = toast.loading("Deploying to GitHub Pages, this may take a minute...");
    try {
      const res = await fetch("/api/user/deployToGithubPages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          formattedRepoName,
          username,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.update(toastId, {
          render: `Error: ${
            errorData.error || "Failed to deploy to GitHub Pages."
          }`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        throw new Error(errorData.error || "Failed to deploy to GitHub Pages.");
      }

      const data = await res.json();
      toast.update(toastId, {
        render: `Deployed to GitHub Pages successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return {
        deployedUrl: data.data.html_url,
        error: false,
      };
    } catch (error) {
      // console.error("Error deploying to GitHub Pages:", error);
      toast.update(toastId, {
        render: `Error: ${
          error.message || "Failed to deploy to GitHub Pages."
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return { error: true };
    }
  };

  const createPortfolio = async (
    deployedUrl,
    template,
    debouncedData,
    formattedRepoName
  ) => {
    try {
      const response = await fetch("/api/user/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          name: repoName || template.name,
          repoName: formattedRepoName,
          email: user.user.email,
          userData: debouncedData,
          templateId: template._id,
          portfolioImage: template.image,
          deployedUrl: deployedUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Error: ${errorData.error || "Failed to create portfolio."}`
        );
        throw new Error(errorData.error || "Failed to create portfolio.");
      }

      const data = await response.json();
      toast.success(`Portfolio created successfully!`);
      return data;
    } catch (error) {
      // console.error("Error creating portfolio:", error);
      toast.error(`Error: ${error.message || "Failed to create portfolio."}`);
      return { error: true };
    }
  };

  const deletePortfolio = async (
    portfolioId,
    formattedRepoName,
    githubUsername
  ) => {
    try {
      const res = await fetch(`/api/user/portfolio`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          fromStep: "deletion",
          portfolioId: portfolioId,
          formattedRepoName: formattedRepoName,
          githubUsername: githubUsername,
        }),
      });
      let data = await res.json();
      if (!res.ok) throw data;
      // console.log(data.message);
      toast.success(data.message);
      if (data.message) dispatch(deleteInStore(portfolioId));
    } catch (error) {
      // console.error("Error deleting portfolio:", error.error);
      toast.error(`Error: ${error.error || "Failed to delete portfolio."}`);
      return { error: true };
    }
  };

  const updatePortfolio = async (portfolioId, debouncedData) => {
    try {
      const response = await fetch(`/api/user/portfolio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          userData: debouncedData,
          portfolioId: portfolioId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Error: ${errorData.error || "Failed to update portfolio."}`
        );
        throw new Error(errorData.error || "Failed to update portfolio.");
      }

      const data = await response.json();
      toast.success(`Portfolio updated successfully!`);
      return data;
    } catch (error) {
      // console.error("Error updating portfolio:", error);
      toast.error(`Error: ${error.message || "Failed to update portfolio."}`);
      return { error: true };
    }
  };

  return {
    repoName,
    setRepoName,
    repoCreated,
    createRepo,
    commitToRepo,
    deployToGithub,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
  };
};
